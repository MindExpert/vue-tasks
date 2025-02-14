<script setup lang="ts">
import { useTasksStore } from '@/stores/loaders/tasks'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'My Tasks'

// const tasks = ref<TasksWithProjects | null>([])
// const getTasks = async () => {
//     const { data, error, status } = await tasksWithProjectsQuery
//     if (error) useErrorStore().setError({ error, customCode: status })
//     tasks.value = data
// }
// await getTasks()

/** NEW WAY WITH CACHE */
const tasksLoader = useTasksStore()
const { tasks } = storeToRefs(tasksLoader)
const { getTasks } = tasksLoader

await getTasks()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

getGroupedCollabs(tasks.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)

useMeta({
    title: 'My Tasks | Pulse',
    description: {
        name: 'description',
        content: 'See all your tasks in Pulse.',
    },
})
</script>

<template>
    <DataTable v-if="tasks" :columns="columnsWithCollabs" :data="tasks" />
</template>

<style scoped>
/* Add your styles here */
</style>
