<template>
  <component :is="layoutName">
    <router-view>
      <template #default="{ Component, route }">
        <transition mode="out-in" appear>
          <keep-alive>
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Layouts
import DefaultLayout from '@/layouts/default.vue'
const AuthLayout = defineAsyncComponent(() => import('@/layouts/auth/index'))
const AdminLayout = defineAsyncComponent(() => import('@/layouts/admin/index'))

export default defineComponent({
  name: 'App',
  props: ['fetchData', 'asyncData'],
  components: {
    DefaultLayout,
    AuthLayout,
    AdminLayout,
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const path = computed(() => (__isBrowser__ ? route.path : router.currentRoute.value.path))
    const meta = computed<any>(() => props.asyncData?.value?.meta ?? {})
    const title = computed<any>(() =>
      [meta.value?.title]
        .filter((t) => t)
        .concat(['Kova'])
        .join(' - '),
    )

    onMounted(() => {
      document.title = title.value
    })

    watch([meta, path], () => {
      if (__isBrowser__) document.title = title.value
    })

    // Layout Theme
    const layoutName = computed<string>(() => {
      if (path.value.startsWith('/admin')) {
        return 'AdminLayout'
      } else if (path.value.startsWith('/auth')) {
        return 'AuthLayout'
      }
      return 'DefaultLayout'
    })

    return {
      layoutName,
    }
  },
})
</script>
