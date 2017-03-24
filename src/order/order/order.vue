<template lang="pug">
div
  .scrollable-zone
    .top-bar
      button.back(@click='goToLastPage()') 返回
      .tips.ml30
        span 温馨提示：返回至上层将丢失此页的表单填充数据，非地址错误较多的情况下
        span.color-red3.ml5 谨慎操作
    order-item
    add-sender
  bottom-bar
  service-options(v-if='$store.state.order.isShowServiceOptions')
</template>

<script>
import orderItem from './order_item.vue'
import bottomBar from './bottom_bar.vue'
import addSender from './add_sender.vue'
import serviceOptions from './service_options.vue'

import axios from 'axios'
import url from '../../config/url.js'

export default {
  components: {
    orderItem,
    bottomBar,
    addSender,
    serviceOptions
  },
  mounted: function () {
    this.$store.state.order.receiverProtoData = {
      addressName: '',
      isAddrValid: true,
      lat: undefined,
      lng: undefined,
      name: '新用户',
      tel: '',
      serviceOptionsData: {
        typeList: [],
        schemaList: []
      }
    }
    // 获取所有保护类型
    axios.get(`${url.java_url}/Category/findProtectTypes`)
    .then((res) => {
      this.$store.state.order.typeProtectionOptions = res.data.data
      // 添加typeList条目
      this.$store.state.order.typeProtectionOptions.map(
        (item) => {
          this.$store.state.order.receiverProtoData.serviceOptionsData.typeList.push(
            { isSelected: false }
          )
        }
      )
      this.$store.state.order.receivers.map((receiver) => {
        receiver.serviceOptionsData.typeList = []
        res.data.data.map((item) => {
          receiver.serviceOptionsData.typeList.push({ isSelected: false })
        })
      })
    })
    // 获取所有服务模式
    axios.get(`${url.java_url}/Category/findServiceTypes`)
    .then((res) => {
      this.$store.state.order.schemaOptions = res.data.data
      // 添加schemaList条目
      this.$store.state.order.schemaOptions.map(
        (item) => {
          this.$store.state.order.receiverProtoData.serviceOptionsData.schemaList.push(
            { isSelected: false }
          )
        }
      )
      this.$store.state.order.receivers.map((receiver) => {
        receiver.serviceOptionsData.schemaList = []
        res.data.data.map((item) => {
          receiver.serviceOptionsData.schemaList.push({ isSelected: false })
        })
      })
    })
    .catch((errRes) => {
      alert(errRes.data.message)
    })
  },
  methods: {
    goToLastPage: function () {
      history.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollable-zone {
  position: absolute;
  top: 80px;
  bottom: 70px;
  overflow-y: auto;
}
.top-bar {
  height: 65px;
  padding: 12px 0 0 170px;
  box-sizing: border-box;
  box-shadow: inset 0 -1px 0 0 #e6e9ec;
  text-align: left;
}
button.back {
  height: 40px;
  width: 68px;
  color: #282b24;
  background-color: #ffffff;
  border: 1px solid #e0e2e0;
  border-radius: 4px;
  font-family: PingFang-SC-Regular;
  font-size: 14px;
}

.tips {
  display: inline-block;
  font-family: PingFang-SC-Regular;
  font-size: 14px;
  color: #9e9d9a;
  line-height: 14px;
}
</style>
