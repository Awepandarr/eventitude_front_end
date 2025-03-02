<template>
  <div class="min-h-screen bg-gradient-to-r from-[#db00ff] via-[#4c00ed] to-[#f49c06]">
    <div class="flex justify-center">
      <!-- Form for sign up if there is nothing in any of the form then it provides a red border and uses aria label for screen readers-->
      <form
        @submit.prevent="handleSubmit"
        class="w-1/2 h-1/2 mt-40 bg-white p-10 rounded-lg flex justify-center flex-col"
      >
        <h1 class="text-2xl flex justify-center"><b>Create an account</b></h1>
        <label for="firstName" aria-label="First Name">First Name </label><br />
        <input
          type="text"
          id="firstName"
          v-model="firstName"
          :class="{
            'border-2 border-red-500 rounded-lg': !firstName,
            'border-2 border-black rounded-lg': firstName,
          }"
        /><br />
        <label for="lastName" aria-label="Last Name">Last Name </label><br />
        <input
          type="text"
          id="lastName"
          v-model="lastName"
          :class="{
            'border-2 border-red-500 rounded-lg': !lastName,
            'border-2 border-black rounded-lg': lastName,
          }"
        /><br />
        <label for="email" aria-label="Email">Email </label><br />
        <input
          type="email"
          id="email"
          v-model="email"
          :class="{
            'border-2 border-red-500 rounded-lg': !email,
            'border-2 border-black rounded-lg': email,
          }"
        /><br />
        <label for="password" aria-label="Password">Password </label><br />
        <input
          type="password"
          id="password"
          v-model="password"
          :class="{
            'border-2 border-red-500 rounded-lg': !password,
            'border-2 border-black rounded-lg': password,
          }"
        /><br />
        <br /><br />
        <span id="error"></span>

        <button
          class="bg-black hover:bg-gradient-to-r from-[#db00ff] via-[#4c00ed] to-[#f49c06] text-white rounded-full p-2"
        >
          Continue
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  },
  methods: {
    handleSubmit() {
      const userinfo = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
      }
      axios
        .post('https://eventitude-backend-1.onrender.com/users', userinfo)
        .then((response) => {
          alert('Account Created Successfully \n UserId:' + response.data.user_id)
          this.$router.push('/login') //Leads to loggin
          localStorage.setItem('isLoggedIn', isLoggedIn.value) //Sets the loginValue
        })
        .catch((error) => {
          const errorElement = document.getElementById('error')
          errorElement.textContent = error.response.data.error_message
          errorElement.classList.add('text-red-500') //Text red for error
        })
    },
  },
}
</script>
