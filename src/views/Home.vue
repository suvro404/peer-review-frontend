<template>
  <v-container>
    <div class="header-title mt-6">
      Employee Performance Review
    </div>
    <div class="login">
      <span>I am an</span>
      <div class="mt-4">
        <v-btn
          depressed
          color="primary"
          class="mr-2"
          @click="goToPage('employee')"
        >
          EMPLOYEE
        </v-btn>
        <v-btn
          depressed
          color="primary"
          class="ml-2"
          @click="goToPage('admin')"
        >
          ADMIN
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      currentEmployeeId: "PPE-1",
      currentAdminId: "PPA-1"
    }
  },
  methods: {
    goToPage(empType) {
      let id = "";
      let route = {};
      if(empType == "employee") {
        id = this.currentEmployeeId.toLowerCase();
        route = {name: "Employee", params: {id}};
      } else {
        id = this.currentAdminId.toLowerCase();
        route = {name: "Admin", params: {id}};
      }
      this.$router.push(route);
    }
  }
}
</script>

<style scoped>
.container {
  background: #f45b69 !important;
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
}

.login {
  overflow: hidden;
  background-color: white;
  padding: 40px 30px 30px 30px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  max-width: 500px;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-transition: -webkit-transform 300ms, box-shadow 300ms;
  -moz-transition: -moz-transform 300ms, box-shadow 300ms;
  transition: transform 300ms, box-shadow 300ms;
  box-shadow: 5px 10px 10px rgba(2, 128, 144, 0.2);
}
.login::before, .login::after {
  content: "";
  position: absolute;
  width: 600px;
  height: 600px;
  border-top-left-radius: 40%;
  border-top-right-radius: 45%;
  border-bottom-left-radius: 35%;
  border-bottom-right-radius: 40%;
  z-index: -1;
}
.login::before {
  left: 40%;
  bottom: -130%;
  background-color: rgba(69, 105, 144, 0.15);
  -webkit-animation: waves 6s infinite linear;
  -moz-animation: waves 6s infinite linear;
  animation: waves 6s infinite linear;
}
.login::after {
  left: 35%;
  bottom: -125%;
  background-color: rgba(2, 128, 144, 0.2);
  -webkit-animation: waves 7s infinite;
  -moz-animation: waves 7s infinite;
  animation: waves 7s infinite;
}


@-webkit-keyframes waves {
  from {
    -webkit-transform: rotate(0);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes waves {
  from {
    -moz-transform: rotate(0);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
@keyframes waves {
  from {
    -webkit-transform: rotate(0);
    -moz-transform: rotate(0);
    -ms-transform: rotate(0);
    -o-transform: rotate(0);
    transform: rotate(0);
  }
  to {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.v-btn:hover {
  background: green !important;
}
@media only screen and (max-width: 600px) {
  .login {
    width: 300px;
    max-width: 400px;
  }
}
</style>
