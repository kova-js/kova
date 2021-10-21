<!-- <template>
  <component :is="layoutName">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </component>
</template> -->

<script lang="tsx">
import { defineComponent, computed, onMounted, watch, KeepAlive, defineAsyncComponent,Transition } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
// import AuthLayout from '@/layouts/auth'
// import AdminLayout from '@/layouts/admin'
import BlogLayout from '@/layouts/blog'

const AuthLayout = defineAsyncComponent(() => import('@/layouts/auth'))
const AdminLayout = defineAsyncComponent(() => import('@/layouts/admin'))

export default defineComponent({
  name: 'App',
  props: ['fetchData', 'asyncData'],
  components: {
    // AuthLayout: defineAsyncComponent(() =>
    //   import('@/layouts/auth')
    // ),
    // AdminLayout: defineAsyncComponent(() =>
    //   import('@/layouts/admin')
    // ),
    // BlogLayout,
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

    // useTitle(title)
    watch([meta, path], () => {
      if (__isBrowser__) {
        console.log('path', path.value)
        document.title = title.value
      }
    })
    const Layout = computed(() => {
      if (path.value.startsWith('/admin')) {
        return AdminLayout
      } else if (path.value.startsWith('/auth')) {
        return AuthLayout
      }
      return BlogLayout
    })
    const routerSlot = ({ Component }: any) => {
      return <Transition><KeepAlive>{Component}</KeepAlive></Transition>
    }
    return () => (
      <Layout.value>
        <RouterView v-slots={{ default: routerSlot }} />
      </Layout.value>
    )
  },
})
</script>
