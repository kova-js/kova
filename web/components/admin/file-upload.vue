<template>
  <AUploadDragger
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
  >
    <p>点击选择文件或将文件拖拽到此处</p>
  </AUploadDragger>
</template>

<script lang="ts">
import { Upload } from 'ant-design-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FileUpload',
  components: {
    AUploadDragger: Upload.Dragger,
  },
})
</script>
