const state = () => ({
  loading: false,
  clipped: false,
  drawer: false,
  fixed: false
})

const getters = {
  loading(state) {
    return state.loading
  },
  clipped(state) {
    return state.clipped
  },
  drawer(state) {
    return state.drawer
  },
  fixed(state) {
    return state.fixed
  }
}

const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  toggleDrawer(state) {
    state.drawer = !state.drawer
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
