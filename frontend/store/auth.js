import Cookies from 'js-cookie'

export const strict = false

export const state = () => ({
  user: null,
  token: null,
  loggedIn: false,
  errors: {}
})

export const getters = {
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

export const mutations = {
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

export const actions = {
  signIn({ commit, dispatch }, payload) {
    dispatch('alert/clearMessages', null, { root: true })
    const message = {
      type: 'warning',
      text: 'Your request is being processed.'
    }
    dispatch('alert/setMessage', message, { root: true })
    dispatch('alert/showMessages', null, { root: true })

    this.$axios
      .post('/api/v1/auth/login/', {
        username: payload.username,
        password: payload.password
      })
      .then(response => {
        commit('setUser', response.data.user)
        commit('setToken', response.data.token)
        commit('setCookie', { key: 'JWT', value: response.data.token })
        commit('setLoggedIn', true, { root: true })
        this.$router.push('/')
      })
      .catch(error => {
        if ('non_field_errors' in error.response.data) {
          const message = {
            type: 'error',
            text: error.response.data.non_field_errors[0]
          }
          dispatch('alert/clearMessages', null, { root: true })
          dispatch('alert/setMessage', message, { root: true })
          dispatch('alert/showMessages', null, { root: true })
          dispatch('alert/setErrors', error.response.data, { root: true })
        }
      })
      .finally(() => {
        dispatch('alert/hideMessages', null, { root: true })
        dispatch('alert/clearMessages', null, { root: true })
      })
  },
  facebookSignUp({ commit, dispatch }, payload) {
    dispatch('alert/clearMessages', null, { root: true })
    const message = {
      type: 'warning',
      text: 'Facebook login in progress.'
    }
    dispatch('alert/setMessage', message, { root: true })
    dispatch('alert/showMessages', null, { root: true })
    this.$axios
      .post('/api/v1/auth/facebook/', {
        access_token: payload.accessToken,
        code: payload.userID
      })
      .then(response => {
        commit('setUser', response.data.user)
        commit('setToken', response.data.token)
        commit('setCookie', { key: 'JWT', value: response.data.token })
        commit('setLoggedIn', true)
        this.$router.push('/')
      })
      .catch(error => {
        if ('non_field_errors' in error.response.data) {
          const message = {
            type: 'error',
            text: error.response.data.non_field_errors[0]
          }
          dispatch('alert/clearMessages', null, { root: true })
          dispatch('alert/setMessage', message)
          dispatch('alert/showMessages', null, { root: true })
          dispatch('alert/setErrors', error.response.data, { root: true })
        }
      })
      .finally(() => {
        dispatch('alert/hideMessages', null, { root: true })
        dispatch('alert/clearMessages', null, { root: true })
      })
  },
  googleSignUp({ commit, dispatch }, payload) {
    dispatch('alert/clearMessages', null, { root: true })
    const message = {
      type: 'warning',
      text: 'Google login in progress.'
    }
    dispatch('alert/setMessage', message, { root: true })
    dispatch('alert/showMessages', null, { root: true })
    this.$axios
      .post('/api/v1/auth/google/', {
        access_token: payload.access_token,
        code: payload.id_token
      })
      .then(response => {
        commit('setUser', response.data.user)
        commit('setToken', response.data.token)
        commit('setCookie', { key: 'JWT', value: response.data.token })
        commit('setLoggedIn', true)
        this.$router.push('/')
      })
      .catch(error => {
        if ('non_field_errors' in error.response.data) {
          const message = {
            type: 'error',
            text: error.response.data.non_field_errors[0]
          }
          dispatch('alert/clearMessages', null, { root: true })
          dispatch('alert/setMessage', message, { root: true })
          dispatch('alert/showMessages', null, { root: true })
          dispatch('alert/setErrors', error.response.data, { root: true })
        }
      })
      .finally(() => {
        dispatch('alert/hideMessages', null, { root: true })
        dispatch('alert/clearMessages', null, { root: true })
      })
  },
  signUp({ commit, dispatch }, payload) {
    dispatch('alert/clearMessages')

    this.$axios
      .post('/api/v1/auth/registration/', {
        username: payload.username,
        email: payload.email,
        password1: payload.password,
        password2: payload.confirmPassword,
        ref: payload.ref
      })
      .then(res => {
        commit(
          'alert/setMessage',
          {
            type: 'success',
            text: res.data.detail
          },
          {
            root: true
          }
        )
        dispatch('alert/showMessages', null, { root: true })
      })
      .catch(error => {
        if ('non_field_errors' in error.response.data) {
          const message = {
            type: 'error',
            text: error.response.data.non_field_errors[0]
          }
          dispatch('alert/clearMessages', null, { root: true })
          dispatch('alert/setMessage', message, { root: true })
          dispatch('alert/showMessages', null, { root: true })
        }
        dispatch('alert/setErrors', error.response.data, { root: true })
      })
      .finally(() => {
        dispatch('alert/hideMessages', null, { root: true })
        dispatch('alert/clearMessages', null, { root: true })
      })
  },
  signOut({ commit, dispatch }) {
    dispatch('alert/clearMessages', null, { root: true })
    this.$axios
      .post('/api/v1/auth/logout/')
      .then(() => {
        commit('setUser', null)
        commit('setToken', null)
        commit('setLoggedIn', false)
        commit('clearCookie', { key: 'JWT', value: '' })
      })
      .catch(error => {
        dispatch('alert/setErrors', error.response.data, { root: true })
      })
    this.$router.push('/inspire')
  },
  verifyEmail({ commit, dispatch }, payload) {
    dispatch('alert/clearMessages', null, { root: true })

    const url = '/api/v1/auth/registration/verify-email/'
    this.$axios
      .post(url, {
        key: payload.key
      })
      .then(() => {
        dispatch('alert/clearMessages', null, { root: true })
        commit(
          'alert/setMessage',
          {
            type: 'success',
            text: 'Email verified. You can log in.'
          },
          {
            root: true
          }
        )
        dispatch('alert/showMessages', null, { root: true })
        this.$router.push('/api/v1/auth/signin')
      })
      .catch(error => {
        dispatch('alert/setErrors', error.response.data, { root: true })
      })
      .finally(() => {
        dispatch('alert/hideMessages', null, { root: true })
        dispatch('alert/clearMessages', null, { root: true })
      })
  },
  restorePassword({ commit, dispatch }, payload) {
    dispatch('alert/clearMessages', null, { root: true })

    this.$axios
      .post('/api/v1/auth/password/reset/', {
        email: payload.email
      })
      .then(res => {
        dispatch('alert/clearMessages', null, { root: true })
        commit(
          'alert/setMessage',
          {
            type: 'success',
            text: res.data.detail
          },
          {
            root: true
          }
        )
        dispatch('alert/showMessages', null, { root: true })
        this.$router.push('/')
      })
      .catch(error => {
        dispatch('alert/setErrors', error.response.data, { root: true })
      })
      .finally(() => {
        dispatch('alert/hideMessages', null, { root: true })
        dispatch('alert/clearMessages', null, { root: true })
      })
  },
  restorePasswordConfirm({ commit, dispatch }, payload) {
    dispatch('alert/clearMessages')

    const url = '/api/v1/auth/password/reset/confirm/'
    this.$axios
      .post(url, {
        uid: payload.uid,
        token: payload.token,
        new_password1: payload.new_password1,
        new_password2: payload.new_password2
      })
      .then(res => {
        dispatch('alert/clearMessages', null, { root: true })
        commit(
          'alert/setMessage',
          {
            type: 'success',
            text: res.data.detail
          },
          {
            root: true
          }
        )
        dispatch('alert/showMessages', null, { root: true })
        this.$router.push('/api/v1/auth/signin')
      })
      .catch(() => {
        dispatch('alert/clearMessages', null, { root: true })
        commit(
          'alert/setMessage',
          {
            type: 'error',
            text: 'Invalid confirmation key.'
          },
          {
            root: true
          }
        )
        dispatch('alert/showMessages', null, { root: true })
      })
      .finally(() => {
        dispatch('alert/hideMessages', null, { root: true })
        dispatch('alert/clearMessages', null, { root: true })
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
