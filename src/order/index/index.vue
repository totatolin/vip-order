<template lang="pug">
  .index-page
    .index-wrapper
      .index-wrapper-header.wfull.h35
        img.pull-left(src="../images/icon_logo.png")
        button.btn.btn-red.pull-right 开放平台
      .index-wrapper-body.wfull.mt80
        login
        category
        images
    foot
</template>

<script>
import login from './components/login.vue'
import category from './components/category.vue'
import images from './components/images.vue'
import foot from '../foot.vue'
export default {
  components: {
    login,
    category,
    images,
    foot
  }
}
</script>

<style lang="scss" scoped>
.index-page {
  min-width: 1170px;
  padding-top: 75px;
  background-color: #4e4f41;
  .index-wrapper {
    width: 1080px;
    margin: 0 auto;
    .index-wrapper-body {
      height: 100%;
      min-height: 925px;
    }
  }
}
</style>
