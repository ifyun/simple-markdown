<template>
  <div class="toolbar" :class="theme">
    <n-space>
      <n-switch :round="false" :rail-style="railStyle" v-model:value="theme"
                checked-value="dark" unchecked-value="light">
        <template #checked>暗色</template>
        <template #unchecked>亮色</template>
      </n-switch>
    </n-space>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex"
import { Options, Vue } from "vue-class-component"
import { NSpace, NSwitch } from "naive-ui"
import { Mutations } from "@/store"

@Options({
  name: "Toolbar",
  components: {
    NSpace,
    NSwitch
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
}
</script>

<style scoped lang="scss">
.toolbar {
  padding: 6px;

  &.light {
    border-bottom: 1px solid #DDDDDD;
  }

  &.dark {
    background-color: #333333;
    border-bottom: 1px solid #21262D;
  }
}
</style>
