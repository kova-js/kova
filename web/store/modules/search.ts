const searchStore = {
  namespaced: true,
  state: {
    searchText: '',
  },
  mutations: {
    setText(state: any, payload: any) {
      state.searchText = payload.text
    },
  },
  actions: {
    setText({ commit }: any, { payload }: any) {
      commit('setText', payload)
    },
  },
}

export { searchStore }
