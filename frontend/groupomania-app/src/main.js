//import vue
import Vue from 'vue'
import App from './App.vue'

// bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// plugins bootstrap
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons)

//sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

// Momentjs
const moment = require('moment')
require('moment/locale/fr')

Vue.use(require('vue-moment'), {
  moment
})

// router
import VueRouter from 'vue-router'
import Routes from './Routes'

//configuration
Vue.config.productionTip = false



// pluging router
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

// instanciation projet [App]
new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')

