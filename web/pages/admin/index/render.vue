<template>
  <div>Dashboard</div>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue'
import { defineComponent } from 'vue'
import PageView from '@/components/common/PageView/index.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    AButton: Button,
    PageView,
  },
  props: ['fetchData'],
})
</script>
