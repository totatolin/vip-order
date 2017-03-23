import Vue from 'vue'
import Vuex from 'vuex'
import orderList from '../order/orderList/actions'
import order from '../order/order/actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    orderList,
    order
  }
})
