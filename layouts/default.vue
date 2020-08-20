<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@500&family=Montserrat:wght@200&display=swap"
      rel="stylesheet"
    />
    <navbar />
    <div class="app-container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
export default {
  components: {
    navbar
  }
};
</script>

<style>
.app-container {
  padding-top: 3rem;
  width: 100%;
}
</style>