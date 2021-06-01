<template>
  <div class="spinner-progress">
    <v-progress-circular
      :size="70"
      :width="5"
      color="red"
      indeterminate
    ></v-progress-circular>
    <div class="mt-2">Loading</div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner"
}
</script>

<style scoped>
.spinner-progress {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
