<template>
  <div>
    <div v-if="employeeList && employeesPerformanceList">
      <v-toolbar dense elevation="0" outlined  class="fixed-bar">
        <v-btn icon @click="$router.push('/')">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-toolbar-title class="d-xs-none">Admin Panel</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-tooltip bottom v-if="currentAdmin">
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="ma-2"
              color="red"
              text-color="white"
              v-bind="attrs"
              v-on="on"
            >
              {{currentAdmin.name}}
              <v-icon right>
                mdi-account-outline
              </v-icon>
            </v-chip>
          </template>
          <div>
            <div>{{currentAdmin.name}}</div>
            <div>{{currentAdmin.position}}</div>
            <div>ID: {{currentAdmin.admin_id}}</div>
          </div>
        </v-tooltip>
      </v-toolbar>
      <div>
        <div class="d-sm-none d-md-none d-lg-none d-xl-none mt-4">Admin Panel</div>
        <v-row
          align="center"
          justify="space-around"
          class="mt-4 mb-1"
        >
          <v-btn color="primary" depressed @click="openAddDialog" class="add-btn">
            <v-icon left>
              mdi-plus
            </v-icon>
            EMPLOYEE
          </v-btn>
        </v-row>
        <div v-if="employeeList.length && employeesPerformanceList.length">
          <v-row justify="center" dense>
            <v-col v-for="employee in employeeList" :key="employee.id" class="d-flex justify-center align-center">
              <div v-for="empPerformance in employeesPerformanceList" :key="empPerformance.emp_id">
                <v-card elevation="2" v-if="employee.emp_id == empPerformance.emp_id" class="mt-4 mb-4 pb-3">
                  <v-card-title class="justify-center">
                    {{employee.name}}
                  </v-card-title>
                  <v-card-subtitle class="justify-center">
                    {{employee.position}}
                  </v-card-subtitle>
                  <v-card-text class="justify-center">
                    <v-btn
                      class="mr-2 edit-btn"
                      fab
                      outlined
                      x-small
                      color="white"
                      @click="openEditDialog(employee)"
                    >
                      <v-icon dark>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn
                      class="ml-2 delete-btn"
                      fab
                      outlined
                      x-small
                      color="white"
                      @click="openDeleteDialog(employee)"
                    >
                      <v-icon dark>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <v-btn color="primary" class="review-btn" depressed @click="openReviewDialog(empPerformance)">
                      CHANGE REVIEW
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-col>
          </v-row>
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
    <review-dialog :employeeReview="employeeReviewToModify"></review-dialog>
    <edit-dialog :employee="employeeToModify" :employeeList="listWithoutCurrentEmployee"></edit-dialog>
    <delete-dialog :employee="employeeToModify"></delete-dialog>
    <add-dialog :employeeList="employeeList" :lastEmployeeId="lastEmployeeId"></add-dialog>
    <snackbar-status ref="snackBar"></snackbar-status>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import ReviewDialog from "../components/ReviewDialog";
import EditDialog from "../components/EditDialog";
import DeleteDialog from "../components/DeleteDialog";
import AddDialog from "../components/AddDialog";
import LoadingSpinner from "../../../components/LoadingSpinner";
import SnackBar from "../../../components/SnackBar";

export default {
  name: "Admin",
  data() {
    return {
      employeeToModify: null,
      employeeReviewToModify: null,
      listWithoutCurrentEmployee: null,
      employeeList: null,
      employeesPerformanceList: null,
      adminList: null,
      loading: false,
      lastEmployeeId: 1,
      snackbarStatus: ""
    }
  },
  computed: {
    adminId() {
      return this.$route.params.id.toUpperCase();
    },
    currentAdmin() {
      return this.adminList.find(admin => admin.admin_id == this.adminId);
    }
  },
  components: {
    'review-dialog': ReviewDialog,
    'edit-dialog': EditDialog,
    'delete-dialog': DeleteDialog,
    'add-dialog':AddDialog,
    'loading-spinner': LoadingSpinner,
    'snackbar-status': SnackBar
  },
  async mounted() {
    await this.fetchAdmins();
    await this.fetchEmployees();
    await this.fetchEmployeesPerformanceList();
  },
  methods: {
    openReviewDialog(employeeReview) {
      this.employeeReviewToModify = employeeReview;
      this.$store.commit("admin/changeReviewDialogVisibility", true);
    },
    openEditDialog(employee) {
      this.employeeToModify = employee;
      this.listWithoutCurrentEmployee = this.getListWithoutCurrentEmployee(this.employeeList, employee.emp_id);
      this.$store.commit("admin/changeEditDialogVisibility", true);
    },
    openDeleteDialog(employee) {
      this.employeeToModify = employee;
      this.$store.commit("admin/changeDeleteDialogVisibility", true);
    },
    getListWithoutCurrentEmployee(list, empId) {
      return (list.filter((item) => item.emp_id !== empId));
    },
    openAddDialog() {
      this.$store.commit("admin/changeAddDialogVisibility", true);
    },
    async fetchAdmins() {
      let action = "fetch-list";
      let reqData = {query: "admin_list"};
      let that = this;
      await this.fetchData(action, reqData, function (list) {
        that.adminList = list;
      });
    },
    async fetchEmployees() {
      let action = "fetch-list";
      let reqData = {query: "employee_list"};
      let that = this;
      await this.fetchData(action, reqData, function (list) {
        that.lastEmployeeId = that.getLastId(list);
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
        this.loading = false;
          // console.log(response);

          callback(response.data);
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
    },
    getLastId(list) {
      if(list.length) {
        let arr = list.sort(function(a, b) {
          return (a.id - b.id);
        });
        return Number(arr[arr.length - 1].id);
      }
      return 1;
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
.review-btn:hover, .edit-btn:hover, .add-btn:hover {
  background: green !important;
  border: green !important;
}
.delete-btn:hover {
  background: #E53935;
  border: #E53935;
}
@media only screen and (max-width: 600px) {
  .v-card {
    width: 300px;
    max-width: 400px;
  }
}
</style>
