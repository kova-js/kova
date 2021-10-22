<script lang="tsx">
import { defineComponent, defineAsyncComponent } from 'vue'
const Document = defineAsyncComponent(() => import('@/layouts/Document.vue'))

export default defineComponent({
  props: ['fetchData', 'asyncData', 'config', 'ctx'],
  setup(props, { emit, slots }) {
    const title = props.asyncData?.value?.meta?.title || 'Kova'
    return () => <Document v-slots={slots} title={title}></Document>
  },
})
</script>
