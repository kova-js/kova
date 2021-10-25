<template>
  <a-card :body-style="{ padding: '24px' }" :bordered="false">
    <div class="analysis-card-container">
      <div class="meta">
        <span class="analysis-card-title">
          <slot name="title">{{ title }}</slot>
        </span>
        <span class="analysis-card-action">
          <slot name="action"></slot>
        </span>
      </div>
      <div class="number">
        <slot name="number">
          <!-- <countTo
            :startVal="startNumber"
            :endVal="(typeof number === 'function' && number()) || number"
            :duration="3000"
            :autoplay="true"
          ></countTo> -->
          {{ number }}
        </slot>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
// import countTo from 'vue-count-to'
import { defineComponent, ref } from 'vue'
import { Card } from 'ant-design-vue'

export default defineComponent({
  name: 'AnalysisCard',
  components: {
    // countTo
    ACard: Card,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    number: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  setup(props) {
    const start = ref(0)
    return {
      start,
    }
  },
  //   data() {
  //     return {
  //       startNumber: 0,
  //     }
  //   },
  //   watch: {
  //     number: function (newValue, oldValue) {
  //       this.startNumber = oldValue
  //     },
  //   },
})
</script>
