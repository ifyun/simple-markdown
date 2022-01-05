import { createStore } from "vuex"

const Mutations = {
  SET_LOAD_FLAG: "setLoadFlag",
  SET_FILE_PATH: "setFilePath",
  SET_THEME: "setTheme",
  SET_LAYOUT: "setLayout",
  SET_LINE_WRAPPING: "setLineWrapping"
}

const store = createStore({
  state: {
    /* 打开文件标志，当 filePath 改变时设置为 true，配合 CodeMirror 使用 */
    loadFlag: false,
    /* 当前打开的文件路径  */
    filePath: null,
    /* 布局（source | split | preview） */
    layout: "split",
    theme: "light",
    lineWrapping: false
  },
  mutations: {
    [Mutations.SET_LOAD_FLAG] (state: any, value: boolean) {
      state.loadFlag = value
    },
    [Mutations.SET_FILE_PATH] (state: any, value: string) {
      state.filePath = value
    },
    [Mutations.SET_LAYOUT] (state: any, value: string) {
      state.layout = value
    },
    [Mutations.SET_THEME] (state: any, value: string) {
      state.theme = value
    },
    [Mutations.SET_LINE_WRAPPING] (state: any, value: boolean) {
      state.lineWrapping = value
    }
  }
})

export default store
export { Mutations }
