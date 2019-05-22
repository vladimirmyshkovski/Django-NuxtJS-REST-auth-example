const state = () => ({
  user: null,
  token: null,
  loggedIn: false,
  errors: {}
})

const getters = {
  user(state) {
    return state.user
  },
  token(state) {
    return state.token
  },
  loggedIn(state) {
    return state.loggedIn
  },
  errors(state) {
    return state.errors
  }
}

export default {
  state,
  getters
}
