<template lang="pug">
  #app
    //- <!-- <img src="./assets/logo.png"> -->
    ul
      li
        a(href="/") 1
      li
        a(href="/#/index") 2
    router-view
</template>

<script>
export default {
  mounted () {
    console.info(this.$route.name)
  }
}
</script>

<style lang="scss">
@import './assets/scss/style.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  min-width: 1170px;
}
</style>
