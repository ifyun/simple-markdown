<template>
  <div class="editor">
    <div v-show="showSource" class="source">
      <markdown-editor v-model="content" @save="save"/>
    </div>
    <div v-show="showPreview" class="preview" :class="theme">
      <markdown-view :content="content" style="flex: 1"/>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex"
import { Options, Vue } from "vue-class-component"
import { Watch } from "vue-property-decorator"
import { useMessage } from "naive-ui"
import MarkdownView from "@/components/MarkdownView/Index.vue"
import MarkdownEditor from "@/components/MarkdownEditor/Index.vue"
import { Mutations } from "@/store"
import remote from "@electron/remote"
import fs from "fs"
import path from "path"

@Options({
  name: "Editor",
  components: {
    MarkdownEditor,
    MarkdownView
  }
})
export default class Editor extends Vue {
  private store = useStore()
  private message = useMessage()

  private content: string = ""

  get filePath (): string | null {
    return this.store.state.filePath
  }

  get theme () {
    return this.store.state.theme
  }

  get showSource (): boolean {
    return ["source", "split"].includes(this.store.state.layout)
  }

  get showPreview (): boolean {
    return ["split", "preview"].includes(this.store.state.layout)
  }

  @Watch("filePath")
  filePathChange (val: string) {
    if (val == null) {
      return
    }

    fs.readFile(val, "utf-8", (err: any, data: string) => {
      this.store.commit(Mutations.SET_LOAD_FLAG, true)
      this.content = data
    })
  }

  save () {
    if (this.filePath != null) {
      this.writeToFile(this.filePath)
    } else {
      remote.dialog.showOpenDialog({
        properties: ["openFile", "promptToCreate"],
        filters: [
          {
            name: "Markdown File",
            extensions: ["md"]
          }
        ]
      }).then((val: Electron.OpenDialogReturnValue) => {
        if (!val.canceled) {
          const filePath = val.filePaths[0]
          this.store.commit(Mutations.SET_FILE_PATH, filePath)
          window.currentDir = path.dirname(filePath)
          this.writeToFile(this.filePath!)
        }
      })
    }
  }

  writeToFile (filePath: string) {
    fs.writeFile(filePath, this.content, "utf-8", (err: NodeJS.ErrnoException | null) => {
      if (err != null) {
        this.message.error(err.message)
      } else {
        this.message.success("保存成功")
      }
    })
  }
}
</script>

<style scoped lang="scss">
.editor {
  display: flex;
  flex-direction: row;
  min-height: 0;

  .source {
    flex: 1;
    height: 100%;
  }

  .preview {
    width: 0;
    flex: 1;
    display: flex;

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 3px;
    }

    &.light {
      ::-webkit-scrollbar-thumb {
        background-color: #E0E0E0;

        &:hover {
          background-color: #CCCCCC;
        }
      }

      ::-webkit-scrollbar-track {
        background-color: #F5F5F5;
      }
    }

    &.dark {
      background-color: #0E1117;

      ::-webkit-scrollbar-thumb {
        background-color: #404040;

        &:hover {
          background-color: #525252;
        }
      }

      ::-webkit-scrollbar-track {
        background-color: #202020;
      }
    }
  }
}
</style>
