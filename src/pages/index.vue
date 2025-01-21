<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="home">
        <h1>Welcome to Home View page</h1>
        <RouterLink :to="{ name: '/projects/' }">Projects</RouterLink>
        <br />
        <RouterLink :to="{ name: '/projects/[id]', params: { id: 1 } }">Project 1</RouterLink>
    </div>
</template>

<style scoped>
.home {
    text-align: center;
    margin-top: 50px;
}
</style>
