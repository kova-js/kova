<template>
  <div>
    <a-row :gutter="12">
      <a-col :xl="6" :lg="6" :md="12" :sm="12" :xs="12" class="mb-3">
        <analysis-card title="文章" :number="data.postCount"></analysis-card>
      </a-col>
      <a-col :xl="6" :lg="6" :md="12" :sm="12" :xs="12" class="mb-3">
        <analysis-card title="评论" :number="data.commentCount"></analysis-card>
      </a-col>

      <a-col :xl="6" :lg="6" :md="12" :sm="12" :xs="12" class="mb-3">
        <analysis-card title="阅读量" :number="data.viewCount"></analysis-card>
      </a-col>
      <a-col :xl="6" :lg="6" :md="12" :sm="12" :xs="12" class="mb-3">
        <analysis-card title="建立天数" :number="data.commentCount"></analysis-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Button, Col, Row } from 'ant-design-vue'
import { defineComponent, reactive, toRefs, onMounted, computed } from 'vue'
import PageView from '@/components/page-view/index.vue'
import AnalysisCard from './components/analysis-card.vue'
import { statistics } from '@/api/admin'

export default defineComponent({
  name: 'Dashboard',
  components: {
    AButton: Button,
    ACol: Col,
    ARow: Row,
    PageView,
    AnalysisCard,
  },
  props: ['fetchData'],
  setup() {
    const state = reactive({
      loading: false,
      data: {} as any,
    })

    async function handleLoadStatistics() {
      try {
        const data = await statistics()
        console.log(data)
        state.data = data
      } catch (error) {}
    }

    onMounted(() => {
      handleLoadStatistics()
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>
