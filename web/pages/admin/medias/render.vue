<template>
  <div>
    <a-button type="primary" @click="showUpload">上传</a-button>
    <upload-modal ref="uploadRef" />
    <div>
      <a-button @click="hanldeGetMedias">查询</a-button>
    </div>
    <div>
      <a-table :dataSource="state.data" :columns="columns" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button as AButton, Table as ATable } from 'ant-design-vue'
import { ref, reactive } from 'vue'
import UploadModal from '@/components/admin/upload-modal.vue'
import { query } from '@/api/media'

const uploadRef = ref<InstanceType<typeof UploadModal>>()
const state = reactive({
  data: [] as any[],
  total: 0,
  params: {
    size: 20,
    page: 1,
  },
  page: {
    sizes: [10, 20, 30],
  },
})
const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
])
function showUpload() {
  uploadRef.value?.show()
}
async function hanldeGetMedias() {
  try {
    const res = await query({})
    state.data = res.data as any[]
  } catch (e: any) {}
}
// return {
//   uploadRef,
//   showUpload,
//   hanldeGetMedias
// }
//   },
// })
</script>
