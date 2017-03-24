<template lang="pug">
.outer-modal
  .inner-modal
    .modal-title 选择配送服务
    .sub-title.mt40.mb5 品类保护
    .mt5
      .type-protection-div.d-ib.mt10.mr20(v-for='(item, index) in typeProtectionOptions'  v-bind:class='{chosen: typeList[index].isSelected, unchosen: !typeList[index].isSelected}' @click='toggleType(index)')
        img.icon.pull-right.mr20.mt5(v-if="typeList[index].isSelected" src="./images/icon_option_seled@3x.png")
        .item-name.d-ib {{item.name}}
        .add-price.d-ib.ml15 +￥{{item.price}}
        .example-list {{item.suggestCateName}}
    .sub-title.mt30 方案选择
    .schema-selection.mt15
      .item-wrapper(v-for='(item, index) in schemaOptions' @click='toggleSchema(index)')
        img.icon.mt15.mr15.pull-right(v-if="schemaList[index].isSelected" src="./images/radio_ed@3x.png")
        img.icon.mt15.mr15.pull-right(v-if="!schemaList[index].isSelected" src="./images/radio_un@3x.png")
        .item {{item.name}}
    hr.mr40.mt30
    button.bottom-btn.mr40.mt30.pull-right(@click='hideServiceOptions()') 关闭
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'serviceOptions',
  data () {
    return {
      typeProtectionOptions: this.$store.state.order.typeProtectionOptions,
      schemaOptions: this.$store.state.order.schemaOptions,
      typeList: this.$store.state.order.receivers[this.$store.state.order.selectedReceiverIndex].serviceOptionsData.typeList,
      schemaList: this.$store.state.order.receivers[this.$store.state.order.selectedReceiverIndex].serviceOptionsData.schemaList
    }
  },
  methods: {
    ...mapActions([
      'toggleType',
      'toggleSchema',
      'hideServiceOptions'
    ])
  }
}

</script>

<style lang="scss" scoped>
.outer-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(69, 73, 78, 0.7);
  text-align: left;
  overflow-y: auto;
  z-index: 1;
}
.inner-modal {
  width: 780px;
  height: 550px;
  position: absolute;
  margin-top: 100px;
  margin-bottom: 100px;
  left: 50%;
  margin-left: -390px;
  padding: 40px 0 40px 40px;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow-y: auto;
}
.modal-title {
  font-family: PingFang-SC-Medium;
  font-size: 14px;
  color: #282b24;
  line-height: 14px;
}
.sub-title {
  font-family: PingFang-SC-Regular;
  font-size: 14px;
  color: #6b6560;
  line-height: 14px;
}
.type-protection-div {
  width: 220px;
  height: 56px;
  border-radius: 4px;
  padding: 11px 0 0 16px;
  box-sizing: border-box;
  overflow-y: hidden;
  .item-name {
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    line-height: 14px;
  }
  .add-price {
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    line-height: 14px;
  }
  .example-list {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    line-height: 12px;
    margin-top: 8px;
  }
}
.unchosen {
  background-color: #ffffff;
  border: 1px solid #c5c4bc;
  .item-name {
    color: #282b24;
  }
  .add-price {
    color: #f9684b;
  }
  .example-list {
    color: #9e9d9a;
  }
}
.chosen {
  background-color: #709bcd;
  border: 1px solid #ffffff;
  .item-name {
    color: #ffffff;
  }
  .add-price {
    color: #ffffff;
  }
  .example-list {
    color: #ffffff;
  }
}
.schema-selection {
  width: 700px;
  background-color: #ffffff;
  border: 1px solid #c5c4bc;
  border-radius: 4px;
  .item-wrapper {
    padding: 0 15px;
    box-sizing: border-box;
    &:last-child {
      .item {
        border-bottom: none;
      }
    }
  }
  .item {
    height: 54px;
    width: 100%;
    border-bottom: 1px solid #d8d8d8;
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #282b24;
    line-height: 54px;
  }
}
img.icon {
  width: 24px;
}
.bottom-btn {
  width: 70px;
  height: 40px;
  background: #f9684b;
  border-radius: 4px;
  border: none;
  font-family: PingFang-SC-Regular;
  font-size: 14px;
  color: #ffffff;
}
</style>
