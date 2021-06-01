<template>
  <v-dialog v-model="dialogOpened" max-width="600">
    <v-card v-if="employee">
      <v-card-title class="headline grey lighten-2 justify-center">
        Are you sure you want to remove {{employee.name}}?
      </v-card-title>

      <v-divider></v-divider>

      <v-card-actions class="justify-center pt-4 pb-4">
        <v-btn
          color="primary"
          outlined
          depressed
          @click="closeDialog"
          class="mr-2"
        >
          CLOSE
        </v-btn>
        <v-btn
          color="error"
          depressed
          @click="confirm"
          class="ml-2"
        >
          CONFIRM
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteDialog",
  props: ['employee'],
  data() {
    return {
      positions: ['Software Engineer', 'Front-end Engineer', 'Back-end Engineer', 'QA Engineer']
    }
  },
  computed: {
    dialogOpened: {
      get() {
        return this.$store.state.admin.deleteDialogOpened;
      },
      set(value) {
        this.$store.commit("admin/changeDeleteDialogVisibility", value);
      }
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit("admin/changeDeleteDialogVisibility", false);
    },
    confirm() {
      let action = "update-list";
      let reqData = {query: "employee_list", command: "remove_employee", data: this.employee};
      this.$parent.updateList(action, reqData);
    }
  }
}
</script>

<style scoped>

</style>
