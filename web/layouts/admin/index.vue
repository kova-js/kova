<template>
    <div class="admin">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: "AdminLayout"
})
</script>
