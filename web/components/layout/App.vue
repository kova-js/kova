<template>
  <component :is="layoutName">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/auth/index.vue'
import AdminLayout from '@/layouts/admin/index.vue'
import BlogLayout from '@/layouts/blog/index.vue'
export default defineComponent({
  name: 'App',
  props: ['fetchData', 'asyncData'],
  components: {
    AuthLayout,
    AdminLayout,
    BlogLayout,
  },
  setup(props) {
    const router = useRouter()
    const path = computed(() => router.currentRoute.value.path ?? '')
    const meta = computed<any>(() => props.asyncData?.value?.meta ?? {})
    onMounted(() => {
      document.title = [meta.value?.title].filter(t => t).concat(['Kova']).join(' - ')
    })
    watch([meta, path], () => {
      if (__isBrowser__) {
        console.log('path', path.value)
        document.title = [meta.value?.title].filter(t => t).concat(['Kova']).join(' - ')
      }
    })
    const layoutName = computed(() => {
      console.log('path.value', path.value)
      if (path.value.startsWith('/admin')) {
        return 'AdminLayout'
      } else if (path.value.startsWith('/auth')) {
        console.log('auth layout')
        return 'AuthLayout'
      }
      return 'BlogLayout'
    })
    return { layoutName, meta }
  },
})
</script>
