<template>
  <a-page-header :title="state.data.title || '新文章'" style="background-color: #fff">
    <template #extra>
      <a-button type="primary" danger>保存草稿</a-button>
      <a-button>预览</a-button>
      <a-button type="primary">发布</a-button>
      <a-button type="dashed">附件库</a-button>
    </template>
  </a-page-header>
  <div style="margin-top: 24px">
    <a-input v-model:value="state.data.title" />
  </div>
</template>

<script setup lang="ts">
import { Button as AButton, Input as AInput, PageHeader as APageHeader } from 'ant-design-vue'
import { reactive, onMounted } from 'vue'

const state = reactive({
  data: {
    title: '',
  } as any,
})

onMounted(() => {})
</script>
