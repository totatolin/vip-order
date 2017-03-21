<template lang="pug">
.one-order.mt20
  .single-line
    .d-ib.state
      img.icon(src="./images/icon_add_sent@3x.png")
    input.user-name(v-model='sender.name')
    input.tel(v-model='sender.tel')
    input.addr(v-model='sender.addressName' @keyup='delayExec(getLnglatFromName, sender.addressName, 2000)')
    .d-ib.location
      img.icon(src="./images/bt_location_st2@3x.png")
    .pull-right
      .d-ib.draw-time 上门取货时间
      el-date-picker.order-time.ml20.mr25(v-model='orderTime' type="datetime" placeholder="选择时间")
      //- button.order-time.ml20.mr25
        span 立即发货
        img.icon(src="./images/up_2@3x.png")
  .single-line(v-for="(item, index) in receivers")
    .d-ib.state
      img.icon(v-if="index===0" src="./images/icon_add_rece@3x.png")
      img.dot(v-if="index>0" src="./images/icon_rece dot@3x.png")
    input.user-name(v-model='item.name')
    input.tel(v-model='item.tel')
    input.addr(v-model='item.addressName' @keyup='delayExec(getLnglatFromName, receivers[index].addressName, 2000)')
    .d-ib.location
      img.icon(src="./images/bt_location_st2@3x.png")
  .add-receiver.pull-right.mr25(@click="addReceiver(receivers)")
    img.icon(src="./images/bt_添加送货地址@3x.png")
    .d-ib(@click="getLnglatFromName('浙江大学')") 添加送货地址
</template>

<script>
import AMap from 'AMap'

export default {
  data () {
    return {
      // 输入时间延迟事件ID
      delayInputId: undefined,
      orderTime: '',
      sender: {
        name: '用户1',
        tel: '18012340001',
        addressName: '地址1',
        lng: undefined,
        lat: undefined
      },
      receivers: [
        {
          name: '用户2',
          tel: '18012340002',
          addressName: '地址2',
          lng: undefined,
          lat: undefined
        },
        {
          name: '用户3',
          tel: '18012340003',
          addressName: '地址3',
          lng: undefined,
          lat: undefined
        }
      ]
    }
  },
  methods: {
    addReceiver: function (receivers) {
      receivers.push({})
    },
    /**
     * [delayExec description]
     * @param  {[type]} func         [被延迟的函数]
     * @param  {[type]} payLoad      [被延迟的函数参数]
     * @param  {[type]} delayTime    [延迟时间]
     */
    delayExec: function (callback, payLoad, delayTime) {
      console.log('delayInputId = ')
      console.log(this.delayInputId)
      clearTimeout(this.delayInputId)
      this.delayInputId = setTimeout(
        () => {
          callback(payLoad)
        },
        delayTime
      )
    },
    getLnglatFromName: function (name) {
      AMap.service(['AMap.PlaceSearch'], function () {
        let placeSearch = new AMap.PlaceSearch({
          pageSize: 1,
          pageIndex: 1,
          city: '杭州市'
        })
        placeSearch.search(name, (status, result) => {
          console.log(result)
        })
      })
    }
  }
}
</script>

<style>
.one-order {
  width: 1100px;
  font-family: PingFang-SC-Regular;
  font-size: 14px;
  color: #6b6560;
  text-align: left;
  margin-left: 170px;
  margin-right: 170px;
  box-sizing: border-box;
  line-height: 60px;
  background-color: #ffffff;
}
.one-order:after {
  content: "";
  display: block;
  clear: both;
  height: 0;
}
.single-line {
  height: 60px;
  border-bottom: 1px solid #e0e2e0;
}
.state {
  margin-left: 30px;
}
img.icon {
  width: 24px;
}
img.dot {
  width: 8px;
  margin: 8px;
}
input {
  height: 14px;
  border: none;
}
.user-name {
  width: 50px;
  margin-left: 14px; 
}
.tel {
  width: 100px;
  margin-left: 33px;
}
.addr {
  width: 250px;
  margin-left: 30px;
}
.location {
  margin-left: 40px;
}
.draw-time {
  line-height: 14px;
}
button.order-time {
  width: 110px;
  height: 32px;
  line-height: 14px;
  background-color: #ffffff;
  border: 1px solid #fb464a;
  border-radius: 4px;
  font-family: PingFang-SC-Regular;
  font-size: 14px;
  color: #f9684b;
}
.add-receiver {
  font-family: PingFang-SC-Regular;
  font-size: 14px;
  color: #709bcd;
}
</style>
