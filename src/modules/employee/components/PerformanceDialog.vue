<template>
  <v-dialog v-model="dialogOpened" max-width="600">
    <v-card>
      <v-card-title class="headline grey lighten-2 justify-center">
        Review Employee
      </v-card-title>

      <v-card-text v-if="employeeToReview && reviewedBy" class="mt-4">
        <div v-for="item in review_detail" :key="item.id">
          <div>
            <v-select
              v-model="item.performance"
              :items="options"
              :label="item.quality"
              outlined
            ></v-select>
          </div>
        </div>
      </v-card-text>
      <v-card-text v-else>
        No Employee Found
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
name: "PerformanceDialog",
  props: ['employeeToReview', 'reviewedBy', 'employeesPerformanceList'],
  data() {
    return {
      review_detail: [
        {id: 1, quality: 'Productivity', performance: 'Good'},
        {id: 2, quality: 'Creativity', performance: 'Good'},
        {id: 3, quality: 'Honesty', performance: 'Good'},
        {id: 4, quality: 'Integrity', performance: 'Good'},
        {id: 5, quality: 'Coworker Relations', performance: 'Good'},
        {id: 6, quality: 'Technical Skills', performance: 'Good'},
        {id: 7, quality: 'Dependability', performance: 'Good'},
        {id: 8, quality: 'Punctuality', performance: 'Good'},
        {id: 9, quality: 'Works to Full Potential', performance: 'Good'},
        {id: 10, quality: 'Quality of Work', performance: 'Good'},
        {id: 11, quality: 'Work Consistency', performance: 'Good'},
        {id: 12, quality: 'Communication', performance: 'Good'},
        {id: 13, quality: 'Independent Work', performance: 'Good'},
        {id: 14, quality: 'Takes Initiative', performance: 'Good'},
        {id: 15, quality: 'Group Work', performance: 'Good'}
      ],
      options: ['Unsatisfactory', 'Satisfactory', 'Good', 'Excellent']
    }
  },
  computed: {
    dialogOpened: {
      get() {
        return this.$store.state.employee.dialogOpened;
      },
      set(value) {
        this.$store.commit("employee/changeDialogVisibility", value);
      }
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit("employee/changeDialogVisibility", false);
    },
    submit() {
      let action = "update-list";
      let data = {
        id: this.getPerformanceListPosition(),
        emp_id: this.employeeToReview.emp_id,
        reviewed_by: this.reviewedBy,
        review_detail: this.review_detail
      };
      let reqData = {query: "employee_performance_list", command: "update_performance", data: data};
      this.$parent.updateList(action, reqData);
    },
    getPerformanceListPosition() {
      for(let i = 0; i < this.employeesPerformanceList.length; i++) {
        if(this.employeesPerformanceList[i].emp_id == this.employeeToReview.emp_id) {
          return this.employeesPerformanceList[i].id;
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
