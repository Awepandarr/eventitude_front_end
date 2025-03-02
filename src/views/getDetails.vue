<template>
  <div
    class="min-h-screen bg-gradient-to-r from-[#db00ff] via-[#4c00ed] to-[#f49c06] flex justify-center item-center"
  >
    <div class="bg-white text-black p-4 w-1/2 relative" style="top: 50px">
      <div class="mt-10">
        <div v-if="eventDetails">
          <!--Event Details are presented with the responses-->
          <h2 class="text-3xl flex justify-center">
            <b>{{ eventDetails.name }}</b>
          </h2>
          <br />
          <p class="textSize text-lg">
            <b>{{ eventDetails.description }}</b>
          </p>
          <br />
          <p class="textSize"><b>Event date:</b> {{ covertUnix(eventDetails.start) }}</p>
          <p class="textSize">
            <b>Registration closing on:</b> {{ covertUnix(eventDetails.close_registration) }}
          </p>
          <p class="textSize"><b>Location:</b> {{ eventDetails.location }}</p>
          <p class="textSize"><b> Attendees:</b> {{ eventDetails.max_attendees }}</p>
          <p class="textSize"><b>Attendees:</b> {{ eventDetails.number_attending }}</p>
          <p class="textSize">
            <b>Creator:</b>{{ creatorDetails.first_name }} {{ creatorDetails.last_name }}
          </p>
          <p class="textSize"><b>Creator Email:</b> {{ creatorDetails.email }}</p>
          <br />
          <!--Attendees all the events are preseneted-->
          <div v-for="attendee in eventDetails.attendees" :key="attendee.user_id">
            <h2 class="textSize"><b>Attendees</b></h2>
            <p class="textSize"><b>Name:</b> {{ attendee.first_name }} {{ attendee.last_name }}</p>
            <p class="textSize">{{ attendee.email }}</p>
            <br />
          </div>
        </div>
        <!--not visible Feature it shows the register-->
        <button
          v-if="!visibleFeatures()"
          class="bg-[#f49c06] rounded-full px-2"
          @click="registerEvent"
        >
          Register for the event
        </button>
        <!--If the visible is feature if the user is the creator then it shows the edit and the archive-->
        <div v-if="visibleFeatures()">
          <button class="textSize rounded-full text-white bg-[#4c00ed] p-2 px-4 space-x-3">
            <a href="/event/update/:id">Edit</a>
          </button>
          <button
            class="textSize transform translate-x-1/2 rounded-full text-white bg-red-500 p-2 px-4"
            @click="deleteEvent"
          >
            Archive
          </button>
        </div>
      </div>
      <!--I have embedded the map which takes the event Location data to the search as query-->
      <iframe
        :src="'https://nominatim.openstreetmap.org/search?q=' + eventDetails.location"
        class="w-11/12 h-[40vh] max-w-4xl border-2 border-[#db00ff] mt-2"
      ></iframe>
      <!--Input Question-->
      <div @keypress.enter="submitQuestion()">
        <input
          type="text"
          v-model="questionAsked"
          class="text-black rounded-lg border-4 border-black px-5 h-12 w-full mt-2"
          placeholder="Ask questions here"
        />
      </div>
      <div
        class="textSize bg-gradient-to-r from-[#db00ff] via-[#4c00ed] to-[#f49c06] rounded-lg text-white p-6 mt-8"
      >
        <h2 class="textSize flex justify-center mb-4"><b>REQUEST FOR INFO DASHBOARD</b></h2>
        <!--The questions are but in a comment shape box for the user-->
        <div
          v-for="question in eventDetails.questions"
          :key="question.question_id"
          class="textSize flex flex-col bg-white border-4 border-black text-black rounded-lg p-4 max-w-sm relative ml-auto before:absolute before:content-[''] before:bottom-[-10px] before:left-2 before:border-[10px] before:border-t-white before:border-transparent before:border-b-0 before:border-l-transparent before:border-r-transparent mt-6"
        >
          <h3>
            <b>{{ question.asked_by.first_name }}</b>
          </h3>
          <h6>{{ question.question }}</h6>
          <h6>Votes: {{ question.votes }}</h6>
          <!--Image click to upvote and downvote-->
          <button @click="upvote(question.question_id)">
            <img src="../assets/upvote .png" alt="upvote image" class="w-[30px] h-auto" />
          </button>
          <button @click="downvote(question.question_id)">
            <img src="../assets/downvote.png" alt="downvote image" class="w-[30px] h-auto" />
          </button>
          <!--Delete question button-->
          <button
            class="textSize transform translate-x-[200px] px-2 py-1 text-white bg-red-500 rounded-none hover:bg-red-700 w-32"
            @click="deletequestion(question.question_id)"
          >
            Delete
          </button>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { isLoggedIn } from '../auth'
