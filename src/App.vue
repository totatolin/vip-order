<template lang="pug">
  #app
    //- <!-- <img src="./assets/logo.png"> -->
    navbar(v-show="$route.name === 'Order' || $route.name === 'OrderList'")
    router-view
</template>

<script>
import navbar from './order/navbar/navbar.vue'
export default {
  components: {
    navbar
  },
  mounted () {
    console.info(this.$route.name)
  }
}
</script>

<style lang="scss">
@import './assets/scss/style.scss';
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  min-width: 1170px;
}
</style>
