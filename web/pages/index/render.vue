<template>
  <router-link to="/auth/login">
    <AButton>Login</AButton>
  </router-link>
  <AInput v-model:value="searchValue" placeholder="Search..." />
  <div class="container">test</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onActivated } from 'vue'
import { Button, Input } from 'ant-design-vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Home',
  components: {
    AButton: Button,
    AInput: Input,
  },
  props: ['fetchData'],
  setup(props) {
    const router = useRouter()
    const searchValue = ref<string>(router.currentRoute.value.query.s?.toString() ?? '')
    watch(
      () => searchValue.value,
      () => {
        console.log(props.fetchData)
        router.replace({
          path: '/',
          query: {
            s: searchValue.value || undefined,
          },
        })
      },
    )

    onActivated(() => {
      console.log(props.fetchData)
    })
    return { searchValue }
  },
})
</script>

<style lang="less">
.container {
  color: red;
}
</style>
