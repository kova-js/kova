<template>
  <div>
    <AForm :model="formModel" layout="vertical" :wrapperCol="wrapperCol">
      <AFormItem label="博客标题：" prop="title">
        <AInput v-model:value="formModel.title" />
      </AFormItem>
      <AFormItem label="博客地址：" prop="url">
        <AInput v-model:value="formModel.url" />
      </AFormItem>
    </AForm>
  </div>
</template>

<script lang="ts">
import { Button, Input, Form } from 'ant-design-vue'
import { defineComponent, ref, reactive } from 'vue'

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
