<template>
  <AModal
    title="上传附件"
    v-model:visible="visible"
    :footer="null"
    :afterClose="onUploadClose"
    destroyOnClose
  >
    <FileUpload />
    <!-- <FilePondUpload ref="upload" :uploadHandler="uploadHandler"></FilePondUpload> -->
  </AModal>
</template>

<script lang="ts">
import { Modal } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import FileUpload from './FileUpload.vue'

export type CmdUploadModal = {
  show(): void
}
export default defineComponent({
  name: 'UploadModal',
  components: {
    AModal: Modal,
    FileUpload,
  },
  setup(props, { expose }) {
    const visible = ref(false)
    function onUploadClose() {}

    function uploadHandler() {}

    function show() {
      visible.value = true
    }
    const exposed: CmdUploadModal = {
      show,
    }

    expose(exposed)
    return {
      visible,
      onUploadClose,
      uploadHandler,
      show,
    }
  },
})
</script>
