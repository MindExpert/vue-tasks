<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

interface Project {
    id: number
    name: string
}

export default defineComponent({
    name: 'Projects',
    setup() {
        const projects = ref<Project[]>([])

        onMounted(() => {
            // Simulate fetching data from an API
            projects.value = [
                { id: 1, name: 'Project One' },
                { id: 2, name: 'Project Two' },
                { id: 3, name: 'Project Three' },
            ]
        })

        return {
            projects,
        }
    },
})
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
