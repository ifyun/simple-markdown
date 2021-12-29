<template>
  <n-config-provider abstract>
    <div class="app">
      <toolbar/>
      <editor :file-path="filePath" style="flex: 1"
              @dragenter="dragenter" @dragover="dragover" @dragleave="dragleave" @drop="drop"/>
    </div>
  </n-config-provider>
</template>

<script lang="ts">
import { useStore } from "vuex"
import { Options, Vue } from "vue-class-component"
import { darkTheme, NConfigProvider } from "naive-ui"
import Editor from "@/views/Editor.vue"
import Toolbar from "@/views/Toolbar.vue"
import fs from "fs"
import path from "path"

declare global {
  interface Window {
    currentDir: string
  }
}

@Options({
  components: {
    NConfigProvider,
    Toolbar,
    Editor
  }
})
export default class Home extends Vue {
  private store = useStore()
  private filePath: string | null = null

  get naiveTheme () {
    if (this.store.state.theme === "dark") {
      return darkTheme
    } else {
      return null
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
      this.filePath = filePath
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
