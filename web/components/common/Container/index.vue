<template>
  <div class="container" :style="paddingStyles">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: "Container",
  props: {
    top: {
      type: [Number, String]
    }
  },
  setup(props) {

    const paddingStyles = computed(() => {
      const { top } = props
      if (top) {
        return { paddingTop: typeof top === 'number' ? `${top}px` : top }
      }
      return {}
    })
    return { paddingStyles }
  }
})

</script>