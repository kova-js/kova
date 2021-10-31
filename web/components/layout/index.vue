<template>
  <html lang="zh-CN">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <title>{{ title }}</title>
      <slot name="viteClient" />
      <slot name="customeHeadScript" />
      <slot name="cssInject" />
    </head>
    <body>
      <div id="app">
        <slot name="children" />
      </div>
      fff
      <slot name="initialData" />
      <slot name="customeFooterScript" />
      <slot name="jsInject" />
    </body>
  </html>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Document',
  props: ['fetchData', 'asyncData', 'config', 'ctx'],
  setup(props) {
    const title = computed(() => props.asyncData?.value?.meta?.title || 'Kova')

    return { title }
  },
})
</script>
