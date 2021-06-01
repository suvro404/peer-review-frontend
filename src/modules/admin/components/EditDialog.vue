<template>
  <v-dialog v-model="dialogOpened" max-width="600">
    <v-card>
      <v-card-title class="headline grey lighten-2 justify-center">
        Edit Employee
      </v-card-title>

      <v-card-text v-if="employee && employeeList" class="mt-4">
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
  name: "EditDialog",
  props: ['employee', 'employeeList'],
  data() {
    return {
      positions: ['Software Engineer', 'Front-end Engineer', 'Back-end Engineer', 'QA Engineer'],
    }
  },
  computed: {
    dialogOpened: {
      get() {
        return this.$store.state.admin.editDialogOpened;
      },
      set(value) {
        this.$store.commit("admin/changeEditDialogVisibility", value);
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
  methods: {
    closeDialog() {
      this.$store.commit("admin/changeEditDialogVisibility", false);
    },
    submit() {
      if(this.isValid(this.employee)) {
        let action = "update-list";
        let reqData = {query: "employee_list", command: "update_employee", data: this.employee};
        this.$parent.updateList(action, reqData);
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
