<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database/types'

const projects = ref<Tables<'projects'>[] | null>([])

//IIFE: Immediately Invoked Function Expression
;(async () => {
    const { data, error } = await supabase.from('projects').select('*')

    if (error) {
        console.error('Error fetching projects:', error.message)
        return
    }

    projects.value = data
})()
</script>

<template>
    <div class="projects">
        <h1>Projects</h1>
        <RouterLink to="/">Home</RouterLink>
        <ul>
            <li v-for="project in projects" :key="project.id">
                <RouterLink :to="`/projects/${project.id}`">{{ project.name }}</RouterLink>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.projects {
    padding: 20px;
}

.projects h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

.projects ul {
    list-style-type: none;
    padding: 0;
}

.projects li {
    margin: 5px 0;
}
</style>
