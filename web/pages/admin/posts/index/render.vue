<template>
  <div>
    <ACard :bordered="false" :bodyStyle="{ padding: '16px' }">
      <div class="table-page-search-wrapper">
        <AForm layout="inline">
          <ARow :gutter="48">
            <ACol :md="6" :sm="24">
              <AFormItem label="关键词：">
                <!-- <a-input v-model="queryParam.keyword" @keyup.enter="handleQuery()" /> -->
              </AFormItem>
            </ACol>
            <ACol :md="6" :sm="24">
              <AFormItem label="文章状态：">
                <!-- <a-select v-model="queryParam.status" placeholder="请选择文章状态" @change="handleQuery()" allowClear>
                  <a-select-option v-for="status in Object.keys(postStatus)" :key="status" :value="status">{{
                    postStatus[status].text
                  }}</a-select-option>
                </a-select> -->
              </AFormItem>
            </ACol>
            <ACol :md="6" :sm="24">
              <AFormItem label="分类目录：">
                <!-- <a-select
                  v-model="queryParam.categoryId"
                  placeholder="请选择分类"
                  @change="handleQuery()"
                  :loading="categoriesLoading"
                  allowClear
                >
                  <a-select-option v-for="category in categories" :key="category.id"
                    >{{ category.name }}({{ category.postCount }})</a-select-option
                  >
                </a-select> -->
              </AFormItem>
            </ACol>

            <ACol :md="6" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-space>
                  <a-button type="primary">查询</a-button>
                  <a-button>重置</a-button>
                </a-space>
              </span>
            </ACol>
          </ARow>
        </AForm>
      </div>
    </ACard>
  </div>
</template>

<script lang="ts">
import { Button, Card, Col, Form, Input, Row, Select } from 'ant-design-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Posts',
  components: {
    AButton: Button,
    ACard: Card,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    ASelect: Select,
    AInput: Input,
  },
  props: ['asyncData'],
})
</script>
