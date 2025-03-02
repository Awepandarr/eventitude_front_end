<template>
  <div class="min-h-screen bg-gradient-to-r from-[#db00ff] via-[#4c00ed] to-[#f49c06]">
    <div class="flex justify-center">
      <!-- Submitting the form for the login-->
      <form
        @submit.prevent="handleSubmit"
        class="w-1/2 h-1/2 mt-40 bg-white p-10 rounded-lg flex justify-center flex-col"
      >
        <h1 class="text-2xl flex justify-center"><b>Please login into your account</b></h1>
        <label for="email" aria-label="email">Email: </label><br />
        <input
          type="email"
          id="email"
          v-model="email"
          :class="{
            'border-2 border-red-500 rounded-lg': !email,
            'border-2 border-black rounded-lg': email,
          }"
        /><br />
        <label for="password" aria-label="password">Password: </label><br />
        <input
          type="password"
          id="password"
          aria-label="password"
          v-model="password"
          :class="{
            'border-2 border-red-500 rounded-lg': !password,
            'border-2 border-black rounded-lg': password,
          }"
        /><br />
        <br />
        <!-- In case the user doesn;t have an account-->
        <span id="error" class="block mt-2"></span>
        <p>
          Don't have an account? <a href="/users" class="text-[#4c00ed]"><u>SignUp here</u></a>
        </p>
        <br />

        <button
          aria-label="login"
          class="bg-black hover:bg-gradient-to-r from-[#db00ff] via-[#4c00ed] to-[#f49c06] text-white rounded-full p-2"
        >
          Login
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
      email: '',
      password: '',
    }
  },
  methods: {
    handleSubmit() {
      const loginInfo = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
      }
      //Post request to login
      axios
        .post('http://localhost:3333/login', loginInfo)
        .then((response) => {
          localStorage.setItem('isLoggedIn', isLoggedIn.value)
          alert('Login Successfully.\n UserId:' + response.data.user_id)
          isLoggedIn.value = true
          localStorage.setItem('token', response.data.session_token) //token is set
          localStorage.setItem('userId', response.data.user_id) //And the user id
          this.$router.push('/') //it pushes to the search
        })
        .catch((error) => {
          const errorElement = document.getElementById('error') //Error
          errorElement.textContent = error.response.data.error_message
          errorElement.classList.add('text-red-500') //Error is displayed in red
        })
    },
  },
}
</script>
