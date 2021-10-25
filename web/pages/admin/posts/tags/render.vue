<template>
  <a-page-header style="background-color: #fff"></a-page-header>
  <div style="margin-top: 24px">
    <a-row :gutter="12">
      <a-col :xl="10" :lg="10" :md="10" :sm="24" :xs="24" class="pb-3">
        <category-edit v-model="state.data" />
      </a-col>
      <a-col :xl="14" :lg="14" :md="14" :sm="24" :xs="24" class="pb-3">
        <a-card title="所有标签" :bodyStyle="{ padding: '16px' }">
          <a-tag
            style="cursor: pointer"
            v-for="tag in state.list"
            :key="tag.id"
            @click="handleEdit(tag)"
            >{{ tag.name ?? tag.slug }}</a-tag
          >
          <!-- <a-table :columns="columns" :data-source="state.list">
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
          </a-table> -->
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { query } from '@/api/tag'
import CategoryEdit from '@/components/admin/category-edit.vue'
import {
  Badge as ABadge,
  Card as ACard,
  Col as ACol,
  Divider as ADivider,
  PageHeader as APageHeader,
  Row as ARow,
  Table as ATable,
  Tag as ATag,
} from 'ant-design-vue'
import type { ColumnsType } from 'ant-design-vue/lib/table'
import { onMounted, reactive } from 'vue'

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
