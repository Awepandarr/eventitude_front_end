<script setup>
import { RouterLink, RouterView } from 'vue-router' //Imports the router links to navigate
import axios from 'axios'
import { isLoggedIn } from './auth'
localStorage.setItem('isLoggedIn', isLoggedIn.value)
//Tailswind editing
//Small Font Size for accessibility
function smallFont() {
  const textSize = document.querySelectorAll('.textSize')
  textSize.forEach((text) => {
    text.classList.remove('text-sm', 'text-base', 'text-lg')
    text.classList.add('text-sm')
  })
}
//Medium Font Size for accessibility
function mediumFont() {
  const textSize = document.querySelectorAll('.textSize')
  textSize.forEach((text) => {
    text.classList.remove('text-sm', 'text-base', 'text-lg')
    text.classList.add('text-lg')
  })
}
//Large Font Size for the accessibility
function largeFont() {
  const textSize = document.querySelectorAll('.textSize')
  textSize.forEach((text) => {
    text.classList.remove('text-sm', 'text-base', 'text-lg')
    text.classList.add('text-2xl')
  })
}
//Logout
function logout() {
  axios.defaults.headers['X-Authorization'] = localStorage.getItem('token')
  axios
    .post('https://eventitude-backend-1.onrender.com/logout', {})
    .then((response) => {
      alert(response.data.message)
      isLoggedIn.value = false
      localStorage.removeItem('token')
      localStorage.removeItem('creatorId')
      localStorage.removeItem('eventId')
      localStorage.removeItem('event_id')
      localStorage.removeItem('userId')
      localStorage.removeItem('attendees')
      location.href = '/'
      this.$router.push('/') //Pushes to the home page
    })
    .catch((error) => {
      alert(error.response.data.error_message)
    })
}
</script>
<template>
  <header>
    <!-- Standard Navigation Bar-->
    <div class="flex justify-between p-5 bg-black text-white">
      <h1
        class="text-3xl mt-4 hover:text-[#f49c06]"
        style="
          text-shadow:
            0 0 5px rgba(255, 255, 255, 0.6),
            0 0 10px rgba(255, 255, 255, 0.5),
            0 0 15px rgba(255, 255, 255, 0.4);
        "
        aria-label="Home page"
      >
        <RouterLink to="/">Eventitude</RouterLink>
      </h1>
      <div class="flex justify-end space-x-5 w-full">
        <!--If not Loggin-->
        <div v-if="!isLoggedIn">
          <button
            class="textSize bg-[#9400f6] text-lg rounded-full px-8 py-4 text-white hover:bg-[#4c00ed] hover:text-white"
          >
            <b><RouterLink to="/users" aria-label="SignUp">SignUp</RouterLink></b>
          </button>
          <button
            class="textSize bg-[#f49c06] text-lg rounded-full px-8 py-4 text-black hover:bg-[#4c00ed] hover:text-white"
          >
            <b><RouterLink to="/login" aria-label="Login">Login</RouterLink></b>
          </button>
          <button
            class="text-sm bg-white text-black p-2 ml-4 hover:bg-[#4c00ed] hover:text-white"
            @click="smallFont"
          >
            A
          </button>
          <button
            class="text-lg bg-white text-black p-2 ml-4 hover:bg-[#4c00ed] hover:text-white"
            @click="mediumFont"
          >
            A
          </button>
          <button
            class="text-2xl bg-white text-black p-2 ml-4 hover:bg-[#4c00ed] hover:text-white"
            @click="largeFont"
          >
            A
          </button>
        </div>
        <!-- If LoggesIn then shows different-->
        <div v-if="isLoggedIn">
          <button
            class="textSize bg-[#9400f6] text-lg rounded-full px-8 py-4 text-white hover:bg-[#4c00ed] hover:text-white"
            aria-label="Create an event"
          >
            <RouterLink to="/events">Create an Event</RouterLink>
          </button>
          <button
            class="textSize bg-[#9400f6] text-lg rounded-full px-8 py-4 text-white hover:bg-[#4c00ed] hover:text-white"
            aria-label="Draft Event"
          >
            <RouterLink to="/event/draft">Draft Event</RouterLink>
          </button>
          <button
            class="textSize bg-[#f49c06] text-lg rounded-full px-8 py-4 text-black hover:bg-[#4c00ed] hover:text-white"
            aria-label="Logout"
          >
            <RouterLink to="/logout" @click="logout">Logout</RouterLink>
          </button>
          <button
            class="bg-white text-black text-sm p-2 ml-4 hover:bg-[#f49c06]"
            @click="smallFont"
          >
            A
          </button>
          <button
            class="text-base bg-white text-lg text-black p-2 ml-4 hover:bg-[#f49c06]"
            @click="mediumFont"
          >
            A
          </button>
          <button
            class="text-2xl bg-white text-2xl text-black p-2 ml-4 hover:bg-[#f49c06]"
            @click="largeFont"
          >
            A
          </button>
        </div>
      </div>
    </div>
  </header>

  <RouterView />
</template>
