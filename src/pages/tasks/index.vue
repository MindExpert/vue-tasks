<script setup lang="ts">
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import type { TaskWithProjects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<TaskWithProjects | null>([])

const getTasks = async () => {
    const { data, error } = await tasksWithProjectsQuery

    if (error) console.error('Error fetching tasks:', error.message)

    tasks.value = data
}

await getTasks()
</script>

<template>
    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style scoped>
/* Add your styles here */
</style>
