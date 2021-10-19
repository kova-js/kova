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
        <component :is="tab.component" v-if="tab.component" />
      </ATabPane>
    </ATabs>
  </div>
</template>

<script lang="ts">
import { Button, Tabs } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { ToolOutlined } from '@ant-design/icons-vue'
import GeneralTab from './GeneralTab.vue'

export default defineComponent({
  name: 'SystemOptions',
  components: {
    ToolOutlined,
    AButton: Button,
    ATabs: Tabs,
    GeneralTab,
    ATabPane: Tabs.TabPane,
  },
  setup() {
    return {
      activeKey: ref(''),
      tabs: ref([
        {
          value: 'general',
          icon: 'ToolOutlined',
          label: '常规设置',
          component: 'GeneralTab',
        },
        {
          value: 'seo',
          icon: 'ToolOutlined',
          label: 'SEO设置',
        },
      ]),
    }
  },
})
</script>
