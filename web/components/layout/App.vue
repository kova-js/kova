<template>
  <AConfigProvider :locale="locale">
    <component :is="layoutName">
      <router-view>
        <template #default="{ Component, route }">
          <keep-alive>
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </template>
      </router-view>
    </component>
  </AConfigProvider>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import zhCN from 'ant-design-vue/lib/locale/zh_CN'
import { ConfigProvider } from 'ant-design-vue'
// Layouts
import DefaultLayout from '@/layouts/default.vue'
const AuthLayout = defineAsyncComponent(() => import('@/layouts/auth/index'))
const AdminLayout = defineAsyncComponent(() => import('@/layouts/admin/index'))
// import '@/config/registerServiceWorker'

export default defineComponent({
  name: 'App',
  props: ['fetchData', 'asyncData'],
  components: {
    DefaultLayout,
    AuthLayout,
    AdminLayout,
    AConfigProvider: ConfigProvider,
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
      locale: zhCN,
    }
  },
})
</script>
