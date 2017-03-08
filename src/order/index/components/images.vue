<template lang="pug">
  .index-images.pull-left.clearbt.mt80
    img.pull-left(src="../images/pic_5.png")
    .img-wrapper.pull-left.ml10
      img(src="../images/pic_4.png")
      img.mt10(src="../images/pic_1.png")
    img.pull-left.ml10(src="../images/pic_2.png")
    img.pull-left.ml10(src="../images/pic_3.png")
</template>

<script>
export default {
  name: 'images'
}
</script>

<style lang="scss" scoped>
.index-images {
  width: 100%;
  height: 405px;
  .img-wrapper {
    width: 352px;
    height: 405px;
  }
}
</style>
