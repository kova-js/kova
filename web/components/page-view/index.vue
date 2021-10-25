<script lang="tsx">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PageView',
  props: ['asyncData', 'fetchData'],
  setup(props, { slots }) {
    return () => slots.default?.()
  },
})
</script>
