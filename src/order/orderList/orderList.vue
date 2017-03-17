<template lang="pug">
  .order-list
    .order-oper.wfull.h70
      .order-oper-content
        .print.pull-left.mt15.cursor-pointer(@click="showPrintSel")
          img.print-img.pull-left(src="./images/print.png")
          span.ft14 选择打印
        .order-oper-right.pull-right
          el-input.w220.mt15.pull-left(placeholder="搜索电话" icon="search" v-model="filterData.tel")
          el-date-picker.mt15.ml15.pull-left(type="date" placeholder="选择日期" v-model="filterData.date")
          el-dropdown(trigger="click" @command="statusSel").mt15.ml15.pull-left
            el-button {{filterData.status | statusSel}}
              i.el-icon-caret-bottom.el-icon--right
            el-dropdown-menu(slot="dropdown")
              el-dropdown-item(command="") 全部状态
              el-dropdown-item(command="begin") 未取件
              el-dropdown-item(command="sending") 配送中
              el-dropdown-item(command="complete") 已妥投
              el-dropdown-item(command="cancel") 已取消
          .mt15.ml15.pull-right
            el-button(type="primary" @click="listFilter()") 筛选
            el-button(@click="listFilterReset()") 重置
    list
</template>

<script>
import { mapActions } from 'vuex'
import list from './components/list.vue'
export default {
  name: 'orderList',
  components: {
    list
  },
  data () {
    return {
      // 过滤筛选数据
      filterData: {
        tel: '',
        date: '',
        status: ''
      },
      // 筛选状态
      status: ['begin', 'sending', 'complete', 'cancel']
    }
  },
  computed: {
    // 检测手机号
    checkTel () {
      return /^1\d{10}$/gi.test(this.filterData.tel)
    }
  },
  methods: {
    listFilter () {
      if (!this.checkTel && this.filterData.tel !== '') {
        return alert('请输入正确的手机号')
      } else {
        this.$emit('filter', this.filterData)
      }
    },
    listFilterReset () {
      this.filterData = {
        tel: '',
        date: '',
        status: ''
      }
    },
    statusSel (command) {
      this.filterData.status = command
    },
    showPrintSel () {
      this.$store.dispatch('showPrintSel')
    },
    ...mapActions([
      'showPrintSel'
    ])
  }
}
</script>

<style lang="scss" scoped>
.order-list {
  .order-oper {
    border-bottom: 1px solid #e0e2e0;
    .order-oper-content {
      width: 1080px;
      height: 70px;
      margin: 0 auto;
      .print {
        width: 120px;
        height: 36px;
        line-height: 36px;
        background-color: #20a0ff;
        border-radius: 4px;
        .print-img {
          margin: 10px 0 0 10px;
        }
      }
      .order-oper-right {
        width: 700px;
        .w220 {
          width: 220px;
        }
      }
    }
  }
}
</style>
