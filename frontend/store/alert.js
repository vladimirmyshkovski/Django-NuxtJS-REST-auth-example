const state = () => ({
  show: false,
  messages: []
})

const getters = {
  messages(state) {
    return state.messages
  },
  show(state) {
    return state.show
  }
}

const mutations = {
  setMessage(state, payload) {
    const message = {
      type: payload.type,
      text: payload.text
    }
    state.messages.push(message)
  },
  clearMessages(state) {
    state.messages = []
  },
  showMessages(state) {
    state.show = true
  },
  hideMessages(state) {
    state.show = false
  }
}

export const actions = {
  setMessage({ commit }, payload) {
    commit('setMessage', payload)
  },
  clearMessages({ commit }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('clearMessages', payload)
        resolve()
      }, 3000)
    })
  },
  showMessages({ commit }, payload) {
    commit('showMessages', payload)
  },
  hideMessages({ commit }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('hideMessages', payload)
        resolve()
      }, 3000)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
