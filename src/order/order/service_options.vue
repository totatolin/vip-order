<template lang="pug">
.outer-modal
  .inner-modal
    .modal-title 选择配送服务
    .sub-title.mt40.mb5 品类保护
    .mt5
      .type-protection-div.d-ib.mt10.mr20
        .item-name.d-ib 常规保护
        .add-price.d-ib.ml15 +￥1
        .example-list 标准件 | 文件 | 快消
      .type-protection-div.d-ib.mt10.mr20
        .item-name.d-ib 常规保护
        .add-price.d-ib.ml15 +￥1
        .example-list 标准件 | 文件 | 快消
      .type-protection-div.d-ib.mt10.mr20
        .item-name.d-ib 常规保护
        .add-price.d-ib.ml15 +￥1
        .example-list 标准件 | 文件 | 快消
      .type-protection-div.d-ib.mt10.mr20
        .item-name.d-ib 常规保护
        .add-price.d-ib.ml15 +￥1
        .example-list 标准件 | 文件 | 快消
      .type-protection-div.d-ib.mt10.mr20
        .item-name.d-ib 常规保护
        .add-price.d-ib.ml15 +￥1
        .example-list 标准件 | 文件 | 快消
    .sub-title.mt30 方案选择
    .schema-selection.mt15
      .item-wrapper
        .item 配送员上门
      .item-wrapper
        .item 电动车
      .item-wrapper
        .item 三轮车
</template>

<script>
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
  height: 600px;
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
  background-color: #ffffff;
  border: 1px solid #c5c4bc;
  border-radius: 4px;
  padding: 11px 0 0 16px;
  box-sizing: border-box;
  .item-name {
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #282b24;
    line-height: 14px;
  }
  .add-price {
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #f9684b;
    line-height: 14px;
  }
  .example-list {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #9e9d9a;
    line-height: 12px;
    margin-top: 8px;
  }
}
.schema-selection {
  width: 700px;
  height: 300px;
  background-color: #ffffff;
  border: 1px solid #c5c4bc;
  border-radius: 4px;
  .item-wrapper {
    padding: 0 15px;
    box-sizing: border-box;
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
</style>
