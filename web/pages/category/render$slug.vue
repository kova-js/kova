<template>
  <div>
    <router-link to="/">
      <Button>Home</Button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Category',
  components: {
    Button,
  },
  props: ['fetchData']
})
</script>
