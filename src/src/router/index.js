import Vue from 'vue'
import Router from 'vue-router'
import Product from '@/components/Product'
import Content from '@/components/Content'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Content',
      component: Content
    },
    {
      path: '/page/:cat/:page',
      name: 'page',
      component: Content
    },
    {
      path: '/store/:cat/:item/',
      name: 'store',
      component: Product
    }
  ]
})
