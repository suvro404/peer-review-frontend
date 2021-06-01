// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import ApiPlugin from "@/plugins/ApiPlugin";
import vuetify from '@/plugins/vuetify'

Vue.config.productionTip = false

Vue.use(ApiPlugin, {'host': 'http://localhost:3000'});

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  components: { App },
  template: '<App/>'
})
