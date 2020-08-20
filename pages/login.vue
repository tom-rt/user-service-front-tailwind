<template>
  <div class="flex justify-center w-full">
    <div class="flex items-center w-full max-w-xs pb-10">
      <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10">
        <div class="flex w-100 justify-center text-xl mb-4 font-bold">Login</div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input
            v-model="username"
            v-bind:class="{ 'border-red-500': connectionFailed }"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            v-model="password"
            v-bind:class="{ 'border-red-500': connectionFailed }"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******"
          />
        </div>
        <div
          v-if="connectionFailed"
          class="mb-6 italic text-red-500 text-sm"
        >Wrong username or password</div>
        <div class="flex items-center justify-between">
          <button
            :disabled="canSubmit == false"
            v-bind:class="{ 'hover:bg-blue-700 opacity-100 cursor-pointer': canSubmit,
                            'opacity-50 cursor-not-allowed': !canSubmit}"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >Log in</button>
          <nuxt-link
            to="/subscribe"
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >No account ?</nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  data() {
    return {
      formError: null,
      username: "",
      password: "",
      connectionFailed: false,
      canSubmit: false
    };
  },
  methods: {
    async login() {
      const login = await this.$axios.post("/user/login", {
        name: this.username,
        password: this.password
      });
      if (login.status == 200) {
        this.$store.commit("login", {
          token: login.data.token,
          userId: login.data.userId
        });
        this.$router.push("/home");
      } else {
        this.connectionFailed = true;
        this.password = "";
      }
    }
  },
  watch: {
    username: function() {
      console.log(this.username.length, this.password.length);
      if (this.username.length > 0 && this.password.length > 0) {
        this.canSubmit = true;
      } else {
        this.canSubmit = false;
      }
    },
    password: function() {
      console.log(this.username.length, this.password.length);
      if (this.username.length > 0 && this.password.length > 0) {
        this.canSubmit = true;
      } else {
        this.canSubmit = false;
      }
    }
  }
};
</script>

<style>
</style>