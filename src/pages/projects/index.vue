<script setup lang="ts">
import { projectsQuery } from '@/utils/supaQueries'
import type { Projects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'My Projects'

const projects = ref<Projects | null>([])
const getProjects = async () => {
    const { data, error } = await projectsQuery

    if (error) console.error('Error fetching projects:', error.message)

    projects.value = data
}

await getProjects()
</script>

<template>
    <DataTable v-if="projects" :data="projects" :columns="columns" />
</template>
