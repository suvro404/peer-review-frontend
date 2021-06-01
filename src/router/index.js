import Vue from 'vue'
import Router from 'vue-router'
import Home from "../views/Home";
import EmployeeRoutes from "../modules/employee/routes"
import AdminRoutes from "../modules/admin/routes"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    ...EmployeeRoutes,
    ...AdminRoutes,
    {
      path: '*',
      name: 'Error',
      component:  () => import('../views/Error')
    },
  ]
})
