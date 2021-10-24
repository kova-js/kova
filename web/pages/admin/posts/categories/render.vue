<template>
  <a-page-header style="background-color: #fff">
    <!-- <template #extra>
      <a-button type="primary" danger>保存草稿</a-button>
      <a-button>预览</a-button>
      <a-button type="primary">发布</a-button>
      <a-button type="dashed">附件库</a-button>
    </template> -->
  </a-page-header>
  <div style="margin-top: 24px">
    <a-row :gutter="12">
      <a-col :xl="10" :lg="10" :md="10" :sm="24" :xs="24" class="pb-3">
        <a-card :title="isEdit ? '修改分类' : '添加分类'" :bodyStyle="{ padding: '16px' }">
          <a-form layout="vertical">
            <a-form-item label="名称：">
              <a-input v-model:value="state.data.name" />
            </a-form-item>
            <a-form-item label="别名：">
              <a-input v-model:value="state.data.slug" />
            </a-form-item>
            <a-form-item label="描述：">
              <a-textarea v-model:value="state.data.description" type="textarea" />
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button @click.stop type="primary">
                  {{ isEdit ? '更新' : '保存' }}
                </a-button>
                <a-button
                  v-if="isEdit"
                  @click.stop
                  type="link"
                  @click="() => (state.data = { ...defaultData })"
                >
                  返回添加
                </a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
      <a-col :xl="14" :lg="14" :md="14" :sm="24" :xs="24" class="pb-3">
        <a-card title="分类列表" :bodyStyle="{ padding: '16px' }">
          <a-table :columns="columns" :data-source="state.list">
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'postCount'">
                <a-badge :count="text" show-zero />
              </template>
              <template v-else-if="column.dataIndex === 'actions'">
                <a href="javascript:;" @click="handleEdit(record)">编辑</a>
                <a-divider type="vertical" />
                <a href="javascript:;" @click="handleDelete(record)">删除</a>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { query } from '@/api/category'
import {
  Button as AButton,
  Input as AInput,
  Form as AForm,
  Card as ACard,
  Row as ARow,
  Col as ACol,
  PageHeader as APageHeader,
  Divider as ADivider,
  Badge as ABadge,
  Table as ATable,
  Space as ASpace,
} from 'ant-design-vue'
import type { ColumnsType } from 'ant-design-vue/lib/table'
import { reactive, onMounted, ref, computed } from 'vue'

const { Item: AFormItem } = AForm
const { TextArea: ATextarea } = AInput
const defaultData: any = {
  title: '',
  slug: '',
}
const state = reactive({
  data: {
    ...defaultData,
  },
  list: [] as any[],
})

const columns: ColumnsType = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '别名',
    dataIndex: 'slug',
  },
  {
    title: '文章数',
    dataIndex: 'postCount',
  },
  {
    title: '操作',
    dataIndex: 'actions',
  },
]

function handleEdit(record: any) {
  state.data = { ...record }
}

function handleDelete(record: any) {}
const props = defineProps(['fetchData'])

const isEdit = computed(() => !!state.data.id)

async function handleGetCategories() {
  try {
    const res = await query({})
    state.list = res as any
  } catch (error) {}
}

onMounted(() => {
  handleGetCategories()
})
</script>
