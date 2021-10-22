<template>
  <ACard :bordered="false" :bodyStyle="{ padding: '16px' }">
    <div class="table-page-search-wrapper">
      <AForm layout="inline">
        <ARow :gutter="48" style="width: 100%">
          <ACol :md="6" :sm="24">
            <AFormItem label="关键词：">
              <AInput v-model="queryParams.keyword" @keyup.enter="handleQuery" />
            </AFormItem>
          </ACol>
          <ACol :md="6" :sm="24">
            <AFormItem label="文章状态：">
              <ASelect
                v-model="queryParams.status"
                placeholder="请选择文章状态"
                @change="handleQuery()"
                allowClear
              >
                <ASelectOption
                  v-for="status in Object.keys(postStatus)"
                  :key="status"
                  :value="status"
                >
                  {{ postStatus[status].text }}
                </ASelectOption>
              </ASelect>
            </AFormItem>
          </ACol>
          <ACol :md="6" :sm="24">
            <AFormItem label="分类目录：">
              <ASelect
                v-model="queryParams.categoryId"
                placeholder="请选择分类"
                @change="handleQuery()"
                :loading="categoriesLoading"
                allowClear
              >
                <ASelectOption v-for="category in categories" :key="category.id">
                  {{ category.name }}({{ category.postCount }})
                </ASelectOption>
              </ASelect>
            </AFormItem>
          </ACol>
          <ACol :md="6" :sm="24">
            <span class="table-page-search-submitButtons">
              <ASpace>
                <AButton type="primary">查询</AButton>
                <AButton>重置</AButton>
              </ASpace>
            </span>
          </ACol>
        </ARow>
      </AForm>
    </div>
    <div>
      <ATable :columns="columns" :data-source="data"> </ATable>
    </div>
  </ACard>
</template>

<script lang="ts">
import { Button, Card, Col, Form, Input, Row, Select, Space, Table } from 'ant-design-vue'
import { defineComponent, reactive, ref } from 'vue'
import { postStatus } from '@/interface/admin'

export default defineComponent({
  name: 'Posts',
  components: {
    AButton: Button,
    ACard: Card,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    ASpace: Space,
    ATable: Table,
  },
  props: ['asyncData', 'fetchData'],
  setup(props) {
    function handleQuery() {}
    const categories = ref<any[]>([])
    return {
      queryParams: reactive({
        keyword: '',
        status: null,
        categoryId: null,
      }),
      categoriesLoading: ref(false),
      handleQuery,
      categories,
      columns: ref([
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '状态',
          dataIndex: 'status',
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
          key: 'commentsCount',
        },
        {
          title: '访问',
          dataIndex: 'viewsCount',
          key: 'viewsCount',
        },
        {
          title: '发布时间',
          dataIndex: 'publishedAt',
          key: 'publishedAt',
        },
      ]),
      data: ref([]),
      postStatus: ref(postStatus),
    }
  },
})
</script>
