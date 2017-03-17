export default {
  state: {
    isPrintShow: false
  },
  mutations: {
    showPrintSel (state) {
      state.isPrintShow = true
    }
  },
  actions: {
    showPrintSel: ({commit}) => {
      commit('showPrintSel')
    }
  }
}
