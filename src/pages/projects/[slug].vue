<script setup lang="ts">
const route = useRoute()
</script>

<template>
    <div>
        <h1>Sample Project: {{ route.params?.slug }}</h1>
    </div>
</template>

<style scoped>
/* Add your styles here */
</style>
