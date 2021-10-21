<template>
  <router-link to="/category/test">
    <Button>test</Button>
  </router-link>
  <AInput v-model:value="searchValue" placeholder="Search..." />
  <div class="container">test</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { Button, Input } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'Search',
  components: {
    AButton: Button,
    AInput: Input,
  },
  props: ['fetchData'],
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const searchValue = ref<string>(router.currentRoute.value.query.s?.toString() ?? '')
    watch(
      () => searchValue.value,
      () => {
        router.replace({
          path: route.path,
          query: {
            s: searchValue.value || undefined,
          },
        })
      },
    )
    return { searchValue }
  },
})
</script>

<style lang="less">
.container {
  color: red;
}
</style>
