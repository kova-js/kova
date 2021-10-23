<template>
  <div>
    <AButton type="primary" @click="showUpload">上传</AButton>
    <!-- <AModal  -->
    <UploadModal ref="uploadRef" />
  </div>
</template>

<script lang="ts">
import { Button, Modal } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import UploadModal from '@/components/admin/UploadModal.vue'
export default defineComponent({
  name: 'Users',
  components: {
    AButton: Button,
    AModal: Modal,
    UploadModal,
  },
  props: ['fetchData'],
  setup() {
    const uploadRef = ref<InstanceType<typeof UploadModal>>()
    function showUpload() {
      uploadRef.value?.show()
    }
    return {
      uploadRef,
      showUpload,
    }
  },
})
</script>
