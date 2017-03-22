<template lang="pug">
.one-order.mt20
  .single-line
    .d-ib.state
      img.icon(src="./images/icon_add_sent@3x.png")
    input.user-name(v-model='sender.name' placeholder="姓名")
    input.tel(v-model='sender.tel' placeholder="电话号码")
    input.addr(v-model='sender.addressName' @keyup='delayExec(getLnglatFromName, {name: sender.addressName, type: "sender"}, 1000)' placeholder="地址")
    .d-ib.location
      img.icon(v-if="sender.isAddrValid" src="./images/bt_location_st2@3x.png")
      img.icon(v-if="!sender.isAddrValid" src="./images/bt_location_st3@3x.png")
      .err-locating(v-if="!sender.isAddrValid") 该地址定位失败，点击按钮进行辅助定位
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
    input.user-name(v-model='item.name' placeholder="姓名")
    input.tel(v-model='item.tel' placeholder="电话号码")
    input.addr(v-model='item.addressName' @keyup='delayExec(getLnglatFromName, {name: receivers[index].addressName, type: "receiver", index: index}, 1000)' placeholder="地址")
    .d-ib.location
      img.icon(v-if="receivers[index].isAddrValid" src="./images/bt_location_st2@3x.png")
      img.icon(v-if="!receivers[index].isAddrValid" src="./images/bt_location_st3@3x.png")
      .err-locating(v-if="!receivers[index].isAddrValid") 该地址定位失败，点击按钮进行辅助定位
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
        lat: undefined,
        isAddrValid: true
      },
      receivers: [
        {
          name: '用户2',
          tel: '18012340002',
          addressName: '地址2',
          lng: undefined,
          lat: undefined,
          isAddrValid: true
        },
        {
          name: '用户3',
          tel: '18012340003',
          addressName: '地址3',
          lng: undefined,
          lat: undefined,
          isAddrValid: true
        }
      ]
    }
  },
  methods: {
    addReceiver: function (receivers) {
      receivers.push({})
    },
    setSenderAddr: function (senderAddr) {
      this.sender.addressName = senderAddr.name
      this.sender.lng = senderAddr.location.lng
      this.sender.lat = senderAddr.location.lat
    },
    setReceiverAddr: function (receiverAddr, index) {
      this.receivers[index].addressName = receiverAddr.name
      this.receivers[index].lng = receiverAddr.location.lng
      this.receivers[index].lat = receiverAddr.location.lat
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
              that.sender.isAddrValid = true
            } else if (para.type === 'receiver') {
              that.$options.methods.setReceiverAddr.bind(that)(result.poiList.pois[0], para.index)
              that.receivers[para.index].isAddrValid = true
            }
          } catch (err) {
            // 处理查询不到对应地址的情况
            console.log('Caught an error.')
            if (para.type === 'sender') {
              that.sender.isAddrValid = false
            } else if (para.type === 'receiver') {
              that.receivers[para.index].isAddrValid = false
            }
          }
        })
      })
    }
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
}
</style>
