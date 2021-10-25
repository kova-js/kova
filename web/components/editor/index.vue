<template>
  <div id="vditor" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
  setup() {
    const vditorRef = ref<any>()
    async function loadVditor() {
      const Vditor: any = await import('vditor')
      vditorRef.value = new Vditor('vditor', {
        height: 360,
        toolbarConfig: {
          pin: true,
        },
        cache: {
          enable: false,
        },
        after: () => {
          vditorRef.value.setValue('hello, Vditor + Vue!')
        },
      })
    }

    onMounted(() => {
      loadVditor()
    })
  },
})
</script>
