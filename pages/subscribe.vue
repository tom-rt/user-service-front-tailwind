<template>
  <div class="flex justify-center w-full">
    <div class="flex items-center w-full max-w-xs pb-10">
      <form @submit.prevent="subscribe" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10">
        <div class="flex w-100 justify-center text-xl mb-4 font-bold">Subscribe</div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input
            v-bind:class="{ 'border-red-500': subscriptionFailed }"
            v-model="username"
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
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******"
          />
        </div>
        <div
          v-if="subscriptionFailed"
          class="mb-6 italic text-red-500 text-sm"
        >Username already taken</div>
        <div class="flex items-center justify-between">
          <button
            :disabled="canSubmit == false"
            v-bind:class="{ 'hover:bg-blue-700 opacity-100 cursor-pointer': canSubmit,
                            'opacity-50 cursor-not-allowed': !canSubmit}"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >Subscribe</button>
          <nuxt-link
            to="/login"
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 text-right"
            href="#"
          >Already have an account ?</nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  asyncData() {
    return {
      username: "",
      password: "",
      subscriptionFailed: false,
      canSubmit: false
    };
  },
  methods: {
    async subscribe() {
      const ret = await this.$axios.post("/user", {
        name: this.username,
        password: this.password
      });

      if (ret.status == 201) {
        const login = await this.$axios.post("/user/login", {
          name: this.username,
          password: this.password
        });
        this.$store.commit("login", {
          token: login.data.token,
          userId: login.data.userId
        });
        this.$router.push("/home");
      } else {
        this.subscriptionFailed = true;
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