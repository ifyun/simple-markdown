import { createStore } from "vuex"

const Mutations = {
  SET_LOAD_FLAG: "setLoadFlag",
  SET_THEME: "setTheme"
}

const store = createStore({
  state: {
    loadFlag: false,
    theme: "light"
  },
  mutations: {
    [Mutations.SET_LOAD_FLAG] (state: any, value: boolean) {
      state.loadFlag = value
    },
    [Mutations.SET_THEME] (state: any, value: string) {
      state.theme = value
    }
  }
})

export default store
export { Mutations }
