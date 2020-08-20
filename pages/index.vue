<template></template>

<script>
export default {
  name: "default",
  middleware({ redirect }) {
    return redirect("/login");
  }
};
</script>

<style>
</style>