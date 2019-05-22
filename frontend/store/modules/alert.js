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

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
