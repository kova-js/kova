const detailStore = {
  namespaced: true,
  state: {
    data: {},
  },
  mutations: {
    setData(state: any, payload: any) {
      state.data = payload
    },
  },
  actions: {
    initialData({ commit }: any, { payload }: any) {
      commit('setData', payload)
    },
  },
}

export { detailStore }
