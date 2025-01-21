<script setup lang="ts"></script>

<template>
    <div class="error-page">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <router-link to="/">Go back to Home</router-link>
    </div>
</template>

<style scoped>
.error-page {
    text-align: center;
    margin-top: 50px;
}

.error-page h1 {
    font-size: 3em;
    margin-bottom: 20px;
}

.error-page p {
    font-size: 1.5em;
    margin-bottom: 20px;
}

.error-page a {
    font-size: 1.2em;
    color: #42b983;
    text-decoration: none;
}
</style>
