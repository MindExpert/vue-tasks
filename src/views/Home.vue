<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="home">
        <h1>Welcome to Home View page</h1>
        <RouterLink to="/projects">Projects</RouterLink>
    </div>
</template>

<style scoped>
.home {
    text-align: center;
    margin-top: 50px;
}
</style>
