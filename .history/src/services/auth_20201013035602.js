import Api from '../store/api'

export default {
  register: (payload) => {
    return Api().post(process.env.VUE_APP_API_URL + 'register', payload)
  },
  login: (payload) => {
    return Api().post(process.env.VUE_APP_API_URL + 'login', payload)
  },
}