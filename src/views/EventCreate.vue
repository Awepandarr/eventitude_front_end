<template>
  <div class="min-h-screen bg-gradient-to-r from-[#db00ff] via-[#4c00ed] to-[#f49c06]">
    <div class="flex justify-center">
      <!--Form for creating an event red border put in error-->
      <form
        @submit.prevent="handleSubmit"
        name="form"
        class="w-1/2 h-1/2 mt-40 bg-white p-10 rounded-lg flex justify-center flex-col"
      >
        <h1 class="text-2xl flex justify-center"><b>Create Event</b></h1>
        <label for="eventName">Event Name </label><br />
<input
  type="text"
  id="eventName"
  v-model="eventName"
  :class="{
    'border-2 border-red-500 rounded-lg': !eventName,
    'border-2 border-black rounded-lg': eventName
  }"
/>
<br />
        <label for="description">Description </label><br />
        <input
          type="text"
          id="description"
          v-model="eventDescription"
          :class="{
            'border-2 border-red-500 rounded-lg': !eventDescription,
            'border-2 border-black rounded-lg': eventDescription,
          }"
        /><br />
        <label for="location">Location </label><br />
        <input
          type="text"
          id="location"
          v-model="eventLocation"
          :class="{
            'border-2 border-red-500 rounded-lg': !eventLocation,
            'border-2 border-black rounded-lg': eventLocation,
          }"
        /><br />
        <label for="startDate">Event Date </label><br />
        <input
          type="datetime-local"
          id="startDate"
          v-model="eventDate"
          :class="{
            'border-2 border-red-500 rounded-lg': !eventDate,
            'border-2 border-black rounded-lg': eventDate,
          }"
        /><br />
        <label for="closeRegistrationDate">Close Registration </label><br />
        <input
          type="datetime-local"
          id="closeRegistration"
          v-model="closeRegistration"
          :class="{
            'border-2 border-red-500 rounded-lg': !closeRegistration,
            'border-2 border-black rounded-lg': closeRegistration,
          }"
        /><br />
        <label for="maxAttendees">Max Attendees </label><br />
        <input
          type="number"
          id="maxAttendees"
          v-model="maxAttendees"
          :class="{
            'border-2 border-red-500 rounded-lg': !maxAttendees,
            'border-2 border-black rounded-lg': maxAttendees,
          }"
        /><br />
        <br />
        <div></div>
        <button
          class="bg-black hover:bg-gradient-to-r from-[#db00ff] via-[#4c00ed] to-[#f49c06] text-white rounded-full p-2"
          type="submit"
        >
          Continue
        </button>
        <!--In order to click and the handleSubmit should not effect drafit-->
<button
  class="bg-purple-500 text-white rounded-full p-2 w-full"
  @click="draftit(); $event.preventDefault()"
>
  Draft
</button>

      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { isLoggedIn } from '../auth'
export default {
  data() {
    return {
      eventName: '',
      eventDescription: '',
      eventLocation: '',
      eventDate: '',
      closeRegistration: '',
      maxAttendees: '',
    }
  },
  methods: {
    handleSubmit() {
      localStorage.setItem('isLoggedIn', isLoggedIn.value)
      const eventinfo = {
        name: this.eventName,
        description: this.eventDescription,
        location: this.eventLocation,
        start: this.covertToEpoch(this.eventDate), //converts to local date and time
        close_registration: this.covertToEpoch(this.closeRegistration),
        max_attendees: this.maxAttendees,
      }
      axios.defaults.headers['X-Authorization'] = localStorage.getItem('token')
      axios
        .post('https://eventitude-backend-1.onrender.com/events', eventinfo)
        .then((response) => {
          isLoggedIn.value = true
          alert('Event created successfully.')
          localStorage.setItem('event_id', response.data.event_id) //Set item according to event_id
          this.$router.push('/events/:id/category') //Goes to category
        })
        .catch((error) => {
          alert(error.response.data.error_message)
        })
    },
    covertToEpoch(dateinfo) {
      const date = new Date(dateinfo)
      return Math.floor(date.getTime() / 1000)
    },
    //Drafit it when the draft button is clicked
    draftit() {
      const eventinfo = {
        name: this.eventName,
        description: this.eventDescription,
        location: this.eventLocation,
        start: this.covertToEpoch(this.eventDate),
        close_registration: this.covertToEpoch(this.closeRegistration),
        max_attendees: this.maxAttendees,
      }
      localStorage.setItem('isLoggedIn', isLoggedIn.value)
      localStorage.setItem('name', eventinfo.name) // All the login is set
      localStorage.setItem('description', eventinfo.description)
      localStorage.setItem('location', eventinfo.location)
      localStorage.setItem('start', eventinfo.start)
      localStorage.setItem('close_registration', eventinfo.close_registration)
      localStorage.setItem('max_attendees', eventinfo.max_attendees)
      isLoggedIn.value = true
      alert('Draft saved')
      isLoggedIn.value = true
      this.$router.push('/event/draft')
    },
  },
}
</script>
