import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'cookie'

import alert from '@/store/modules/alert'
import auth from '@/store/modules/auth'

Vue.use(Vuex)
const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      alert,
      auth
    },
    actions: {
      async nuxtServerInit({ commit }, { req, $axios }) {
        if (req !== undefined) {
          const cookies = Cookie.parse(req.headers.cookie || '')
          const token = cookies.JWT || ''
          if (token) {
            commit('setToken', token)
            commit('setLoggedIn', true)
            const user = await $axios.$get('/api/v1/auth/user/')
            commit('setUser', user)
          }
        }
      }
    }
  })
}

export default createStore
