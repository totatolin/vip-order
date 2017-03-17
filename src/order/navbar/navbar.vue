<template lang="pug">
  .navbar-wrapper
    .navbar-content
      img.navbar-img.pull-left.mt25(src="../images/icon_logo@3x.png")
      .navbar-list.ft14.ml30.mt15.pull-right.cursor-pointer(v-for="(list, index) in lists" v-bind:class="list.sel? 'navbar-list-class': ''" @click="navbarSel(index)")
        a(v-bind:href="list.src") {{list.name}}
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      lists: [
        {
          name: '我的账户',
          sel: false
        },
        {
          name: '地址管理',
          sel: false
        },
        {
          name: '全部运单',
          src: '/#/orderList',
          sel: false
        },
        {
          name: '下单发货',
          src: '/#/order',
          sel: false
        }
      ]
    }
  },
  methods: {
    navbarSel (index) {
      this.lists.forEach((sel) => {
        sel.sel = false
      })
      this.lists[index].sel = true
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-wrapper {
  min-width: 1170px;
  width: 100%;
  height: 70px;
  background-color: #474a39;
  .navbar-content {
    width: 1080px;
    height: 70px;
    margin: 0 auto;
    .navbar-img {
      width: 95px;
      height: 22px;
    }
    .navbar-list {
      width: 100px;
      height: 40px;
      line-height: 40px;
      border-radius: 100px;
      a {
        color: #ffffff;
        text-decoration: none;
      }
    }
    .navbar-list-class {
      background-color: rgba(40, 43, 36, 0.5);
      a {
        color: #f9684b;
      }
    }
  }
}
</style>
