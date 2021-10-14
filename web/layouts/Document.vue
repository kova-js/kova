<template>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <!-- <meta name="theme-color" content="#000000" /> -->
    <title>Serverless Side Render for Vue3</title>
    <slot name="viteClient" />
    <slot name="customeHeadScript" />
    <slot name="cssInject" />
  </head>
  <body>
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
})
</script>