export default {
  data() {
    return {
      eventDetails: [],
      creatorDetails: {},
      creator_id: null,
      questionAsked: '',
    }
  },
  mounted() {
    this.login()
    this.getDetails()
  },
  methods: {
    submitQuestion() {
      const addQuestion = {
        question: this.questionAsked,
      }
      const event_id = localStorage.getItem('eventId')
      axios.defaults.headers['X-Authorization'] = localStorage.getItem('token')
      axios
        .post(`https://eventitude-backend-1.onrender.com/event/${event_id}/question`, addQuestion) //Adding the queston
        .then((response) => {
          localStorage.setItem('isLoggedIn', isLoggedIn.value)
          alert('Successfully question posted. \n Question Id:' + response.data.question_id)
          location.reload() //it reloads to show the question and refresh
        })
        .catch((error) => {
          alert(error.response.data.error_message)
        })
    },
registerEvent() {
  const event_id = localStorage.getItem('eventId');
  const token = localStorage.getItem('token');

  if (!event_id) {
    alert("No event selected!");
    return;
  }

  if (!token) {
    alert("You need to be logged in!");
    return;
  }

  axios
    .post(`https://eventitude-backend-1.onrender.com/event/${event_id}`, {}, {
      headers: {
        'X-Authorization': token, // Ensure header is correctly set
        'Content-Type': 'application/json' // Sometimes required
      }
    })
    .then((response) => {
      alert("Successfully registered for the event!");
      location.reload();
    })
    .catch((error) => {
      alert(error.response?.data?.error_message || "Something went wrong!");
    });
}
,
    upvote(question_id) {
      axios.defaults.headers['X-Authorization'] = localStorage.getItem('token')
      axios
        .post(`https://eventitude-backend-1.onrender.com/question/${question_id}/vote`) //Upvote
        .then((response) => {
          alert(response.data)
          location.reload()
        })
        .catch((error) => {
          alert(error.response.data.error_message)
        })
    },
    downvote(question_id) {
      axios.defaults.headers['X-Authorization'] = localStorage.getItem('token')
      axios
        .delete(`https://eventitude-backend-1.onrender.com/question/${question_id}/vote`) //Downvote
        .then((response) => {
          alert(response.data)
          location.reload()
        })
        .catch((error) => {
          alert(error.response.data.error_message)
        })
    },
    //Delete question also reloads
    deletequestion(question_id) {
      axios.defaults.headers['X-Authorization'] = localStorage.getItem('token')
      axios
        .delete(`https://eventitude-backend-1.onrender.com/question/${question_id}`)
        .then((response) => {
          alert(response.data)
          location.reload()
        })
        .catch((error) => {
          alert(error.response.data.error_message)
        })
    },

    getDetails() {
      //get details on the event id
      this.login()
      const eventid = localStorage.getItem('eventId')
      axios.defaults.headers['X-Authorization'] = localStorage.getItem('token')
      axios
        .get(`https://eventitude-backend-1.onrender.com/event/${eventid}`)
        .then((response) => {
          this.eventDetails = response.data
          this.creatorDetails = response.data.creator
          this.creator_id = response.data.creator.creator_id
          console.log(this.creator_id)
        })
        .catch((error) => {
          alert(error.response.data.error_message)
        })
    },
    deleteEvent() {
      //archive event
      this.login()
      const eventid = localStorage.getItem('eventId')
      axios.defaults.headers['X-Authorization'] = localStorage.getItem('token')
      axios
        .delete(`https://eventitude-backend-1.onrender.com/event/${eventid}`)
        .then((response) => {
          alert(response.data)
        })
        .catch((error) => {
          alert(error.response.data.error_message)
        })
    },
    visibleFeatures() {
      //If the user is the creator of the eevent
      const user_id = localStorage.getItem('userId')
      const creatorId = this.creator_id
      if (user_id === String(creatorId)) {
        localStorage.setItem('features', true)
        return true
      } else {
        localStorage.setItem('features', false)
        return false
      }
    }, //Converts the time to local date and time
    covertUnix(unix) {
      const date = new Date(unix * 1000)
      return date.toString()
    },
    login() {
      //Login value should be true
      isLoggedIn.value = true
      localStorage.setItem('isLoggedIn', isLoggedIn.value)
    },
  },
}
</script>
