<template>
  <n-config-provider abstract :theme="naiveTheme">
    <n-message-provider>
      <div class="app">
        <toolbar/>
        <editor @dragenter="dragenter" @dragover="dragover" @dragleave="dragleave" @drop="drop"
                style="flex: 1"/>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts">
import { useStore } from "vuex"
import { Options, Vue } from "vue-class-component"
import { darkTheme, NConfigProvider, NMessageProvider, useOsTheme } from "naive-ui"
import Editor from "@/views/Editor.vue"
import Toolbar from "@/views/Toolbar.vue"
import { Mutations } from "@/store"
import fs from "fs"
import path from "path"

@Options({
  components: {
    NConfigProvider,
    NMessageProvider,
    Toolbar,
    Editor
  }
})
export default class Home extends Vue {
  private store = useStore()

  get naiveTheme () {
    if (this.store.state.theme === "dark") {
      return darkTheme
    } else {
      return null
    }
  }

  created () {
    const osTheme = useOsTheme().value
    if (osTheme != null) {
      this.store.commit(Mutations.SET_THEME, osTheme)
    }
  }

  dragenter (e: DragEvent) {
    e.preventDefault()
  }

  dragover (e: DragEvent) {
    e.preventDefault()
  }

  dragleave (e: DragEvent) {
    e.preventDefault()
  }

  drop (e: DragEvent) {
    e.preventDefault()
    const filePath = (e.dataTransfer!.files[0] as any).path

    if (this.isMarkdownFile(filePath)) {
      this.store.commit(Mutations.SET_FILE_PATH, filePath)
      window.currentDir = path.dirname(filePath)
    }
  }

  isMarkdownFile (filePath: string) {
    return fs.lstatSync(filePath).isFile() && filePath.split(".").pop() == "md"
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

.app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
