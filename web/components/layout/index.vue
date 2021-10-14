<script lang="tsx">
import { defineComponent } from 'vue'
import KDocument from '@/layouts/Document.vue'
export default defineComponent({
  components: {
    KDocument
  },
  setup(props, { emit, slots }) {
    return () => <KDocument v-slots={slots} ></KDocument>
  }
})
</script>