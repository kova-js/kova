<template>
  <a-card :title="isEdit ? '修改标签' : '添加标签'" :bodyStyle="{ padding: '16px' }">
    <a-form layout="vertical">
      <a-form-item label="名称：">
        <a-input v-model:value="props.modelValue.name" />
      </a-form-item>
      <a-form-item label="别名：">
        <a-input v-model:value="props.modelValue.slug" />
      </a-form-item>
      <a-form-item label="描述：">
        <a-textarea v-model:value="props.modelValue.description" type="textarea" />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button @click.stop type="primary">
            {{ isEdit ? '更新' : '保存' }}
          </a-button>
          <a-button v-if="isEdit" @click.stop type="link" @click="hanldeReset">返回添加</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup lang="ts">
import {
  Button as AButton,
  Input as AInput,
  Form as AForm,
  Card as ACard,
  Space as ASpace,
} from 'ant-design-vue'
import { computed } from 'vue'

const { Item: AFormItem } = AForm
const { TextArea: ATextarea } = AInput
const props = defineProps(['modelValue'])

const defaultData = {
  name: '',
  slug: '',
}

const isEdit = computed(() => !!props.modelValue.id)

const emit = defineEmits(['update:modelValue'])

function hanldeReset() {
  emit('update:modelValue', { ...defaultData })
}
</script>
