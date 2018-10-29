import Vue from 'vue'
import Router from 'vue-router'
import Dashbord from '../components/Dashbord.vue'
import Products from '../components/Products.vue'
import Parser from '../components/Parser.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashbord',
      component: Dashbord
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/parser',
      name: 'Parser',
      component: Parser
    }
  ]
})
