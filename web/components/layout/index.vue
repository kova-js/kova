<script lang="tsx">
import { defineComponent } from 'vue'
import KDocument from '@/layouts/Document.vue'
import zhCN from 'ant-design-vue/lib/locale/zh_CN'
import { ConfigProvider } from 'ant-design-vue'

export default defineComponent({
  components: {
    KDocument,
  },
  setup(props, { emit, slots }) {
    return () => (
      <ConfigProvider locale={zhCN}>
        <KDocument v-slots={slots}></KDocument>
      </ConfigProvider>
    )
  },
})
</script>
