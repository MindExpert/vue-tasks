<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import type { TaskWithProjects } from '@/utils/supaQueries'

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<TaskWithProjects | null>([])

const getTasks = async () => {
    const { data, error } = await tasksWithProjectsQuery

    if (error) {
        console.error('Error fetching tasks:', error.message)
        return
    }

    tasks.value = data
}

await getTasks()

const columns: ColumnDef<TaskWithProjects[0]>[] = [
    {
        accessorKey: 'name',
        header: () => h('div', { class: 'text-left' }, 'Name'),
        cell: ({ row }) => {
            return h(
                RouterLink,
                {
                    to: `/tasks/${row.original.id}`,
                    class: 'text-left font-medium hover:bg-muted block w-full',
                },
                () => row.getValue('name'),
            )
        },
    },
    {
        accessorKey: 'status',
        header: () => h('div', { class: 'text-left' }, 'Status'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
        },
    },
    {
        accessorKey: 'due_date',
        header: () => h('div', { class: 'text-left' }, 'Due Date'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'))
        },
    },
    {
        accessorKey: 'projects',
        header: () => h('div', { class: 'text-left' }, 'Project'),
        cell: ({ row }) => {
            return row.original.projects
                ? h(
                      RouterLink,
                      {
                          to: `/projects/${row.original.projects.slug}`,
                          class: 'text-left font-medium hover:bg-muted block w-full',
                      },
                      () => row.original.projects?.name,
                  )
                : h('div', { class: 'text-left font-medium' }, 'No Project')
        },
    },
    {
        accessorKey: 'collaborators',
        header: () => h('div', { class: 'text-right' }, 'Collaborators'),
        cell: ({ row }) => {
            return h(
                'div',
                { class: 'text-right font-medium' },
                JSON.stringify(row.getValue('collaborators')),
            )
        },
    },
]
</script>

<template>
    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style scoped>
/* Add your styles here */
</style>
