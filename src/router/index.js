import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Index from 'order/index/index.vue'
import Order from 'order/order/order.vue'
import OrderList from 'order/orderList/orderList.vue'

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
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/orderList',
      name: 'OrderList',
      component: OrderList
    }
  ]
})
