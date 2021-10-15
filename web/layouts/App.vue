<template>
  <div>
    <component :is="layoutName">
      <slot />
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/auth/index.vue'
import AdminLayout from '@/layouts/admin/index.vue'
import BlogLayout from '@/layouts/blog/index.vue'

export default defineComponent({
  name: "App",
  components: {
    AuthLayout,
    AdminLayout,
    BlogLayout
  },
  setup() {
    const router = useRouter()
    const path = computed(() => {
      return router.currentRoute.value.path ?? ''
    })
    const layoutName = computed(() => {
      console.log(path.value)
      if (path.value.startsWith('/admin')) {
        return 'AdminLayout'
      } else if (path.value.startsWith('/auth')) {
        return 'AuthLayout'
      }
      return 'BlogLayout'
    })
    return { layoutName }
  }
})
</script>
