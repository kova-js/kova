<template>
  <div>test</div>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Categories',
  components: {
    Button,
  },
  props: ['fetchData'],
})
</script>
