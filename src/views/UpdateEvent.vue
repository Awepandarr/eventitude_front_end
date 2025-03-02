<template>
  <div class="min-h-screen bg-gradient-to-r from-[#db00ff] via-[#4c00ed] to-[#f49c06]">
    <div class="flex justify-center">
      <!-- Standard Form to update the Event-->
      <form
        @submit.prevent="handleSubmit"
        name="form-update"
        class="w-1/2 h-1/2 mt-40 bg-white p-10 rounded-lg flex justify-center flex-col"
      >
        <h1 class="textSize text-2xl flex justify-center"><b>Update Event</b></h1>
        <label for="eventName" class="textSize">Event Name </label><br />
        <input
          type="text"
          id="eventName"
          v-model="eventName"
          class="border-2 border-black rounded-lg"
        /><br />
        <label for="description" class="textSize">Description </label><br />
        <input
          type="text"
          id="description"
          v-model="eventDescription"
          class="border-2 border-black rounded-lg"
        /><br />
        <label for="location" class="textSize">Location </label><br />
        <input
          type="text"
          id="location"
          v-model="eventLocation"
          class="border-2 border-black rounded-lg"
        /><br />
        <label for="startDate" class="textSize">Start Event Date </label><br />
        <input
          type="datetime-local"
          id="startDate"
          v-model="eventDate"
          class="border-2 border-black rounded-lg"
        /><br />
        <label for="closeRegistrationDate" class="textSize">Close Registration </label><br />
        <input
          type="datetime-local"
          id="closeRegistration"
          v-model="closeRegistration"
          class="border-2 border-black rounded-lg"
        /><br />
        <label for="maxAttendees" class="textSize">Max Attendees </label><br />
        <input
          type="number"
          id="maxAttendees"
          v-model="maxAttendees"
          class="border-2 border-black rounded-lg"
        /><br />
        <br />
        <button
          class="textSize bg-black hover:bg-gradient-to-r from-[#db00ff] via-[#4c00ed] to-[#f49c06] text-white rounded-full p-2"
        >
          Update Event
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
    //data has no data currently
    return {
      eventName: '',
      eventDescription: '',
      eventLocation: '',
      eventDate: '',
      closeRegistration: '',
      maxAttendees: '',
    }
  },
  mounted() {
    this.login()
  },
  methods: {
    handleSubmit() {
      //it adds the data to it
      const eventinfo = {
        name: this.eventName,
        description: this.eventDescription,
        location: this.eventLocation,
        start: this.covertToEpoch(this.eventDate),
        close_registration: this.covertToEpoch(this.closeRegistration),
        max_attendees: this.maxAttendees,
      }
      const eventid = localStorage.getItem('eventId') //eventId gets from the local storage
      axios.defaults.headers['X-Authorization'] = localStorage.getItem('token')
      axios
        .patch(`https://eventitude-backend-1.onrender.com/event/${eventid}`, eventinfo)
        .then((response) => {
          alert('Updated succesfully.\n Event name:' + String(response.data.name)) //Updated
          this.$router.push('/events/:id') //Goes to the getEventid
        })
        .catch((error) => {
          alert(error.response.data.error_message)
        })
    },
    login() {
      isLoggedIn.value = true
      localStorage.setItem('isLoggedIn', isLoggedIn.value) //Set the login true
    },
    //For converting it into unix
    covertToEpoch(dateinfo) {
      const date = new Date(dateinfo)
      return Math.floor(date.getTime() / 1000)
    },
  },
}
</script>
