<template lang="pug">
  .order-lists
    //- 页面加载
    loading(v-show="loading")

    .order.wfull.hfull.bc-white.mt25(v-for="(orderList, index) in orderListData" v-show="!loading")
      //- 寄件信息
      .order-send.h15
        .order-send-left.pull-left
          input.w15.h15.pull-left.cursor-pointer(type="checkbox" @change="senderPrint(index)" v-model="orderList.sender.isPrint" v-show="$store.state.orderList.isPrintShow")
          img.ml20.pull-left(src="../images/send.png")
          span.ft14.w50.ml15.color-grey1.pull-left {{orderList.sender.name}}
          span.ft14.ml15.color-grey1.pull-left |
          span.ft14.w90.ml15.color-grey1.pull-left {{orderList.sender.tel}}
          span.ft14.ml15.color-grey1.pull-left |
          span.ft14.w200.ml15.color-grey1.pull-left {{orderList.sender.address}}
        .order-num.pull-left.ml20(v-bind:class="orderList.orderOpen?'order-open':'order-close'") {{orderList.receivers.length}} 个订单
        .order-send-right.w400.pull-right
          span.ft14.color-grey1.pull-left {{orderList.dueTime}}
          img.pull-right.cursor-pointer(v-show="orderList.orderOpen" src="../images/open.png" @click="orderList.orderOpen = false")
          img.pull-right.cursor-pointer(v-show="!orderList.orderOpen" src="../images/close.png" @click="orderList.orderOpen = true")
          span.ft14.color-grey1.pull-right 展开
      //- 收件信息
      .order-receive.wfull.mt20(v-for="(orderReceive, index) in orderList.receivers" v-bind:class="index === 0? 'mt35':''" v-show="!orderList.orderOpen")
        .order-receive-top.wfull
          span.ft16.color-black1.ml20.pull-left {{orderReceive.expressNo}}
          span.ft14.color-black1.ml15.pull-left {{orderReceive.category.serviceType.name}}
          .w350.pull-right
            span.ft14.color-grey1.pull-left 配送费用：
            span.ft14.color-red3.pull-left ￥{{orderReceive.category.totalPrice}}
            span.ft14.color-blue3.mr50.cursor-pointer.pull-right 查看详情
        .order-receive-bottom.wfull
          .pull-left
            input.w15.h15.pull-left.cursor-pointer(type="checkbox" v-model="orderReceive.isPrint" v-show="$store.state.orderList.isPrintShow")
            img.mt20.ml20.pull-left(src="../images/receive.png")
            span.ft14.w50.ml15.color-grey1.pull-left {{orderReceive.name}}
            span.ft14.ml15.color-grey1.pull-left |
            span.ft14.w90.ml15.color-grey1.pull-left {{orderReceive.tel}}
            span.ft14.ml15.color-grey1.pull-left |
            span.ft14.w200.ml15.color-grey1.pull-left {{orderReceive.address}}
          .w350.pull-right
            span.ft14.c-green.pull-left {{orderReceive.status | status}}
            .order-cancel.mt15.mr20.pull-right.cursor-pointer
              img.mt10.ml15.pull-left(src="../images/cancel.png")
              span.ft14.color-grey1.ml10.pull-left 取消订单

    //- 分页
    pagination.pull-right(v-bind:page-no="pageNo" v-bind:current.sync="currentPage")
</template>

<script>
import pagination from '../../../components/pagination.vue'
import loading from '../../../components/loading.vue'
import _ from 'lodash'
import moment from 'moment'
import {initData} from '../orderList.js'
export default {
  name: 'list',
  watch: {
    currentPage: 'requestData'
  },
  ready () {
    this.requestData()
  },
  components: {
    loading,
    pagination
  },
  data () {
    return {
      currentPage: 1,
      pageNo: 1,
      loading: true, // 列表加载动画
      initData: [], // 初始化数据
      orderListData: [] // 订单列表数据
    }
  },
  mounted () {
    this.init('wdNi-cHRgHQtejZ7O2OsrynA')
  },
  created () {
    this.$parent.$on('filter', (res) => {
      if (res.date !== undefined) {
        res.date = moment(res.date).format('YYYY-MM-DD HH:mm:ss')
      }
      this.loading = true
      this.init('wdNi-cHRgHQtejZ7O2OsrynA', res.tel, res.date, res.status)
    })
  },
  methods: {
    requestData () {
      console.info(1)
    },
    async init (id, tel, date, status) {
      // 初始化数据
      tel = tel || ''
      date = date || ''
      status = status || ''
      let res = await initData(id, tel, date, status)
      this.initData = res.data.content.content

      this.pageNo = res.data.content.totalPages > 0 ? res.data.content.totalPages : 1

      // 筛选并去重所有时间和寄件人id
      let dueObj = {}
      let senderObj = {}
      _.forEach(this.initData, (data) => {
        let time = moment(data.dueTime).format('MMMM Do YYYY, h')
        dueObj[time] = time
        senderObj[data.sender.id] = data.sender.id
        data['orderOpen'] = true // 初始列表是否展开
        data.sender['isPrint'] = false // 打印状态
        data.receiver['isPrint'] = false  // 打印状态
      })
      let dueTime = Object.values(dueObj)
      let senderId = Object.values(senderObj)

      // 将初始数据按照时间和寄件人id重新分组
      this.orderListData = []
      _.forEach(dueTime, (time) => {
        let obj = {}
        _.forEach(senderId, (id) => {
          let receivers = []
          _.forEach(this.initData, (data) => {
            if (moment(data.dueTime).format('MMMM Do YYYY, h') === time && data.sender.id === id) {
              obj['dueTime'] = moment(data.dueTime).format('YYYY-MM-DD HH:mm:ss')
              obj['sender'] = data.sender
              obj['orderOpen'] = data.orderOpen
              data.receiver['category'] = data.category
              data.receiver['totalPrice'] = data.totalPrice
              data.receiver['expressNo'] = data.expressNo
              data.receiver['status'] = data.status
              receivers.push(data.receiver)
              obj['receivers'] = receivers
            }
          })
        })
        this.orderListData.push(obj)
      })
      this.loading = false
    },
    senderPrint (index) {
      _.forEach(this.orderListData[index].receivers, (data) => {
        data['isPrint'] = this.orderListData[index].sender.isPrint
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order-lists {
  width: 1080px;
  margin: 0 auto;
  .order {
    padding: 15px 30px 30px 30px;
    border-radius: 4px;
    .order-send {
      line-height: 27px;
      .order-send-left {
        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .order-num {
        min-width: 100px;
        width: 100px;
        height: 28px;
      }
      .order-open {
        color: #f9684b;
        background-color: #fff3f0;
        border: 1px solid #f9684b;
        border-radius: 2px;
      }
      .order-close {
        color: #282b24;
        background-color: #fcfcfc;
        border: 1px solid #e0e2e0;
        border-radius: 2px;
      }
    }
    .order-receive {
      height: 125px;
      border: 1px solid #e0e2e0;
      border-radius: 2px;
      .order-receive-top {
        height: 60px;
        line-height: 60px;
        background-color: rgba(243, 243, 240, 0.3);
      }
      .order-receive-bottom {
        height: 65px;
        line-height: 65px;
        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        input[type="checkbox"] {
          margin: 25px 0 0 15px;
        }
        .c-green {
          color: #91ad9d;
        }
        .order-cancel {
          width: 114px;
          height: 36px;
          line-height: 36px;
          border: 1px solid #e0e2e0;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
