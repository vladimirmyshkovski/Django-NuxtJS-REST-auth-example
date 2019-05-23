import Cookie from 'cookie'

export const strict = false

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async nuxtServerInit({ commit }, { req, $axios }) {
    if (req !== undefined) {
      const cookies = Cookie.parse(req.headers.cookie || '')
      const token = cookies.JWT || ''
      if (token) {
        commit('auth/setToken', token)
        commit('auth/setLoggedIn', true)
        const user = await $axios.$get('/api/v1/auth/user/')
        commit('auth/setUser', user)
      }
    }
  }
}
