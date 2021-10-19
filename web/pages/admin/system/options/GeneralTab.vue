<template>
  <div>
    <AForm :model="formModel" layout="vertical" :wrapperCol="wrapperCol">
      <AFormItem label="博客标题：" prop="title" :rules="[{ required: true }]">
        <AInput v-model:value="formModel.title" />
      </AFormItem>
      <AFormItem label="博客地址：" prop="url" :rules="[{ required: true }]">
        <AInput v-model:value="formModel.url" />
      </AFormItem>
      <AFormItem>
        <AButton type="primary">保存</AButton>
      </AFormItem>
    </AForm>
  </div>
</template>

<script lang="ts">
import { Button, Input, Form } from 'ant-design-vue'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'GeneralTab',
  components: {
    AButton: Button,
    AInput: Input,
    AForm: Form,
    AFormItem: Form.Item,
  },
  setup() {
    return {
      formModel: reactive({
        title: '',
        url: '',
        logo: '',
        favicon: '',
      }),
      wrapperCol: {
        xl: { span: 8 },
        lg: { span: 8 },
        sm: { span: 12 },
        xs: { span: 24 },
      },
    }
  },
})
</script>
