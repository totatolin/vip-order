<template lang="pug">
.bottom-bar
  span 共 &nbsp
  span.total-order-cnt 100
  span &nbsp 单
  span.ml40 预计运费 &nbsp
  span.total-order-price 1000.00
  span &nbsp 元起
  span.ml40 实际价格以配送员确认重量体积后为准
  button.order-now.ml200(@click="printAllData()") 立即下单
</template>

<script>
export default {
  methods: {
    printAllData: function () {
      console.log(this.$parent.$children)
      console.log(this.$parent.$children[0].$data.sender)
      console.log(this.$parent.$children[0].$data.receivers)
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-bar {
  min-width: 1440px;
  height: 70px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #505142;
  text-align: left;
  padding-left: 170px;
  box-sizing: border-box;
  line-height: 70px;
  font-family: PingFang-SC-Regular;
  font-size: 14px;
  color: #e0e2e0;
}
.total-order-cnt {
  font-family: PingFang-SC-Medium;
  font-size: 14px;
  color: #f9684b;
  line-height: 70px;
}
.total-order-price {
  font-family: PingFang-SC-Medium;
  font-size: 24px;
  color: #f9684b;
  line-height: 70px;
}
button.order-now {
  width: 140px;
  height: 40px;
  background-color: #f9684b;
  border-radius: 4px;
  border: none;
  font-family: PingFang-SC-Medium;
  font-size: 18px;
  line-height: 18px;
  color: #ffffff;
}
</style>
