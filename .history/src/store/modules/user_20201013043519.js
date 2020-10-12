
import Auth from "@/services/auth"
const getDefaultState = () => {
  return {
    currentUser: {}
  }
}
export default {
  namespaced: true,
  state: getDefaultState(),
  actions: {
    async register({ commit }, payload) {
      const data = await Auth.register(payload)
      console.log(data);
      return data
    },
    async login({ commit }, payload) {
      const data = await Auth.login(payload)
      return data
    },
    async verify({ commit }, payload) {
      const data = await Auth.verify(payload)
      return data
    }
  },
  mutations: {
    SET_USER: (state, data) => state.currentUser = data,
    RESET_STATE: (state) => Object.assign(state, getDefaultState())
  }
}

