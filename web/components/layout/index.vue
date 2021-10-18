<script lang="tsx">
import { defineComponent } from 'vue'
import KDocument from '@/layouts/Document.vue'
import zhCN from 'ant-design-vue/lib/locale/zh_CN'
import { ConfigProvider } from 'ant-design-vue'

export default defineComponent({
  components: {
    KDocument,
  },
  props: ['fetchData', 'asyncData', 'config', 'ctx'],
  setup(props, { emit, slots }) {
    const title = props.asyncData?.value?.meta?.title || 'Kova'
    return () => (
      <ConfigProvider locale={zhCN}>
        <KDocument v-slots={slots} title={title}></KDocument>
      </ConfigProvider>
    )
  },
})
</script>
