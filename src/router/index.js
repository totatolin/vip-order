import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Index from 'order/index/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    }
  ]
})
