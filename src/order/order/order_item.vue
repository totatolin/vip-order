<template lang="pug">
.one-order.mt20
  .single-line
    .d-ib.state
      img.icon(src="./images/icon_add_sent@3x.png")
    input.user-name(v-model='$store.state.order.sender.name' placeholder="姓名")
    input.tel(v-model='$store.state.order.sender.tel' placeholder="电话号码")
    input.addr(v-model='$store.state.order.sender.addressName' @keyup='delayExec(getLnglatFromName, {name: $store.state.order.sender.addressName, type: "sender"}, 1000)' placeholder="地址")
    .d-ib.location
      img.icon(v-if="$store.state.order.sender.isAddrValid" src="./images/bt_location_st2@3x.png")
      img.icon(v-if="!$store.state.order.sender.isAddrValid" src="./images/bt_location_st3@3x.png")
      .err-locating(v-if="!$store.state.order.sender.isAddrValid") 该地址定位失败，点击按钮进行辅助定位
    .pull-right
      .d-ib.draw-time 上门取货时间
      el-date-picker.order-time.ml20.mr25(v-model='$store.state.order.orderTime' type="datetime" placeholder="选择时间")
      //- button.order-time.ml20.mr25
        span 立即发货
        img.icon(src="./images/up_2@3x.png")
  .single-line(v-for="(item, index) in $store.state.order.receivers")
    .d-ib.state
      img.icon(v-if="index===0" src="./images/icon_add_rece@3x.png")
      img.dot(v-if="index>0" src="./images/icon_rece dot@3x.png")
    input.user-name(v-model='item.name' placeholder="姓名")
    input.tel(v-model='item.tel' placeholder="电话号码")
    input.addr(v-model='item.addressName' @keyup='delayExec(getLnglatFromName, {name: $store.state.order.receivers[index].addressName, type: "receiver", index: index}, 1000)' placeholder="地址")
    .d-ib.location
      img.icon(v-if="$store.state.order.receivers[index].isAddrValid" src="./images/bt_location_st2@3x.png")
      img.icon(v-if="!$store.state.order.receivers[index].isAddrValid" src="./images/bt_location_st3@3x.png")
      .err-locating(v-if="!$store.state.order.receivers[index].isAddrValid") 该地址定位失败，点击按钮进行辅助定位
    img.icon.ml100(src="./images/up@3x.png" @click='showServiceOptions({senderIndex: 0, receiverIndex: index})')
  .add-receiver.pull-right.mr25(@click="addReceiver()")
    img.icon(src="./images/bt_添加送货地址@3x.png")
    .d-ib 添加送货地址
</template>

<script>
import AMap from 'AMap'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      // 输入时间延迟事件ID
      delayInputId: undefined
    }
  },
  methods: {
    setSenderAddr: function (senderAddr) {
      this.$store.state.order.sender.addressName = senderAddr.name
      this.$store.state.order.sender.lng = senderAddr.location.lng
      this.$store.state.order.sender.lat = senderAddr.location.lat
    },
    setReceiverAddr: function (receiverAddr, index) {
      this.$store.state.order.receivers[index].addressName = receiverAddr.name
      this.$store.state.order.receivers[index].lng = receiverAddr.location.lng
      this.$store.state.order.receivers[index].lat = receiverAddr.location.lat
    },
    /**
     * [delayExec description]
     * @param  {[type]} func         [被延迟的函数]
     * @param  {[type]} payLoad      [被延迟的函数参数]
     * @param  {[type]} delayTime    [延迟时间]
     */
    delayExec: function (callback, payLoad, delayTime) {
      clearTimeout(this.delayInputId)
      this.delayInputId = setTimeout(
        () => {
          callback(payLoad)
          this.delayInputId = undefined
        },
        delayTime
      )
    },
    /**
     * [getLnglatFromName description]
     * @param  {[type]} para [包含name,type,index三个参数，type可选值为'sender'和'receiver',如果type==='receiver',则index必填]
     */
    getLnglatFromName: function (para) {
      // 如果输入框为空，不进行搜索
      if (para.name.trim() === '') {
        return
      }
      let that = this
      AMap.service(['AMap.PlaceSearch'], function () {
        let placeSearch = new AMap.PlaceSearch({
          pageSize: 1,
          pageIndex: 1,
          city: '杭州市'
        })
        placeSearch.search(para.name, (status, result) => {
          console.log(status)
          console.log(result)
          try {
            if (para.type === 'sender') {
              that.$options.methods.setSenderAddr.bind(that)(result.poiList.pois[0])
              that.$store.state.order.sender.isAddrValid = true
            } else if (para.type === 'receiver') {
              that.$options.methods.setReceiverAddr.bind(that)(result.poiList.pois[0], para.index)
              that.$store.state.order.receivers[para.index].isAddrValid = true
            }
          } catch (err) {
            // 处理查询不到对应地址的情况
            console.log('Caught an error.')
            if (para.type === 'sender') {
              that.$store.state.order.sender.isAddrValid = false
            } else if (para.type === 'receiver') {
              that.$store.state.order.receivers[para.index].isAddrValid = false
            }
          }
        })
      })
    },
    ...mapActions([
      'showServiceOptions',
      'hideServiceOptions',
      'addReceiver'
    ])
  }
}
</script>

<style lang="scss" scoped>
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
  // 设置input输入框的placeholder样式
  @mixin input-placeholder {
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    line-height: 14px;
    color: #e0e2e0;
  }
  &::-webkit-input-placeholder {
    @include input-placeholder;
  }
  &:-moz-placeholder {
    @include input-placeholder;
  }
  &::-moz-placeholder {
    @include input-placeholder;
  }
  &::ms-input-placeholder {
    @include input-placeholder;
  }
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
  position: relative;
  margin-left: 40px;
}
.err-locating {
  height: 27px;
  width: 230px;
  position: absolute;
  margin: -18px 0 0 -200px;
  box-sizing: border-box;
  background-color: #fae6e6;
  border: 1px solid #fb464a;
  border-radius: 2px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #f9684b;
  line-height: 27px;
  text-align: center;
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
  cursor: default;
}
</style>
