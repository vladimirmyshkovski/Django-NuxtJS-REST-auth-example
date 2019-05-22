import Cookies from 'js-cookie'

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

const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setToken(state, payload) {
    state.token = payload
  },
  setLoggedIn(state, payload) {
    state.loggedIn = payload
  },
  setCookie(state, payload) {
    let minutes
    if ('date' in payload) {
      minutes = payload.date
    } else {
      minutes = 30
    }
    const date = new Date()
    date.setTime(date.getTime() + minutes * 60 * 1000)
    Cookies.set(payload.key, payload.value, { expires: date })
  },
  clearCookie(state, payload) {
    Cookies.remove(payload.key)
  },
  setErrors(state, payload) {
    state.errors = payload
  }
}

export default {
  state,
  getters,
  mutations
}
