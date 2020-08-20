<template>
  <div>
    <form @submit.prevent="getUserData">
      <p v-if="formError" class="error">{{ formError }}</p>
      <p v-if="userData">{{ userData }}</p>
      <button
        type="submit"
        class="hover:bg-blue-700 opacity-100 cursor-pointer bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >Get user data</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  asyncData() {
    return {
      formError: null,
      userData: null
    };
  },
  middleware: "authenticated",
  methods: {
    async getUserData() {
      const ret = await this.$axios.get(`/user/${this.$store.state.userId}`);
      this.userData = ret.data;
    },
    async disconnect() {
      await this.$axios.put(`/user/${this.$store.state.userId}/logout`);
      this.$store.commit("logout");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
</style>