<template>
  <div>
    <div v-if="employeeList && employeesPerformanceList">
      <v-toolbar dense elevation="0" outlined  class="fixed-bar">
        <v-btn icon @click="$router.push('/')">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-toolbar-title class="d-xs-none">Employee Panel</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="ma-2"
              color="red"
              text-color="white"
              v-bind="attrs"
              v-on="on"
            >
              {{currentEmployee.name}}
              <v-icon right>
                mdi-account-outline
              </v-icon>
            </v-chip>
          </template>
          <div>
            <div>{{currentEmployee.name}}</div>
            <div>{{currentEmployee.position}}</div>
            <div>ID: {{currentEmployee.emp_id}}</div>
          </div>
        </v-tooltip>
      </v-toolbar>
      <div>
        <div class="d-sm-none d-md-none d-lg-none d-xl-none mt-4">Employee Panel</div>
        <div v-if="employeeList.length && employeesPerformanceList.length && employeeId">
          <v-row justify="center" dense>
            <v-col v-for="employee in listWithoutCurrentEmployee(employeeList)" :key="employee.id" class="d-flex justify-center align-center">
              <div v-for="empPerformance in listWithoutCurrentEmployee(employeesPerformanceList)" :key="empPerformance.emp_id">
                <v-card elevation="2" v-if="employee.emp_id == empPerformance.emp_id" class="mt-4 mb-4 pb-3">
                  <v-card-title class="justify-center">
                    {{employee.name}}
                  </v-card-title>
                  <v-card-subtitle class="justify-center">
                    {{employee.position}}
                  </v-card-subtitle>
                  <v-card-actions class="justify-center">
                    <div v-if="employeeId == empPerformance.reviewed_by">
                      <v-btn disabled>
                        REVIEWED
                      </v-btn>
                    </div>
                    <div v-else>
                      <v-btn v-if="canReview(empPerformance.emp_id)"
                             class="review-btn" color="primary" depressed @click="openDialog(employee)">
                        REVIEW PERFORMANCE
                      </v-btn>
                      <v-btn v-else disabled>
                        CAN'T REVIEW
                      </v-btn>
                    </div>
                  </v-card-actions>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </div>
        <div v-else>
          <div v-if="!loading">
            No Data Found.
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="!loading">
        No Data Found. Please make sure you have an active internet connection and the local server is running.
      </div>
    </div>
    <div v-if="loading">
      <loading-spinner></loading-spinner>
    </div>
    <performance-dialog :employeeToReview="employeeToReview" :reviewedBy="employeeId" :employeesPerformanceList="employeesPerformanceList"></performance-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import PerformanceDialog from "../components/PerformanceDialog";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default {
  name: "Employee",
  data() {
    return {
      employeeToReview: null,
      employeeList: null,
      employeesPerformanceList: null,
      loading: false
    }
  },
  computed: {
    employeeId() {
      return this.$route.params.id.toUpperCase();
    },
    currentEmployee() {
      return this.employeeList.find(employee => employee.emp_id == this.employeeId);
    }
  },
  components: {
    'performance-dialog': PerformanceDialog,
    'loading-spinner': LoadingSpinner
  },
  async mounted() {
    await this.fetchEmployees();
    await this.fetchEmployeesPerformanceList();
  },
  methods: {
    listWithoutCurrentEmployee(list) {
      return (list.filter((item) => item.emp_id !== this.employeeId));
    },
    openDialog(employee) {
      this.employeeToReview = employee;
      this.$store.commit("employee/changeDialogVisibility", true);
    },
    canReview(empToReviewId) {
      let currentEmpReviewDetails = this.employeeList.find(employee => employee.emp_id == this.currentEmployee.emp_id);
      return (currentEmpReviewDetails.can_review.includes(empToReviewId));
    },
    async fetchEmployees() {
      let action = "fetch-list";
      let reqData = {query: "employee_list"};
      let that = this;
      await this.fetchData(action, reqData, function (list) {
        that.employeeList = list;
      });
    },
    async fetchEmployeesPerformanceList() {
      let action = "fetch-list";
      let reqData = {query: "employee_performance_list"};
      let that = this;
      await this.fetchData(action, reqData, function (list) {
        that.employeesPerformanceList = list;
      });
    },
    fetchData(action, reqData, callback) {
      this.loading = true;
      this.$api.query(action,reqData,
        (response) => {
          // console.log(response);
          this.loading = false;
          callback(response.data);
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
    },
    updateList(action,reqData) {
      this.loading = true;
      this.$api.command(action,reqData,
        (response) => {
          this.loading = false;
          this.$refs.snackBar.changeStatus("success");
          this.fetchEmployees();
        },
        (error) => {
          this.loading = false;
          this.$refs.snackBar.changeStatus("failed");
          console.log(error);
        }
      );
    }
  }
}
</script>

<style scoped>
.fixed-bar {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 0;
  z-index: 2;
}
  .v-card {
    width: 400px;
    max-width: 500px;
    background: #F45B69;
  }
.review-btn:hover {
  background: green !important;
}
  @media only screen and (max-width: 600px) {
    .v-card {
      width: 300px;
      max-width: 400px;
    }
  }
</style>
