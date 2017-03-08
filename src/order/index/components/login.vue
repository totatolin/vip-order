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
    span.ft14.pull-left.color-red2.mt15 {{warnTip}}&nbsp
    form.loginForm.pull-left
      section.wfull.h55.bb
        input.input-style.ft16.pull-left(type="text" placeholder="登录手机号" name="tel" maxlength="11" v-model="telNum")
        span.ft16.lh55.cursor-pointer.pull-right(v-show="mobileCodeShow" @click="sendCode()") 获取
        span.ft16.lh55.pull-right(v-show="!mobileCodeShow" v-model="mobileCodeTime") {{mobileCodeTime}}s
      section.wfull.h55
        input.input-style.ft16.pull-left(type="text" placeholder="验证码" name="mobileCode" autocomplete="off" maxlength="4" v-model="mobileCode")
        img.cursor-pointer.pull-right.mt12(src="../images/signin.png" @click="login()")
</template>

<script>
import {getCode, login} from '../index.js'
export default {
  name: 'login',
  data () {
    return {
      warnTip: '', // 检测信息
      telNum: null, // 电话号码
      mobileCodeShow: true, // 获取验证码显示
      mobileCodeTime: 60, // 验证码获取60s倒数
      mobileCode: '' // 验证码
    }
  },
  computed: {
    // 检测手机号
    checkTel () {
      return /^1\d{10}$/gi.test(this.telNum)
    }
  },
  methods: {
    // 发送验证码
    async sendCode () {
      if (!this.checkTel) {
        this.warnTip = '输入正确的手机号'
        return
      } else {
        this.warnTip = ''
        this.mobileCodeShow = false
        var time = setInterval(() => {
          this.mobileCodeTime --
          if (this.mobileCodeTime === 0) {
            clearInterval(time)
            this.mobileCodeShow = true
          }
        }, 1000)
        await getCode(this.telNum)
      }
    },
    // 登录
    async login () {
      if (!this.checkTel) {
        this.warnTip = '输入正确的手机号'
        return
      } else if (!(/^\d{4}$/gi.test(this.mobileCode))) {
        this.warnTip = '输入正确的验证码'
        return
      } else {
        let res = await login(this.telNum, this.mobileCode)
        if (res.data.code === '1') {
          console.info(222)
        } else {
          this.warnTip = res.data.message
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.index-login {
  width: 360px;
  height: 300px;
  .loginForm {
    width: 360px;
    height: 110px;
    padding: 0 25px;
    background-color: rgba(60, 62, 52, 0.7);
    border-radius: 4px;
    .input-style {
      width: 200px;
      height: 54px;
      border: none;
      background-color: transparent;
    }
    .mt12 {
      margin-top: 12px;
    }
    .bb {
      border-bottom: 1px solid #6a6b65;
    }
  }
}
</style>
