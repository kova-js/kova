import { createVNode, computed, defineComponent } from 'vue'

const Container = defineComponent({
  name: 'Container',
  props: {
    top: {
      type: [Number, String],
    },
    tagName: {
      type: String,
      default: 'div',
    },
  },
  setup(props, { slots }) {
    const paddingStyles = computed(() =>
      props.top ? { paddingTop: !Number.isNaN(props.top) ? `${props.top}px` : props.top } : {},
    )
    return () => createVNode(props.tagName, { style: paddingStyles }, slots.default?.())
  },
})

export default Container
