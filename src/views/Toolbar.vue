<template>
  <div class="toolbar" :class="theme">
    <n-space>
      <n-switch :round="false" checked-value="dark" unchecked-value="light" @update:value="handleUpdate">
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

  get theme () {
    return this.store.state.theme
  }

  handleUpdate (theme: string) {
    this.store.commit(Mutations.SET_THEME, theme)
  }
}
</script>

<style scoped lang="scss">
.toolbar {
  padding: 6px;

  &.light {
    background-color: #FAFAFA;
    border-bottom: 1px solid #DDDDDD;
  }

  &.dark {
    background-color: #333333;
    border-bottom: 1px solid #21262D;
  }
}
</style>
