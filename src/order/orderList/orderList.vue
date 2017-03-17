<template lang="pug">
  .order-list
    .order-oper.wfull.h70
      .order-oper-content
        .print.pull-left.mt15.cursor-pointer
          img.print-img.pull-left(src="./images/print.png")
          span.ft14 选择打印
        .order-oper-right.pull-right
          el-input.w220.mt15.pull-left(placeholder="搜索姓名/电话/地址" icon="search")
          el-date-picker.mt15.ml15.pull-left(type="date" placeholder="选择日期")
          el-dropdown(trigger="click").mt15.ml15.pull-left
            el-button 全部状态
              i.el-icon-caret-bottom.el-icon--right
            el-dropdown-menu(slot="dropdown")
              el-dropdown-item 未取件
              el-dropdown-item 配送中
              el-dropdown-item 已妥投
              el-dropdown-item 已取消
    .order-lists
      .order.wfull.hfull.bc-white.mt25(v-for="orderList in orderListData")
        .order-send.h15
          .order-send-left.pull-left
            img.pull-left(src="./images/send.png")
            span.ft14.w50.ml15.color-grey1.pull-left {{orderList.sender.name}}
            span.ft14.ml15.color-grey1.pull-left |
            span.ft14.w90.ml15.color-grey1.pull-left {{orderList.sender.tel}}
            span.ft14.w200.ml15.color-grey1.pull-left {{orderList.sender.address}}
          .order-num.pull-left.ml20(v-bind:class="orderOpen?'order-open':'order-close'") {{orderList.receivers.length}} 个订单
          .order-send-right.w400.pull-right
            span.ft14.color-grey1.pull-left {{orderList.dueTime}}
            img.pull-right.cursor-pointer(v-show="orderOpen" src="./images/open.png")
            img.pull-right.cursor-pointer(v-show="!orderOpen" src="./images/close.png")
            span.ft14.color-grey1.pull-right 展开
        .order-receive.wfull.mt20(v-for="(orderReceive, index) in orderList.receivers" v-bind:class="index === 0? 'mt35':''")
          .order-receive-top.wfull
            span.ft16.color-black1.ml20.pull-left {{orderReceive.expressNo}}
          .order-receive-bottom.wfull
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import {initData} from './orderList'
export default {
  name: 'orderList',
  data () {
    return {
      initData: [], // 初始化数据
      orderListData: [], // 订单列表数据
      orderOpen: true // 订单是否被展开
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      // 初始化数据
      let res = await initData()
      this.initData = res.data.content

      // 筛选并去重所有时间和寄件人id
      let dueObj = {}
      let senderObj = {}
      _.forEach(this.initData, (data) => {
        let time = moment(data.dueTime).format('MMMM Do YYYY, h')
        dueObj[time] = time
        senderObj[data.sender.id] = data.sender.id
      })
      let dueTime = Object.values(dueObj)
      let senderId = Object.values(senderObj)

      // 将初始数据按照时间和寄件人id重新分组
      _.forEach(dueTime, (time) => {
        let obj = {}
        _.forEach(senderId, (id) => {
          let receivers = []
          _.forEach(this.initData, (data) => {
            if (moment(data.dueTime).format('MMMM Do YYYY, h') === time && data.sender.id === id) {
              obj['dueTime'] = moment(data.dueTime).format('YYYY-MM-DD HH:mm:ss')
              obj['sender'] = data.sender
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
      console.info(this.orderListData)
    }
  },
  filters: {
    aa () {
      return 1
    }
  }
}
</script>

<style lang="scss" scoped>
.order-list {
  .order-oper {
    border-bottom: 1px solid #e0e2e0;
    .order-oper-content {
      width: 1080px;
      height: 70px;
      margin: 0 auto;
      .print {
        width: 120px;
        height: 36px;
        line-height: 36px;
        background-color: #709bcd;
        border-radius: 4px;
        .print-img {
          margin: 10px 0 0 10px;
        }
      }
      .order-oper-right {
        width: 565px;
        .w220 {
          width: 220px;
        }
      }
    }
  }
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
      }
    }
  }
}
</style>
