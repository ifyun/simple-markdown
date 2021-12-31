<template>
  <div class="markdown-body" :class="theme" v-html="markdown"/>
</template>

<script lang="ts">
import { useStore } from "vuex"
import { Options, Vue } from "vue-class-component"
import { Prop } from "vue-property-decorator"
import highlightJs from "highlight.js"
import KatexPlugin from "./katex-plugin"
import PicturePlugin from "./picture-plugin"
import "@/theme/markdown/default.scss"
import "@/theme/markdown/dark.scss"

const MarkdownIt = require("markdown-it")
const MarkdownItContainer = require("markdown-it-container")

const md = new MarkdownIt({
  html: true,
  highlight: (str: string, lang: string) => {
    if (lang && highlightJs.getLanguage(lang)) {
      try {
        return highlightJs.highlight(str, { language: lang }).value
      } catch (_) {
        return ""
      }
    }
    return ""
  }
})

md.use(KatexPlugin)
md.use(PicturePlugin)
md.use(MarkdownItContainer, "", {
  marker: "-",
  render: (tokens: any, index: number) => {
    if (tokens[index].nesting === 1) {
      return `<blockquote class="front-matter">`
    } else {
      return `</blockquote>`
    }
  }
})

@Options({
  name: "MarkdownView"
})
export default class MarkdownView extends Vue {
  private store = useStore()

  @Prop(String)
  private content?: string

  get theme () {
    return this.store.state.theme
  }

  get markdown (): string {
    return md.render(this.content)
  }
}
</script>

<style scoped lang="scss">
.markdown-body {
  padding: 24px;
  overflow: auto;
}
</style>
