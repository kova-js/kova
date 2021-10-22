const indexStore = {
  namespaced: true,
  state: {
    data: {},
  },
  mutations: {
    setData(state: any, payload: any): void {
      state.data = payload.data
    },
  },
  actions: {
    initialData({ commit }: any, { payload }: any): void {
      commit('setData', payload)
    },
  },
}

export { indexStore }
