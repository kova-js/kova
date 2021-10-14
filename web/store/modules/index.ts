const indexStore = {
  namespaced: true,
  state: {
    data: {},
  },
  mutations: {
    setData(state: any, payload: any) {
      state.data = payload.data
    },
  },
  actions: {
    initialData({ commit }: any, { payload }: any) {
      commit('setData', payload)
    },
  },
}

export { indexStore }
