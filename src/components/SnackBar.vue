<template>
  <div v-if="status">
    <v-snackbar
      v-model="status"
      :color="snackbarColor"
    >
      {{ getMessage(status) }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          v-bind="attrs"
          @click="status = ''"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "SnackBar",
  data() {
    return {
      status: ""
    }
  },
  computed: {
    snackbarColor() {
      return (this.status == "success" ? "green" : "red");
    },
  },
  methods: {
    getMessage(status) {
      return (status == "success" ? "SUCCESS" : "FAILED");
    },
    changeStatus(status) {
      this.status = status;
    }
  }
}
</script>

<style scoped>

</style>
