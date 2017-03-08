<template lang="pug">
  mixin list(title)
    span(class= attributes.class).ft14.pull-left.color-grey3= title
  .index-login.pull-left
    img.ml-10.pull-left(src="../images/sologan.png")
    div.wfull.pull-left
      +list('30分钟')(class="mr20")
      +list('|')(class="mr15")
      +list('1小时')(class="mr20")
      +list('|')(class="mr15")
      +list('2小时')(class="mr20")
      +list('|')(class="mr15")
      +list('4小时')(class="mr20")
      +list('|')(class="mr15")
      +list('当日达')
    div.wfull.pull-left
      span.ft20.pull-left.color-red3.mt20 专人专车上门
      span.ft40.pull-left.color-red3.mt-5.ml40 .
      span.ft20.pull-right.color-red3.mt20 同城全品类支持
</template>

<script>
export default {
  name: 'login'
}
</script>

<style lang="scss" scoped>
.index-login {
  width: 360px;
}
</style>
