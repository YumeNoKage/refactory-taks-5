import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap'
import VCalendar from 'v-calendar';
import Calendar from 'v-calendar/lib/components/calendar.umd'

Vue.use('bootstap')
Vue.use(VCalendar)

Vue.component('calendar', Calendar)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
