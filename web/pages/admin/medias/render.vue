<template>
  <div>
    <AButton type="primary" @click="showUpload">上传</AButton>
    <!-- <AModal  -->
    <UploadModal ref="uploadRef" />
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
    </div>
  </div>
</template>

<script lang="ts">
import { Button, Modal, List, Card, Checkbox } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import UploadModal from '@/components/admin/UploadModal.vue'
export default defineComponent({
  name: 'Users',
  components: {
    AButton: Button,
    AModal: Modal,
    UploadModal,
    AList: List,
    ACard: Card,
    ACheckbox: Checkbox,
    AListItem: List.Item,
  },
  props: ['fetchData'],
  setup() {
    const uploadRef = ref<InstanceType<typeof UploadModal>>()
    function showUpload() {
      uploadRef.value?.show()
    }
    const loading = ref(false)
    const data = ref<any>([{}, {}, {}, {}, {}])
    return {
      uploadRef,
      showUpload,
      loading,
      data,
    }
  },
})
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
