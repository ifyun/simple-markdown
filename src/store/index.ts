import { createStore } from "vuex"

const Mutations = {
  SET_LOAD_FLAG: "setLoadFlag",
  SET_THEME: "setTheme",
  SET_LAYOUT: "setLayout"
}

const store = createStore({
  state: {
    loadFlag: false,
    layout: "split",
    theme: "light"
  },
  mutations: {
    [Mutations.SET_LOAD_FLAG] (state: any, value: boolean) {
      state.loadFlag = value
    },
    [Mutations.SET_LAYOUT] (state: any, value: string) {
      state.layout = value
    },
    [Mutations.SET_THEME] (state: any, value: string) {
      state.theme = value
    }
  }
})

export default store
export { Mutations }
