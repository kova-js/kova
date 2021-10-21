<script lang="tsx">
import {
  defineComponent,
  computed,
  onMounted,
  watch,
  KeepAlive,
  defineAsyncComponent,
  Transition,
} from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'

// Layouts
import DefaultLayout from '@/layouts/default.vue'
const AuthLayout = defineAsyncComponent(() => import('@/layouts/auth/index'))
const AdminLayout = defineAsyncComponent(() => import('@/layouts/admin/index'))

export default defineComponent({
  name: 'App',
  props: ['fetchData', 'asyncData'],
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
    const Layout = computed<any>(() => {
      if (path.value.startsWith('/admin')) {
        return AdminLayout
      } else if (path.value.startsWith('/auth')) {
        return AuthLayout
      }
      return DefaultLayout
    })

    // Router Slot
    const routerSlot = ({ Component }: any) => (
      <Transition>
        <KeepAlive>{Component}</KeepAlive>
      </Transition>
    )
    return () => (
      <Layout.value>
        <RouterView v-slots={{ default: routerSlot }} />
      </Layout.value>
    )
  },
})
</script>
