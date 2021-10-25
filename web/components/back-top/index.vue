<template>
  <div class="backtop">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BackTop',
})
</script>

<style src="./style.less" scoped />
