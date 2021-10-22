<template>
  <div class="auth-content">
    <div class="auth-form">
      <AForm :model="formState">
        <AFormItem name="name" v-bind="formRef.validateInfos.name">
          <AInput v-model:value="formState.name" placeholder="用户名/邮箱" autocomplete="off" />
        </AFormItem>
        <AFormItem name="password" v-bind="formRef.validateInfos.password">
          <AInput
            v-model:value="formState.password"
            placeholder="密码"
            type="password"
            autocomplete="off"
          />
        </AFormItem>
        <AFormItem>
          <AButton type="primary" @click.prevent="onSubmit" block>登录</AButton>
        </AFormItem>
      </AForm>
    </div>
  </div>
</template>

<script lang="ts">
import { Button, Form as AForm, Input } from 'ant-design-vue'
import { defineComponent, reactive } from 'vue'
import { throttle } from 'lodash'

export default defineComponent({
  name: 'Login',
  components: {
    AButton: Button,
    AForm,
    AFormItem: AForm.Item,
    AInput: Input,
  },
  props: ['fetchData'],
  setup() {
    const formState = reactive({
      name: '',
      password: '',
    })
    const rules = reactive({
      name: [{ required: true, message: '请输入用户名' }],
      password: [{ required: true, message: '请输入密码' }],
    })
    const formRef = AForm.useForm(formState, rules)

    const onSubmit = throttle(async () => {
      try {
        await formRef.validate()
      } catch (e: any) {
        console.log(e)
      }
    }, 1200)
    return { formState, formRef, onSubmit }
  },
})
</script>

<style lang="less" scoped>
.auth-content {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>
