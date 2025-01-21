<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
    <div>
        <h1>Sample Project {{ route.params?.id }}</h1>
        <p>This is a sample project description.</p>
    </div>
</template>

<style scoped>
/* Add your styles here */
</style>
