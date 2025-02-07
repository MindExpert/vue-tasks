import { useMemoize } from '@vueuse/core'
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import type { TasksWithProjects } from '@/utils/supaQueries'

export const useTasksStore = defineStore('tasks-store', () => {
    const tasks = ref<TasksWithProjects | null>(null)
    const loadTasks = useMemoize(async (key: string) => await tasksWithProjectsQuery)

    const getTasks = async () => {
        const { data, error, status } = await loadTasks('tasks')

        if (error) useErrorStore().setError({ error, customCode: status })

        tasks.value = data
    }

    return {
        tasks,
        getTasks,
    }
})
