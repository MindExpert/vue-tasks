<script setup lang="ts">
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import type { TaskWithProjects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<TaskWithProjects | null>([])

const getTasks = async () => {
    const { data, error, status } = await tasksWithProjectsQuery

    if (error) useErrorStore().setError({ error, customCode: status })

    tasks.value = data
}

await getTasks()

/** NEW WAY WITH CACHE */
//import { columns } from '@/utils/tableColumns/projectsColumns'
//import { useTasksStore } from '@/stores/loaders/tasks'
//
//usePageStore().pageData.title = 'My Tasks'
//
//const tasksLoader = useTasksStore()
//const { tasks } = storeToRefs(tasksLoader)
//const { getTasks } = tasksLoader
//
//await getTasks()
</script>

<template>
    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style scoped>
/* Add your styles here */
</style>
