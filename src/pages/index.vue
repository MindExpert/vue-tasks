<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="home">
        <h1>Welcome to Home View page</h1>
        <RouterLink :to="{ name: '/projects/' }">Projects</RouterLink> &nbsp;
        <RouterLink :to="{ name: '/tasks/' }">Tasks</RouterLink>
    </div>
</template>

<style scoped>
.home {
    text-align: center;
    margin-top: 50px;
}
</style>
