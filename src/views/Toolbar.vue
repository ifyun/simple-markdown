<template>
  <div class="toolbar" :class="theme">
    <n-space align="center" justify="space-between">
      <n-space>
        <n-switch :round="false" :rail-style="railStyle" v-model:value="theme"
                  checked-value="dark" unchecked-value="light">
          <template #checked>暗色</template>
          <template #unchecked>亮色</template>
        </n-switch>
      </n-space>
      <n-space justify="end" size="small">
        <n-button quaternary size="small" @click="changeLayout(`source`)">
          <n-icon size="18" color="#C65352">
            <code-round/>
          </n-icon>
        </n-button>
        <n-button quaternary size="small" @click="changeLayout(`split`)">
          <n-icon size="18" color="#77B7D1">
            <vertical-split-round/>
          </n-icon>
        </n-button>
        <n-button quaternary size="small" @click="changeLayout(`preview`)">
          <n-icon size="18" color="#5C9D61">
            <web-asset-round/>
          </n-icon>
        </n-button>
      </n-space>
    </n-space>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex"
import { Options, Vue } from "vue-class-component"
import { NButton, NIcon, NSpace, NSwitch } from "naive-ui"
import { CodeRound, VerticalSplitRound, WebAssetRound } from "@vicons/material"
import { Mutations } from "@/store"

@Options({
  name: "Toolbar",
  components: {
    NSpace,
    NSwitch,
    NButton,
    NIcon,
    CodeRound,
    VerticalSplitRound,
    WebAssetRound
  }
})
export default class Toolbar extends Vue {
  private store = useStore()

  private railStyle = (info: { focused: boolean, checked: boolean }) => {
    const style: any = {}

    if (info.checked) {
      style.background = "#2080F0"
      if (info.focused) {
        style.boxShadow = "0 0 0 2px #2080F040"
      }
    } else {
      style.background = "#399F58"
      if (info.focused) {
        style.boxShadow = "0 0 0 2px #D0305040"
      }
    }

    return style
  }

  get theme () {
    return this.store.state.theme
  }

  set theme (value: string) {
    this.store.commit(Mutations.SET_THEME, value)
  }

  get layout () {
    return this.store.state.layout
  }

  set layout (value: string) {
    this.store.commit(Mutations.SET_LAYOUT, value)
  }

  changeLayout (value: "source" | "split" | "preview") {
    this.store.commit(Mutations.SET_LAYOUT, value)
  }
}
</script>

<style scoped lang="scss">
.toolbar {
  padding: 2px 4px;

  .n-button {
    padding: 0 5px;
  }

  &.light {
    background-color: #FEFEFE;
    border-bottom: 1px solid #DDDDDD;
  }

  &.dark {
    background-color: #333333;
    border-bottom: 1px solid #21262D;
  }
}
</style>
