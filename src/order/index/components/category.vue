<template lang="pug">
  mixin list(img, des)
    .category.pull-left.mr40.mb30(class= attributes.class)
      img(src= img)
      span.d-ib.color-grey2.mt10= des
  .index-category.pull-right
    p.ft14.pull-left.mb20 配送服务品类
    br
    +list('../images/icon_kinds_10.png', '水果')(class="clearbt")
    +list('../images/icon_kinds_9.png', '鲜花')
    +list('../images/icon_kinds_6.png', '文件')
    +list('../images/icon_kinds_1.png', '冻品')
    +list('../images/icon_kinds_7.png', '糕点')
    +list('../images/icon_kinds_5.png', '餐饮')
    +list('../images/icon_kinds_12.png', '酒水')
    +list('../images/icon_kinds_8.png', '蛋糕')
    +list('../images/icon_kinds_4.png', '电子')
    +list('../images/icon_kinds_3.png', '批发')
    +list('../images/icon_kinds_2.png', '药品')
    +list('../images/icon_kinds_11.png', '搬家')
</template>

<script>
export default {
  name: 'category'
}
</script>

<style lang="scss" scoped>
.index-category {
  width: 600px;
  height: 300px;
  padding: 30px 0 0 50px;
  background-color: rgba(60, 62, 52, 0.7);
  border-radius: 4px;
  .category {
    width: 50px;
    height: 80px;
  }
}
</style>
