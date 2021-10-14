<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
// 在这里可以进行一些全局组件的注册逻辑
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  props: ['fetchData', 'asyncData'],
})
</script>
