<template>
  <body>
    <div class="min-h-screen bg-[url('../assets/design.gif')] bg-cover bg-center">
      <div class="flex justify-center">
        <!-- Typewriter animation for the users animation (https://css-tricks.com/snippets/css/typewriter-effect/)-->
        <h1 class="text-white p-8 text-4xl mt-52">
          <b>I am looking for </b
          ><span class="cursor" :class="cursorClass"
            ><b>{{ displayedText }}</b></span
          >
          <b>events</b>
        </h1>
      </div>
      <div class="mt-40 flex justify-center">
        <!-- Search the events-->
        <input
          type="text"
          placeholder="Search for an event"
          v-model="searchQuery"
          class="absolute w-1/2 m-4 rounded-full border-2 border-black h-12 p-4"
          @keypress.enter="search"
        />
        <div v-if="visible()">
          <select
            name="type-of-event"
            id="type-of-event"
            class="textSize absolute left-20 bg-black m-5 text-white border-2 border-black rounded-full h-12 p-2"
          >
            <!--Status the event-->
            <option value="" aria-label="Status">Status</option>
            <option value="OPEN" aria-label="Open Events">OPEN</option>
            <option value="ATTENDING" aria-label="Attending Events">ATTENDING</option>
            <option value="MY_EVENTS" aria-label="My Events">MY EVENTS</option>
            <option value="ARCHIVE" aria-label="Archived Events">ARCHIVED</option>
          </select>
        </div>
        <button
          class="absolute right-1/4 transform -translate-y-1 translate-y-3 translate-x-1 bg-black textSize text-white p-3 m-1 rounded-full hover:bg-[#4c00ed]"
          @click="search"
        >
          Search
        </button>
        <div v-if="visible()">
          <!--Category event-->
          <select
            name="category"
            id="category"
            class="textSize absolute right-20 bg-black m-5 text-white border-2 border-black rounded-full h-12 p-2"
          >
            <option value="" aria-label="Category">CATEGORY</option>
            <option value="1" aria-label="Educational">EDUCATIONAL</option>
            <option value="2" aria-label="Entertainment">ENTERTAINMENT</option>
            <option value="3" aria-label="Sports">SPORTS</option>
            <option value="4" aria-label="Trade and Expo">TRADE AND EXPO</option>
            <option value="5" aria-label="Virtual">VIRTUAL</option>
            <option value="6" aria-label="Commercial">COMMERCIAL</option>
            <option value="7" aria-label="Political">POLITICAL</option>
            <option value="8" aria-label="Networking">NETWORKING</option>
            <option value="9" aria-label="Health">HEALTH</option>
            <option value="10" aria-label="Cultural">CULTURAL</option>
            <option value="11" aria-label="Community">COMMUNITY</option>
            <option value="12" aria-label="Corporate">CORPORATE</option>
            <option value="13" aria-label="Social">SOCIAL</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="results.length > 0" id="middle" class="flex flex-wrap mt-10 px-6 gap-4">
      <ul class="flex flex-wrap w-full">
        <!--List is presented in the result based on the key eventid -->
        <li
          v-for="event in results"
          :key="event.id"
          class="overflow-auto bg-black p-4 m-4 rounded-lg shadow-lg text-white w-[300px] h-[600px]"
        >
          <h2 class="textSize text-2xl">
            <b>{{ event.name }}</b>
          </h2>
          <p class="textSize">Description: {{ event.description }}</p>
          <p class="textSize">Event date: {{ covertUnix(event.start_date) }}</p>
          <p class="textSize">
            Registration closing on: {{ covertUnix(event.close_registration) }}
          </p>
          <p class="textSize">Location: {{ event.location }}</p>
          <p class="textSize">Maximum Attendees: {{ event.max_attendees }}</p>
          <div class="flex justify-center mt-2" v-if="!visible()">
            <!--It is visible if Loggin is false -->
<router-link to="/login">
  <button class="textSize rounded-full p-2 bg-[#9400f6]">Register</button>
</router-link>

          </div>
          <div v-if="visible()" class="flex justify-center mt-2">
            <!--It is visible if Loggin is true -->
<router-link :to="`/events/${event.event_id}`">
  <button class="textSize rounded-full p-2 bg-[#9400f6] hover:bg-[#f49c06] hover:text-black">
    Get details
  </button>
</router-link>

          </div>
        </li>
      </ul>
      <div>
        <nav
          v-if="results.length > 0"
          id="pagination"
          class="flex justify-center items-center"
          aria-label="Pagination"
        >
          <!--It is used for Pagination using key as page (https://bootstrap-vue.org/docs/components/pagination) -->
          <ul class="flex list-none space-x-2">
            <!--https://stackoverflow.com/questions/52086128/vue-js-ref-inside-the-v-for-loop-->
            <li v-for="page in maxPages" :key="page">
              <button
                :value="page"
                :class="[
                  'page-button px-3 py-2 rounded-lg',
                  page === currentPage
                    ? ' textSize text-white bg-[#9400f6]'
                    : 'textSize text-white bg-black hover:bg-[#f49c06] hover:text-black',
                ]"
                @click="setPage(page)"
              >
                {{ page }}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!--If no results then no events were found-->
    <div v-if="results.length === 0 && !errorMessage" class="mt-10 px-6 text-center">
      <h2 class="textSize text-2xl">No events found</h2>
      <p class="textSize text-lg">Please try again</p>
    </div>
    <div v-if="errorMessage" class="mt-10 px-6 text-center">
      <h2 class="textSize text-2xl">An error occured</h2>
      <p class="textSize text-red-500">{{ errorMessage }}</p>
    </div>
  </body>
</template>
<script>
import axios from 'axios' //axios allows to use the api (https://v2.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html?redirect=true)
import { isLoggedIn } from '../auth' //Authentication

export default {
  data() {
    return {
      text: [
        'Librarian',
        'Senior Cost Accountant',
        'Programmer',
        'Nurse',
        'Sales',
        'Environmental',
        'Chemical Engineering',
        'Financial advisor',
        'Geologist',
        'Biostatician',
        'Teacher',
        'Quality Engineering',
        'HR',
        'Marketing',
        'Software Consultant',
      ], //Types of keywords
      displayedText: '', //text displayed
      charIndex: 0, //character displaying
      textIndex: 0,
      typingSpeed: 100, //The speed of timing
      cursorClass: 'cursor-blink', //Blinking cursor
      searchQuery: '',
      category: '',
      currentPage: 1, //The currentpage
      offset: 0, //offset
      totalResults: 0, //Number of results present
      status: 'OPEN', //OPEN status as default
      results: [], //Result
      errorMessage: '', //Error message
      maxPages: 3, //Maximum Pages
    }
  },
  mounted() {
    this.typeWriter()
  },
  methods: {
    //(https://stackoverflow.com/questions/65477711/typewriter-effect-and-links)
    typeWriter() {
      if (this.charIndex < this.text[this.textIndex].length) {
        this.displayedText += this.text[this.textIndex].charAt(this.charIndex)
        this.charIndex++
        setTimeout(this.typeWriter, this.typingSpeed)
      } else {
        setTimeout(() => {
          this.charIndex = 0
          this.displayedText = ''
          this.textIndex = (this.textIndex + 1) % this.text.length
          this.typeWriter()
        }, 2000)
      }
    },
    setPage(page) {
      this.currentPage = page
      this.offset = 20 * (page - 1) //https://www.meilisearch.com/docs/guides/front_end/pagination#:~:text=You%20can%20use%20this%20formula,%3D%2020%20*%202%20%3D%2040%20.
      this.search()
    },

    search() {
      this.errorMessage = ''
      if (localStorage.getItem('token')) {
        this.category = document.getElementById('category').value //geting using category
        this.status = document.getElementById('type-of-event').value //type of event
        axios.defaults.headers['X-Authorization'] = localStorage.getItem('token') //token for the authentication
      }
      //params is passed to make it search
      axios
        .get('https://eventitude-backend-1.onrender.com/search', {
          params: {
            q: this.searchQuery,
            category: this.category,
            status: this.status,
            limit: 20,
            offset: this.offset,
          },
        })
        .then((response) => {
          window.scrollTo({ top: 1200, behavior: 'smooth' }) //for the scrolling to the bottom where the search is
          this.results = response.data //the data is put in the results
          if (this.results.length < 20) {
            this.maxPages = this.currentPage
          } //The result is leass than 20 then that is the max Page
          else {
            this.maxPages = 3 //Otherwise the max Page is 3
          }
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message //Catches the error
        })
    },
    visible() {
      //The features when loggedIn it should show
      if (localStorage.getItem('token')) {
        isLoggedIn.value = true
        localStorage.setItem('isLoggedIn', isLoggedIn.value)
        return true
      }
    },
    getEventId(id) {
      //sets the event when asked for the evntDetails page to plugin for the later endpoints
      localStorage.setItem('eventId', id)
    }, //Converts unix
    covertUnix(unix) {
      const date = new Date(unix * 1000)
      return date.toString()
    },
    login() {
      isLoggedIn.value = true
    },
  },
}
</script>
<style>
.cursor {
  color: white;
}
.cursor-blink::after {
  content: '|';
  animation: blink 1s infinite;
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
