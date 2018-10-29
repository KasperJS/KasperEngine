import vue from 'vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import App from './App'

import Loader from './components/Loader'
import Header from './components/Header'

vue.use(BootstrapVue);

vue.component('v-icon', Icon)
vue.component('Loader-a', Loader)
vue.component('Header-a', Header)

vue.config.productionTip = false



new vue({
  el: '#app',
  router,
  components: { App, },
  template: '<App/>'
})
//Vue.component('v-icon', Icon)
