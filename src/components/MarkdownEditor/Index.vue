<template>
  <div class="markdown-editor" :class="theme">
    <textarea ref="editor"/>
  </div>
</template>

<script lang="ts">
import { toRaw } from "vue"
import { useStore } from "vuex"
import { Options, Vue } from "vue-class-component"
import { Emit, Prop, Watch } from "vue-property-decorator"
import { Mutations } from "@/store"
import CodeMirror, { Editor, EditorConfiguration } from "codemirror"
import "codemirror/mode/gfm/gfm"
import "codemirror/mode/css/css"
import "codemirror/mode/sass/sass"
import "codemirror/mode/stylus/stylus"
import "codemirror/mode/yaml/yaml"
import "codemirror/mode/cmake/cmake"
import "codemirror/mode/dockerfile/dockerfile"
import "codemirror/mode/http/http"
import "codemirror/mode/nginx/nginx"
import "codemirror/mode/shell/shell"
import "codemirror/mode/clike/clike"
import "codemirror/mode/groovy/groovy"
import "codemirror/mode/rust/rust"
import "codemirror/mode/go/go"
import "codemirror/mode/python/python"
import "codemirror/mode/sql/sql"
import "codemirror/mode/lua/lua"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/jsx/jsx"
import "codemirror/mode/xml/xml"
import "codemirror/mode/vue/vue"
import "codemirror/mode/php/php"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/juejin.css"
import "codemirror/theme/material-darker.css"

let self: any

@Options({
  name: "MarkdownEditor"
})
export default class MarkdownEditor extends Vue {
  private store = useStore()

  private cmEditor: Editor | null = null
  private cmOptions: EditorConfiguration = {
    mode: {
      name: "gfm",
      highlightFormatting: true
    },
    dragDrop: false,
    lineNumbers: true,
    lineWrapping: false,
    tabSize: 4,
    extraKeys: {
      "Ctrl-S": () => self.onSave()
    }
  }

  get theme () {
    return this.store.state.theme
  }

  get lineWrapping (): boolean {
    return this.store.state.lineWrapping
  }

  get loadFile (): boolean {
    return this.store.state.loadFlag
  }

  @Prop(String)
  private modelValue?: string

  @Emit("update:modelValue")
  updateValue (val: string) {
    return val
  }

  @Emit("save")
  onSave () {
    return
  }

  @Watch("modelValue")
  valueChange (val: string) {
    if (this.loadFile) {
      toRaw(this.cmEditor)?.setValue(val)
      this.store.commit(Mutations.SET_LOAD_FLAG, false)
    }
  }

  @Watch("theme")
  themeChange (val: string) {
    const cm = toRaw(this.cmEditor)
    if (val === "light") {
      cm?.setOption("theme", "juejin")
    } else if (val === "dark") {
      cm?.setOption("theme", "material-darker")
    }
  }

  @Watch("lineWrapping")
  lineWrappingChange (val: boolean) {
    toRaw(this.cmEditor)?.setOption("lineWrapping", val)
  }

  mounted () {
    self = this
    this.cmEditor = CodeMirror.fromTextArea(this.$refs.editor as HTMLTextAreaElement, this.cmOptions)
    this.themeChange(this.theme)
    toRaw(this.cmEditor).on("change", (cm: Editor) => {
      this.updateValue(cm.getValue())
    })
  }
}
</script>

<style scoped lang="scss">
.markdown-editor {
  height: 100%;

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
    ::-webkit-scrollbar-thumb {
      background-color: #333333;

      &:hover {
        background-color: #484848;
      }
    }

    ::-webkit-scrollbar-track {
      background-color: #191919;
    }
  }
}
</style>

<style lang="scss">
.CodeMirror {
  height: 100%;
  font-size: 14px;
}
</style>
