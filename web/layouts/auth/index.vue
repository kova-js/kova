<template>
    <div class="auth">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: "AuthLayout"
})
</script>
