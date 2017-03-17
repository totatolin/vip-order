<template lang="pug">
  .foot.p-fx
    .foot-body
      img.pull-left.mt25(src="../order/images/sprites/worktime.png")
      span.ft12.color-grey2.pull-left.ml5.mt25 工作时间：周一至周五 09:00-18:00
      img.pull-left.ml40.mt25(src="../order/images/sprites/tel.png")
      span.ft12.color-grey2.pull-left.ml5.mt25 联系我们：400-0123-575
      span.ft12.color-grey2.pull-right.mt25 @Copyright 浙ICP 备 11034583号-2
</template>

<script>
export default {
  name: 'foot'
}
</script>

<style lang="scss" scoped>
.foot {
  min-width: 1170px;
  width: 100%;
  height: 60px;
  background-color: #34302b;
  bottom: 0;
  .foot-body {
    width: 1080px;
    height: 60px;
    margin: 0 auto;
  }
}
</style>
