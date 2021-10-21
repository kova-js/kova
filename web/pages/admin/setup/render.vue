<template>
  <div>Setup</div>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Users',
  components: {
    AButton: Button,
  },
  props: ['fetchData'],
  setup() {
    return {}
  },
})
</script>
