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

const actions = {
  signIn({ commit }, payload) {
    commit('clearMessages')
    const message = {
      type: 'warning',
      text: 'Your request is being processed.'
    }
    commit('setMessage', message)
    commit('showMessages')

    this.$axios
      .post('/api/v1/auth/login/', {
        username: payload.username,
        password: payload.password
      })
      .then(res => {
        commit('setUser', res.data.user)
        commit('setToken', res.data.token)
        commit('setCookie', { key: 'JWT', value: res.data.token })
        commit('setLoggedIn', true)
        commit('hideMessages')
        commit('clearMessages')
        this.$router.push('/')
      })
      .catch(error => {
        if ('non_field_errors' in error.response.data) {
          const message = {
            type: 'error',
            text: error.response.data.non_field_errors[0]
          }
          commit('clearMessages')
          commit('setMessage', message)
          commit('showMessages')
          commit('setErrors', error.response.data)
        }
      })
  },
  signUp({ commit }, payload) {
    commit('clearMessages')

    this.$axios
      .post('/api/v1/auth/registration/', {
        username: payload.username,
        email: payload.email,
        password1: payload.password,
        password2: payload.confirmPassword,
        ref: payload.ref
      })
      .then(res => {
        commit('setMessage', {
          type: 'success',
          text: res.data.detail
        })
        commit('showMessages')
      })
      .catch(error => {
        if ('non_field_errors' in error.response.data) {
          const message = {
            type: 'error',
            text: error.response.data.non_field_errors[0]
          }
          commit('clearMessages')
          commit('setMessage', message)
          commit('showMessages')
        }
        commit('setErrors', error.response.data)
      })
  },
  signOut({ commit }) {
    commit('clearMessages')
    this.$router.push('/')

    this.$axios
      .post('/api/v1/auth/logout/')
      .then(() => {
        commit('setUser', null)
        commit('setToken', null)
        commit('setLoggedIn', false)
        commit('clearCookie', { key: 'JWT', value: '' })
      })
      .catch(error => {
        commit('setErrors', error.response.data)
      })
  },
  verifyEmail({ commit }, payload) {
    commit('clearMessages')

    const url = '/api/v1/auth/registration/verify-email/'
    this.$axios
      .post(url, {
        key: payload.key
      })
      .then(() => {
        commit('clearMessages')
        commit('setMessage', {
          type: 'success',
          text: 'Email verified. You can log in.'
        })
        commit('showMessages')
        this.$router.push('/api/v1/auth/signin')
      })
      .catch(error => {
        commit('setErrors', error.response.data)
      })
  },
  restorePassword({ commit }, payload) {
    commit('clearMessages')

    this.$axios
      .post('/api/v1/auth/password/reset/', {
        email: payload.email
      })
      .then(res => {
        commit('clearMessages')
        commit('setMessage', {
          type: 'success',
          text: res.data.detail
        })
        commit('showMessages')
        this.$router.push('/')
      })
      .catch(error => {
        commit('setErrors', error.response.data)
      })
  },
  restorePasswordConfirm({ commit }, payload) {
    commit('clearMessages')

    const url = '/api/v1/auth/password/reset/confirm/'
    this.$axios
      .post(url, {
        uid: payload.uid,
        token: payload.token,
        new_password1: payload.new_password1,
        new_password2: payload.new_password2
      })
      .then(res => {
        commit('clearMessages')
        commit('setMessage', {
          type: 'success',
          text: res.data.detail
        })
        commit('showMessages')
        this.$router.push('/api/v1/auth/signin')
      })
      .catch(() => {
        commit('clearMessages')
        commit('setMessage', {
          type: 'error',
          text: 'Invalid confirmation key.'
        })
        commit('showMessages')
      })
  },
  restoreUser({ commit }, payload) {
    const newUser = {
      username: payload.username,
      token: payload.key
    }
    commit('setUser', newUser)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
