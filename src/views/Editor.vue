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
import { Prop, Watch } from "vue-property-decorator"
import { useMessage } from "naive-ui"
import MarkdownView from "@/components/MarkdownView/Index.vue"
import MarkdownEditor from "@/components/MarkdownEditor/Index.vue"
import { Mutations } from "@/store"
import fs from "fs"

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

  @Prop(String)
  private filePath?: string

  private content: string = ""

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
    if (this.filePath) {
      fs.writeFile(this.filePath, this.content, "utf-8", (err: NodeJS.ErrnoException | null) => {
        if (err) {
          this.message.error(err.message)
        } else {
          this.message.success("保存成功")
        }
      })
    }
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
      background-color: #101014;

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
