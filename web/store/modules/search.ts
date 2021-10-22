const searchStore = {
  namespaced: true,
  state: {
    searchText: '',
  },
  mutations: {
    setText(state: any, payload: any): void  {
      state.searchText = payload.text
    },
  },
  actions: {
    setText({ commit }: any, { payload }: any): void  {
      commit('setText', payload)
    },
  },
}

export { searchStore }
