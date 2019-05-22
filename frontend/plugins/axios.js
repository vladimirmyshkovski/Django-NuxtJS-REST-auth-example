export default function({ store, $axios, redirect }) {
  $axios.onRequest(config => {
    store.commit('setLoading', true)
    if (store.state.auth.token) {
      config.headers.common['Authorization'] = `JWT ${store.state.auth.token}`
    }
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      redirect('/')
      store.commit('clearMessages')
      store.commit('setMessage', {
        type: 'error',
        text: 'Your session has expired'
      })
      store.commit('showMessages')
      store.commit('clearCookie', { key: 'JWT' })
      store.commit('setToken', null)
    }
    store.commit('setLoading', false)
  })
  $axios.onResponse(() => {
    store.commit('setLoading', false)
  })
}
