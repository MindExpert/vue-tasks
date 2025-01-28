<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { projectsQuery } from '@/utils/supaQueries'
import type { Projects } from '@/utils/supaQueries'
import type { ColumnDef } from '@tanstack/vue-table'

usePageStore().pageData.title = 'My Projects'

const projects = ref<Projects | null>([])
const getProjects = async () => {
    const { data, error } = await projectsQuery

    if (error) {
        console.error('Error fetching projects:', error.message)
        return
    }

    projects.value = data
}

await getProjects()

const columns: ColumnDef<Projects[0]>[] = [
    {
        accessorKey: 'name',
        header: () => h('div', { class: 'text-left' }, 'Name'),
        cell: ({ row }) => {
            return h(
                RouterLink,
                {
                    to: `/projects/${row.original.slug}`,
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
        accessorKey: 'created_at',
        header: () => h('div', { class: 'text-left' }, 'Created At'),
        cell: ({ row }) => {
            const date = new Date(row.getValue('created_at'))
            return h('div', { class: 'text-left font-medium' }, date.toLocaleDateString())
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
    <DataTable v-if="projects" :data="projects" :columns="columns" />
</template>
