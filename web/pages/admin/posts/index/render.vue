<template>
  <a-card :bordered="false" :bodyStyle="{ padding: '16px' }">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48" style="width: 100%">
          <a-col :md="6" :sm="24">
            <a-form-item label="关键词：">
              <a-input v-model:value="queryParams.keyword" @keyup.enter="handleQuery" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="文章状态：">
              <a-select
                v-model:value="queryParams.status"
                placeholder="请选择文章状态"
                @change="handleQuery"
                allowClear
              >
                <a-select-option
                  v-for="status in Object.keys(postStatus)"
                  :key="status"
                  :value="status"
                  >{{ postStatus[status].text }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="分类目录：">
              <a-select
                v-model:value="queryParams.categoryId"
                placeholder="请选择分类"
                @change="handleQuery"
                :loading="category.loading"
                allowClear
              >
                <a-select-option v-for="category in category.data" :key="category.id"
                  >{{ category.name }}({{ category.postCount }})</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-space>
                <a-button type="primary" @click="handleQuery" :loading="state.loading"
                  >查询</a-button
                >
                <a-button>重置</a-button>
              </a-space>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div>
      <a-table
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="state.data"
        :pagination="false"
        rowKey="id"
        :loading="state.loading"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'status'">
            <!-- {{ PostStatus[text].text }} -->
            <a-badge :color="PostStatus[text].color" :text="PostStatus[text].text" />
          </template>
          <template v-else-if="column.dataIndex === 'category' && text">
            <a-tag style="cursor: pointer" color="blue" @click="handleCategory(record)">
              {{ text.name }}
            </a-tag>
          </template>
          <template v-else-if="column.dataIndex === 'commentsCount'">
            <a-badge
              style="cursor: pointer"
              :count="text"
              @click="handleComment(record)"
              show-zero
            />
          </template>
          <template v-else-if="column.dataIndex === 'browseCount'">
            <a-badge :count="text" show-zero />
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <!-- <a-space> -->
            <a href="javascript:;" @click="handleConfig(record)">配置</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handleRecycle(record)">回收站</a>
            <!-- </a-space> -->
          </template>
        </template>
      </a-table>
    </div>
    <div>
      <a-pagination
        class="pagination"
        :current="pagination.page"
        :total="pagination.total"
        :defaultPageSize="pagination.size"
        :pageSizeOptions="['10', '20', '50', '100']"
        showSizeChanger
        showLessItems
      />
    </div>
  </a-card>
</template>

<script setup lang="ts">
import {
  Button as AButton,
  Card as ACard,
  Col as ACol,
  Form as AForm,
  Input as AInput,
  Row as ARow,
  Select as ASelect,
  Space as ASpace,
  Table as ATable,
  Tag as ATag,
  Pagination as APagination,
  Badge as ABadge,
  Divider as ADivider,
} from 'ant-design-vue'
import { reactive, ref, onMounted } from 'vue'
import { PostStatus } from '@/interface/admin'
import { query } from '@/api/post'
import { useRouter } from 'vue-router'

const { Item: AFormItem } = AForm
const { Option: ASelectOption } = ASelect

const router = useRouter()

const state = reactive({
  data: [] as any[],
  loading: false,
})

const pagination = reactive({
  page: 1,
  size: 10,
  sort: null,
  total: 1,
})

const rowSelection = reactive({
  selectedRowKeys: [] as any[],
  onChange: (keys: any[]) => {
    rowSelection.selectedRowKeys = keys
    console.log(keys)
  },
})

async function handleQuery() {
  if (state.loading) return
  try {
    state.loading = true
    const res = await query({})
    state.data = res.data as any[]
  } catch (error: any) {
  } finally {
    state.loading = false
  }
}

function handleCategory(record: any) {}

// function handleTag(record: any) {}

// function handleBrowse(record: any) {}

function handleComment(record: any) {}

function handleEdit(record: any) {
  router.push({
    path: '/admin/posts/edit',
    query: {
      id: record.id,
    },
  })
}

function handleConfig(record: any) {
  // router.push({
  //   path: '/admin/posts/edit',
  //   query: {
  //     id: record.id,
  //   },
  // })
}

function handleRecycle(record: any) {
  //
}

const category = reactive({
  data: [] as any[],
  loading: false,
})

const queryParams = reactive({
  keyword: '',
  status: '',
  categoryId: '',
})

const columns = ref([
  {
    title: '标题',
    dataIndex: 'title',
    width: 150,
    key: 'title',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    key: 'status',
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'categoryId',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '评论',
    dataIndex: 'commentsCount',
    width: 70,
    key: 'commentsCount',
  },
  {
    title: '访问',
    dataIndex: 'browseCount',
    width: 70,
    key: 'browseCount',
  },
  {
    title: '发布时间',
    dataIndex: 'publishedAt',
    width: 170,
    key: 'publishedAt',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 180,
  },
])

const postStatus = ref(PostStatus)

onMounted(() => {
  handleQuery()
})
</script>
