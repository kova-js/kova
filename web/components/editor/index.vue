<template>
  <div id="vditor" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const vditorRef = ref<any>()
async function loadVditor() {
  const VditorModule: any = await import('vditor')
  const { default: Vditor } = VditorModule

  const uploadUrl = () => 'http://127.0.0.1:3000/api/admin/medias'
  vditorRef.value = new Vditor('vditor', {
    height: 360,
    toolbarConfig: {
      pin: true,
    },
    mode: 'sv',
    debugger: true,
    cache: {
      enable: false,
    },
    preview: {
      actions: [],
    },
    upload: {
      url: uploadUrl(),
      fieldName: 'files',
      withCredentials: true,
    },
    after: () => {
      // vditorRef.value.setValue('hello, Vditor + Vue!')
    },
  })
}

onMounted(() => {
  loadVditor()
})
</script>

<style>
@import '~vditor/dist/index.css';
</style>
