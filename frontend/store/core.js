export const state = () => ({
  loading: false,
  clipped: false,
  drawer: false,
  fixed: false
})

export const getters = {
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

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  toggleDrawer(state) {
    state.drawer = !state.drawer
  }
}

export const actions = {}
