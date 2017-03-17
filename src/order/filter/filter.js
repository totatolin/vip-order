import Vue from 'vue'

Vue.filter('status', function (type) {
  let result = ''
  switch (type) {
    case '':
      result = '待确认'
      break
    case undefined:
      result = '待确认'
      break
    case 'create':
      result = '待确认'
      break
    case 'begin':
      result = '未取件'
      break
    case 'sending':
      result = '配送中'
      break
    case 'error_complete':
      result = '异常妥投'
      break
    case 'end':
      result = '已结束'
      break
    case 'cancel':
      result = '已取消'
      break
    case 'complete':
      result = '已妥投'
      break
  }
  return result
})

Vue.filter('statusSel', function (type) {
  let result = ''
  switch (type) {
    case '':
      result = '全部状态'
      break
    case 'begin':
      result = '未取件'
      break
    case 'sending':
      result = '配送中'
      break
    case 'complete':
      result = '已妥投'
      break
    case 'cancel':
      result = '已取消'
      break
  }
  return result
})
