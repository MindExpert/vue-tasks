<script setup lang="ts"></script>

<template>
    <nav class="h-16 border-b bg-muted/40 flex items-center justify-between px-6">
        <form class="w-full max-w-96">
            <input
                type="search"
                placeholder="Search projects"
                class="w-full pl-4 bg-background h-8 px-4 rounded-lg border border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/60"
            />
        </form>

        <div class="flex items-center space-x-4">
            <router-link class="flex items-center space-x-2" to="/">Home</router-link>
            <router-link class="flex items-center space-x-2" to="/projects">Projects</router-link>
            <router-link class="flex items-center space-x-2" to="/tasks">Tasks</router-link>
        </div>

        <div class="w-8 h-8 rounded-full bg-white"></div>
    </nav>
    <main>
        <RouterView />
    </main>
</template>

<style scoped></style>
