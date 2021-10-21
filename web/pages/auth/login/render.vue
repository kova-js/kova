<template>
  <router-link to="/">
    <AButton>Home</AButton>
  </router-link>
  <div>test</div>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Login',
  components: {
    AButton: Button,
  },
  props: ['fetchData'],
})
</script>
