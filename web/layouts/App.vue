<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/auth'
import AdminLayout from '@/layouts/admin'
import BlogLayout from '@/layouts/blog'

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter()
    const path = computed(() => {
      return router.currentRoute.value.path ?? ''
    })
    const Layout = computed(() => {
      console.log(path.value)
      if (path.value.startsWith('/admin')) {
        return AdminLayout
      } else if (path.value.startsWith('/auth')) {
        return AuthLayout
      }
      return BlogLayout
    })
    return () => (
      <div>
        <Layout.value>
          <slot />
        </Layout.value>
      </div>
    )
  },
})
</script>
