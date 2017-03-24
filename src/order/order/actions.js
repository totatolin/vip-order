export default {
  state: {
    isShowServiceOptions: false,
    selectedSenderIndex: undefined,
    selectedReceiverIndex: undefined,
    typeProtectionOptions: [],
    schemaOptions: [],
    orderTime: '',
    sender: {
      name: '用户1',
      tel: '18012340001',
      addressName: '地址1',
      lng: undefined,
      lat: undefined,
      isAddrValid: true
    },
    receivers: [
      {
        name: '用户2',
        tel: '18012340002',
        addressName: '地址2',
        lng: undefined,
        lat: undefined,
        isAddrValid: true,
        serviceOptionsData: {
          typeList: [],
          schemaList: []
        }
      }
    ]
  },
  mutations: {
    toggleType (state, index) {
      console.log('toggleType ' + index)
      state.receivers[state.selectedReceiverIndex].serviceOptionsData.typeList[index].isSelected = !state.receivers[state.selectedReceiverIndex].serviceOptionsData.typeList[index].isSelected
    },
    toggleSchema (state, index) {
      console.log('toggleSchema ' + index)
      if (!state.receivers[state.selectedReceiverIndex].serviceOptionsData.schemaList[index].isSelected) {
        state.receivers[state.selectedReceiverIndex].serviceOptionsData.schemaList.map((item) => { item.isSelected = false })
        state.receivers[state.selectedReceiverIndex].serviceOptionsData.schemaList[index].isSelected = true
      }
    },
    // payLoad 内包含 senderIndex 和 receiverindex 两个 key
    showServiceOptions (state, payLoad) {
      state.selectedSenderIndex = payLoad.senderIndex
      state.selectedReceiverIndex = payLoad.receiverIndex
      state.isShowServiceOptions = true
    },
    hideServiceOptions (state) {
      state.selectedSenderIndex = undefined
      state.selectedReceiverIndex = undefined
      state.isShowServiceOptions = false
    },
    addReceiver (state) {
      state.receivers.push(
        Object.assign({}, state.receiverProtoData)
      )
    }
  },
  actions: {
    toggleType: ({commit}, index) => {
      commit('toggleType', index)
    },
    toggleSchema: ({commit}, index) => {
      commit('toggleSchema', index)
    },
    showServiceOptions: ({commit}, payLoad) => {
      commit('showServiceOptions', payLoad)
    },
    hideServiceOptions: ({commit}) => {
      commit('hideServiceOptions')
    },
    addReceiver: ({commit}) => {
      commit('addReceiver')
    }
  }
}
