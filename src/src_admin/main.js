import Vue from 'vue'
import Vuetify from 'vuetify'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import Admin from './Admin'


Vue.use(Vuetify)
Vue.use(BootstrapVue);
Vue.component('v-icon', Icon)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { Admin },
  template: '<Admin/>'
})
