<template lang="pug">
  .index-page
    .index-wrapper
      .index-wrapper-header.wfull.h35
        img.pull-left(src="./images/icon_logo.png")
        button.btn.btn-red.pull-right 开放平台
      .index-wrapper-body.wfull.mt80
        login
        category
</template>

<script>
import login from './components/login.vue'
import category from './components/category.vue'
export default {
  components: {
    login,
    category
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
