<template>
  <div>
    <ATabs v-model:activeKey="activeKey" type="card" size="small">
      <ATabPane v-for="tab in tabs" :key="tab.value">
        <template #tab>
          <span>
            <component :is="tab.icon" v-if="tab.icon" />
            {{ tab.label }}
          </span>
        </template>
      </ATabPane>
    </ATabs>
  </div>
</template>

<script lang="ts">
import { Button, Tabs } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { ToolOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'SystemOptions',
  components: {
    ToolOutlined,
    AButton: Button,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
  },
  setup() {
    return {
      activeKey: ref(''),
      tabs: ref([
        {
          value: 'general',
          icon: 'ToolOutlined',
          label: '常规设置'
        },
        {
          value: 'seo',
          icon: 'ToolOutlined',
          label: 'SEO设置'
        }
      ])
    }
  }
})
</script>
