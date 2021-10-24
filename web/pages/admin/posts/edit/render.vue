<template>
  <a-page-header :title="state.data.title" style="background-color: #fff">
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
import { show } from '@/api/post'
import { Button as AButton, Input as AInput, PageHeader as APageHeader } from 'ant-design-vue'
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// export default defineComponent({
//   name: 'PostEdit',
//   components: {
//     Button,
//   },
//   props: ['fetchData'],
// })
const route = useRoute()
const router = useRouter()

const props = defineProps(['fetchData'])

const state = reactive({
  data: {
    title: '',
  } as any,
})

async function handleGetPost() {
  try {
    const id = route.query.id
    if (!id) return
    const res = await show(id as unknown as number)
    state.data = res.data
  } catch (e: any) {}
}

onMounted(() => {
  handleGetPost()
})
</script>
