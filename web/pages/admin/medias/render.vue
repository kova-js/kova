<template>
  <div>
    <AButton type="primary" @click="showUpload">上传</AButton>
    <upload-modal ref="uploadRef" />
    <div>
      <a-button @click="hanldeGetMedias">查询</a-button>
    </div>
    <div>
      <AList
        :grid="{ gutter: 12, xs: 2, sm: 2, md: 4, lg: 6, xl: 6, xxl: 6 }"
        :data-source="data"
        :loading="loading"
      >
        <template #renderItem="{ item }">
          <AListItem>
            <ACard :title="item.title" :bodyStyle="{ padding: 0 }" hoverable>
              <div class="attach-thumb">
                <!-- <span v-show="!handleJudgeMediaType(item)">当前格式不支持预览</span> -->
                <img :src="item.thumbPath" loading="lazy" />
              </div>
              <!-- <ACheckbox
                class="select-attachment-checkbox"
                :style="getCheckStatus(item.id) ? selectedAttachmentStyle : ''"
                :checked="getCheckStatus(item.id)"
                @click="handleAttachmentSelectionChanged($event, item)"
                v-show="supportMultipleSelection"
              /> -->
            </ACard>
          </AListItem>
        </template>
      </AList>
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
const loading = ref(false)
const data = ref<any>([{}, {}, {}, {}, {}])
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

<style lang="less">
.attach-thumb,
.photo-thumb {
  width: 100%;
  padding-bottom: 56%;
}

.attach-item,
.attach-thumb,
.photo-thumb {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  img,
  span {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  span {
    display: flex;
    font-size: 12px;
    align-items: center;
    justify-content: center;
    color: #9b9ea0;
  }
}
</style>
