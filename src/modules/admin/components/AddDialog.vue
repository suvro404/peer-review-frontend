<template>
  <v-dialog v-model="dialogOpened" max-width="600">
    <v-card>
      <v-card-title class="headline grey lighten-2 justify-center">
        Add Employee
      </v-card-title>
      <v-card-text v-if="employeeList && lastEmployeeId" class="mt-4">
        <v-text-field
          v-model="employee.name"
          label="Name"
          outlined
        ></v-text-field>
        <v-select
          v-model="employee.position"
          :items="positions"
          label="Position"
          outlined
        ></v-select>
        <v-select
          v-model="employee.can_review"
          :items="allEmployees"
          :item-text="'name'"
          :item-value="'emp_id'"
          label="Can review"
          multiple
          outlined
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === 0">
              <span>{{ item.name }}</span>
            </v-chip>
            <span
              v-if="index === 1"
              class="grey--text caption"
            >
          (+{{ employee.can_review.length - 1 }} others)
        </span>
          </template>
        </v-select>
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
  name: "AddDialog",
  props: ['employeeList', 'lastEmployeeId'],
  data() {
    return {
      employee: {
        name: "",
        position: "",
        can_review: [],
        reviewed_by: "",
        review_detail: [
          {id: 1, quality: 'Productivity', performance: ''},
          {id: 2, quality: 'Creativity', performance: ''},
          {id: 3, quality: 'Honesty', performance: ''},
          {id: 4, quality: 'Integrity', performance: ''},
          {id: 5, quality: 'Coworker Relations', performance: ''},
          {id: 6, quality: 'Technical Skills', performance: ''},
          {id: 7, quality: 'Dependability', performance: ''},
          {id: 8, quality: 'Punctuality', performance: ''},
          {id: 9, quality: 'Works to Full Potential', performance: ''},
          {id: 10, quality: 'Quality of Work', performance: ''},
          {id: 11, quality: 'Work Consistency', performance: ''},
          {id: 12, quality: 'Communication', performance: ''},
          {id: 13, quality: 'Independent Work', performance: ''},
          {id: 14, quality: 'Takes Initiative', performance: ''},
          {id: 15, quality: 'Group Work', performance: ''}
        ]
      },
      positions: ['Software Engineer', 'Front-end Engineer', 'Back-end Engineer', 'QA Engineer'],
    }
  },
  computed: {
    dialogOpened: {
      get() {
        return this.$store.state.admin.addDialogOpened;
      },
      set(value) {
        this.$store.commit("admin/changeAddDialogVisibility", value);
      }
    },
    allEmployees() {
      if(this.employeeList) {
        let arr = [];
        for(let i = 0; i < this.employeeList.length; i++) {
          arr.push({name: this.employeeList[i].name, emp_id: this.employeeList[i].emp_id});
        }
        return arr;
      }
    }
  },
  watch: {
    dialogOpened(val) {
      this.resetAll();
    },
  },
  methods: {
    closeDialog() {
      this.$store.commit("admin/changeAddDialogVisibility", false);
    },
    submit() {
      if(this.isValid(this.employee)) {
        this.employee.id = parseInt(this.lastEmployeeId) + 1;
        this.employee.emp_id = "PPE-" + this.employee.id;
        this.createEmployee();
        this.createEmployeePerformancePlaceHolders();
        this.closeDialog();
      }
    },
    createEmployee() {
      let action = "update-list";
      let reqData = {query: "employee_list", command: "add_employee", data: this.employee};
      this.$parent.updateList(action, reqData);
    },
    createEmployeePerformancePlaceHolders() {
      let action = "update-list";
      let reqData = {query: "employee_performance_list", command: "create_performance_placeholders", data: this.employee};
      this.$parent.updateList(action, reqData);
    },
    resetAll() {
      this.employee = {
        name: "",
        position: "",
        can_review: [],
      }
    },
    isValid(employee) {
      if(employee.name != "" && employee.position != "") {
        return true;
      }
      return false;
    }
  }
}
</script>

<style scoped>

</style>
