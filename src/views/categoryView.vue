<template>
  <div class="min-h-screen bg-gradient-to-r from-[#db00ff] via-[#4c00ed] to-[#f49c06]">
    <div class="flex justify-center">
      <!-- List of category with the value-->
      <form
        @submit.prevent="handleSubmit"
        name="form"
        class="w-1/2 h-1/2 mt-40 bg-white p-10 rounded-lg flex justify-center flex-col"
      >
        <label class="textSize">Provide the category of the event</label>
        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            value="1"
            name="bordered-checkbox"
            v-model="selected"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-checkbox-1"
            class="textSize w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Education</label
          >
        </div>
        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            value="2"
            name="bordered-checkbox"
            v-model="selected"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-checkbox-1"
            class="textSize w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Entertainment</label
          >
        </div>
        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            value="3"
            name="bordered-checkbox"
            v-model="selected"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-checkbox-1"
            class="textSize w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Sports</label
          >
        </div>
        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            value="4"
            name="bordered-checkbox"
            v-model="selected"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-checkbox-1"
            class="textSize w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Trade and Expo</label
          >
        </div>
        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            value="5"
            name="bordered-checkbox"
            v-model="selected"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-checkbox-1"
            class="textSize w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Virtual</label
          >
        </div>
        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            value="6"
            name="bordered-checkbox"
            v-model="selected"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-checkbox-1"
            class="textSize w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Commercial</label
          >
        </div>
        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            value="7"
            name="bordered-checkbox"
            v-model="selected"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-checkbox-1"
            class="textSize w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Political</label
          >
        </div>
        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            value="8"
            name="bordered-checkbox"
            v-model="selected"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-checkbox-1"
            class="textSize w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Networking</label
          >
        </div>
        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            value="9"
            name="bordered-checkbox"
            v-model="selected"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-checkbox-1"
            class="textSize w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Health</label
          >
        </div>
        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            value="10"
            name="bordered-checkbox"
            v-model="selected"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-checkbox-1"
            class="textSize w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Cultural</label
          >
        </div>
        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            value="11"
            name="bordered-checkbox"
            v-model="selected"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-checkbox-1"
            class="textSize w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Community</label
          >
        </div>
        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            value="12"
            name="bordered-checkbox"
            v-model="selected"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-checkbox-1"
            class="textSize w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Corporate</label
          >
        </div>
        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            value="13"
            name="bordered-checkbox"
            v-model="selected"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-checkbox-1"
            class="textSize w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Social</label
          >
        </div>
        <button
          class="textSize bg-black hover:bg-gradient-to-r from-[#db00ff] via-[#4c00ed] to-[#f49c06] text-white rounded-full p-2"
        >
          Finish
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
      selected: [], //Array of values of the category to be selected
    }
  },
  methods: {
    handleSubmit() {
      localStorage.setItem('isLoggedIn', isLoggedIn.value)
      const eventId = localStorage.getItem('event_id')
      const category = {
        category_ids: this.selected.map((value) => Number(value)), //category id what ever is selected and pmaps and put the value
      }
      //Authorization to authenticated
      axios.defaults.headers['X-Authorization'] = localStorage.getItem('token')
      axios
        .post(`http://localhost:3333/event/${eventId}/category`, category)
        .then((response) => {
          alert(response.data.message) //sends the response
          isLoggedIn.value = true //puts the loggedIn true
          this.$router.push('/') //home page
        })
        .catch((error) => {
          alert(error.response.data.error_message)
        })
    },
  },
}
</script>
