<template>
  <div>Profile</div>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Users',
  components: {
    Button,
  },
  props: ['fetchData'],
})
</script>
