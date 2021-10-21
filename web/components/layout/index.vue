<script lang="tsx">
import { defineComponent, defineAsyncComponent } from 'vue'
const Document = defineAsyncComponent(() => import('@/layouts/Document.vue'))
import zhCN from 'ant-design-vue/lib/locale/zh_CN'
import { ConfigProvider } from 'ant-design-vue'

export default defineComponent({
  props: ['fetchData', 'asyncData', 'config', 'ctx'],
  setup(props, { emit, slots }) {
    const title = props.asyncData?.value?.meta?.title || 'Kova'
    return () => (
      <ConfigProvider locale={zhCN}>
        <Document v-slots={slots} title={title}></Document>
      </ConfigProvider>
    )
  },
})
</script>
