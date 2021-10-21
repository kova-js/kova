<template>
  <div>test</div>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Tag',
  components: {
    AButton: Button,
  },
  props: ['fetchData'],
})
</script>
