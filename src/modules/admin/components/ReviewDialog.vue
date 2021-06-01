<template>
  <v-dialog v-model="dialogOpened" max-width="600">
    <v-card>
      <v-card-title class="headline grey lighten-2 justify-center">
        Edit Employee Review
      </v-card-title>

      <v-card-text v-if="employeeReview" class="mt-4">
        <div v-for="review in employeeReview.review_detail" :key="review.id">
          <div>
            <v-select
              v-model="review.performance"
              :items="options"
              :label="review.quality"
              outlined
            ></v-select>
          </div>
        </div>
      </v-card-text>
      <v-card-text v-else>
        No Data Found
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
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
          color="primary"
          depressed
          @click="submit"
          class="ml-2"
        >
          SUBMIT
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
name: "ReviewDialog",
  props: ['employeeReview'],
  data() {
    return {
      options:['Unsatisfactory', 'Satisfactory', 'Good', 'Excellent']
    }
  },
  computed: {
    dialogOpened: {
      get() {
        return this.$store.state.admin.reviewDialogOpened;
      },
      set(value) {
        this.$store.commit("admin/changeReviewDialogVisibility", value);
      }
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit("admin/changeReviewDialogVisibility", false);
    },
    submit() {
      let action = "update-list";
      let reqData = {query: "employee_performance_list", command: "update_performance", data: this.employeeReview};
      this.$parent.updateList(action, reqData);
    }
  }
}
</script>

<style scoped>

</style>
