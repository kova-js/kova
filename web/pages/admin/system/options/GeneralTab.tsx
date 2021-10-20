import { Button, Input, Form } from 'ant-design-vue'
import { defineComponent, reactive } from 'vue'

export const GeneralTab = defineComponent({
  name: 'GeneralTab',
  setup() {
    const formModel = reactive({
      title: '',
      url: '',
      logo: '',
      favicon: '',
    })
    const wrapperCol = {
      xl: { span: 8 },
      lg: { span: 8 },
      sm: { span: 12 },
      xs: { span: 24 },
    }
    return () => (
      <div>
        <Form model={formModel} layout="vertical" wrapperCol={wrapperCol}>
          <Form.Item label="博客标题：" prop="title" rules={[{ required: true }]}>
            <Input value={formModel.title} />
          </Form.Item>
          <Form.Item label="博客地址：" prop="url" rules={[{ required: true }]}>
            <Input value={formModel.url} />
          </Form.Item>
          <Form.Item>
            <Button type="primary">保存</Button>
          </Form.Item>
        </Form>
      </div>
    )
  },
})

export default GeneralTab
