<template>
  <div
    class="min-h-screen bg-gradient-to-r from-[#db00ff] via-[#4c00ed] to-[#f49c06] flex justify-center item-center"
  >
    <div class="bg-white text-black p-4 w-1/2 relative" style="top: 50px">
      <div class="mt-10 w-1/2">
        <!-- Draft Event before sending it it just does it-->
        <h4 class="textSize">Event Name: {{ name }}</h4>
        <h4 class="textSize">Description: {{ description }}</h4>
        <h4 class="textSize">Location: {{ location }}</h4>
        <h4 class="textSize">Start Event: {{ start }}</h4>
        <h4 class="textSize">Close Registration: {{ close_registration }}</h4>
        <h4 class="textSize">Max attendees: {{ max_attendees }}</h4>
        <div class="mt-4">
          <button
            class="rounded-full text-white bg-[#4c00ed] p-2 px-4 space-x-3"
            @click="editDraft()"
          >
            Edit
          </button>
          <button
            class="textSize transform translate-x-1/2 rounded-full text-white bg-red-500 p-2 px-4"
            v-on:click="deleteDraft()"
          >
            Delete Draft
          </button>
          <button
            class="textSize rounded-full text-white bg-black p-2 w-full mt-2"
            v-on:click="handleSubmit()"
          >
            Create Event
          </button>
          <!--Form for updating the draft-->
          <div v-if="edit">
            <form>
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
              <!-- taking as local datetime it takes the default as 1January 1970 if not thing is entered-->
              <label for="startDate" class="textSize">Start Event </label><br />
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
              <button
                class="textSize rounded-full text-white bg-green-500 p-2 px-4 space-x-3 mt-2"
                v-on:click="saveDraft()"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { isLoggedIn } from '../auth'
import axios from 'axios'
export default {
  data() {
    return {
      name: '',
      description: '',
      location: '',
      start: '',
      close_registration: '',
      max_attendees: '',
      eventName: '',
      eventDescription: '',
      eventDate: '',
      closeRegistration: '',
      maxAttendees: '',
      edit: false,
    }
  },
  mounted() {
    //the data is set to localStorage Item
    this.login()
    this.name = localStorage.getItem('name')
    this.description = localStorage.getItem('description')
    this.location = localStorage.getItem('location')
    this.start = localStorage.getItem('start')
    this.close_registration = localStorage.getItem('close_registration')
    this.max_attendees = localStorage.getItem('max_attendees')
  },
  methods: {
    login() {
      isLoggedIn.value = true
      this.edit = false
      localStorage.setItem('isLoggedIn', isLoggedIn.value)
    },
    covertToEpoch(dateinfo) {
      const date = new Date(dateinfo)
      return Math.floor(date.getTime() / 1000)
    },
    deleteDraft() {
      //Removes the Item from the draft
      isLoggedIn.value = true
      this.edit = false
      this.name = localStorage.removeItem('name')
      this.description = localStorage.removeItem('description')
      this.location = localStorage.removeItem('location')
      this.start = localStorage.removeItem('start')
      this.close_registration = localStorage.removeItem('close_registration')
      this.max_attendees = localStorage.removeItem('max_attendees')
      this.$router.push('/')
    },
    editDraft() {
      //Edit
      isLoggedIn.value = true
      this.edit = true
    },
    saveDraft() {
      //Saves the draft by seting item
      localStorage.setItem('name', this.eventName)
      localStorage.setItem('description', this.eventDescription)
      localStorage.setItem('location', this.eventLocation)
      localStorage.setItem('start', this.eventDate)
      localStorage.setItem('close_registration', this.closeRegistration)
      localStorage.setItem('max_attendees', this.maxAttendees)
    },
    handleSubmit() {
      //To create event endpoint get the item
      const eventinfo = {
        name: localStorage.getItem('name'),
        description: localStorage.getItem('description'),
        location: localStorage.getItem('location'),
        start: this.covertToEpoch(localStorage.getItem('start')),
        close_registration: this.covertToEpoch(localStorage.getItem('close_registration')),
        max_attendees: localStorage.getItem('max_attendees'),
      }
      axios.defaults.headers['X-Authorization'] = localStorage.getItem('token')
      axios
        .post('https://eventitude-backend-1.onrender.com/events', eventinfo)
        .then((response) => {
          //Creates the event and sets it and removeItem
          isLoggedIn.value = true
          alert('Event created successfully.\n Your EventId:' + response.data.event_id)
          localStorage.setItem('event_id', response.data.event_id)
          this.name = localStorage.removeItem('name')
          this.description = localStorage.removeItem('description')
          this.location = localStorage.removeItem('location')
          this.start = localStorage.removeItem('start')
          this.close_registration = localStorage.removeItem('close_registration')
          this.max_attendees = localStorage.removeItem('max_attendees')
          this.$router.push('/events/:id/category') //set the category of the event
        })
        .catch((error) => {
          alert(error.response.data.error_message)
        })
    },
  },
}
</script>
