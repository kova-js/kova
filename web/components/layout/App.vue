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
import { defineComponent, computed, onMounted, watch, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import BlogLayout from '@/layouts/blog/index.vue'
import BlogLayout from '@/layouts/blog'

export default defineComponent({
  name: 'App',
  props: ['fetchData', 'asyncData'],
  components: {
    AuthLayout: defineAsyncComponent(() =>
      import('@/layouts/auth/index.vue')
    ),
    AdminLayout: defineAsyncComponent(() =>
      import('@/layouts/admin/index.vue')
    ),
    BlogLayout,
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const path = computed(() => __isBrowser__ ? route.path : router.currentRoute.value.path)
    const meta = computed<any>(() => props.asyncData?.value?.meta ?? {})
    const title = computed<any>(() => [meta.value?.title].filter(t => t).concat(['Kova']).join(' - '))

    onMounted(() => {
      document.title = title.value
    })
    
    // useTitle(title)
    watch([meta, path], () => {
      if (__isBrowser__) {
        console.log('path', path.value)
        document.title = title.value
      }
    })
    const layoutName = computed(() => {
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
