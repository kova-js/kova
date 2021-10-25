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
      <noscript>
        <strong>
          We're sorry but {{ title }} doesn't work properly without JavaScript enabled. Please
          enable it to continue.
        </strong>
      </noscript>
      <div id="app">
        <slot name="children" />
      </div>
      <slot name="initialData" />
      <slot name="customeFooterScript" />
      <slot name="jsInject" />
    </body>
  </html>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Document',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
})
</script>
