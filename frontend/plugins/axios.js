export default function({ store, $axios, redirect }) {
  $axios.onRequest(config => {
    store.commit('core/setLoading', true)
    if (store.state.auth.token) {
      config.headers.common.Authorization = `JWT ${store.state.auth.token}`
    }
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      redirect('/')
      store.dispatch('alert/clearMessages')
      store.dispatch('alert/setMessage', {
        type: 'error',
        text: 'Your session has expired'
      })
      store.dispatch('alert/showMessages')
      store.commit('auth/clearCookie', { key: 'JWT' })
      store.commit('auth/setToken', null)
    }
    store.commit('core/setLoading', false)
  })
  $axios.onResponse(() => {
    store.commit('core/setLoading', false)
  })
}
