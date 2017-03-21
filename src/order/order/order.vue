<template lang="pug">
div
  .scrollable-zone
    .top-bar
      button.back(@click='goToLastPage()') 返回
      .tips.ml30
        span 温馨提示：返回至上层将丢失此页的表单填充数据，非地址错误较多的情况下
        span.color-red3.ml5 谨慎操作
    order-item
    order-item
    order-item
    add-sender
  bottom-bar
</template>

<script>
import orderItem from './order_item.vue'
import bottomBar from './bottom_bar.vue'
import addSender from './add_sender.vue'

export default {
  components: {
    orderItem,
    bottomBar,
    addSender
  },
  methods: {
    goToLastPage: function () {
      history.go(-1)
    }
  }
}
</script>

<style>
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
