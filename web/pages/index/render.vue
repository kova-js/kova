<template>
  <router-link to="/category/test">
    <Button>test</Button>
  </router-link>
  <Input />
  <div class="container">test</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button, Input } from 'ant-design-vue'
export default defineComponent({
  name: 'Home',
  components: {
    Button,
    Input,
  },
})
</script>

<style lang="less">
.container {
  color: red;
}
</style>
