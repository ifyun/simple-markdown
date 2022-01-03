import { createApp } from "vue"
import App from "@/App.vue"
import store from "@/store"

declare global {
  interface Window {
    currentDir: string
  }
}

createApp(App)
  .use(store)
  .mount("#app")
