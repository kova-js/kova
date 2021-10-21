<template>
  <div>
    <iframe class="site-frame" :src="url" />
  </div>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Users',
  components: {
    Button,
  },
  setup() {
    return {
      url: ref('https://aiecho.cn'),
    }
  },
  props: ['fetchData'],
})
</script>

<style lang="less" scoped>
.site-frame {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  transform: translateZ(0);
}
</style>
