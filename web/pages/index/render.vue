<template>
  <div class="container">test</div>
  <a-button>test</a-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
export default defineComponent({
  name: "Home",
  components: {
    AButton: Button,
  }
})
</script>

<style lang="less">
.container {
  color: red
}
</style>