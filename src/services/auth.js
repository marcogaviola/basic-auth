import Api from '../store/api'
export default {
  register: (payload) => {
    return Api().post('auth/register', payload)
  },
  login: (payload) => {
    return Api().post('auth/login', payload)
  },
  verify: (payload) => {
    return Api().post('auth/verify', payload)
  },
  isLoggedIn: () => {
    return Api().get('auth/me')
  }
}
