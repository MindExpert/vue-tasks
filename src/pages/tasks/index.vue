<script setup lang="ts">
import { h, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../../database/types'
import DataTable from '@/components/ui/data-table/DataTable.vue'
import type { ColumnDef } from '@tanstack/vue-table'

const tasks = ref<Tables<'tasks'>[] | null>([])

//IIFE: Immediately Invoked Function Expression
;(async () => {
    const { data, error } = await supabase.from('tasks').select('*')

    if (error) {
        console.error('Error fetching tasks:', error.message)
        return
    }

    tasks.value = data
})()

const columns: ColumnDef<Tables<'tasks'>>[] = [
    {
        accessorKey: 'name',
        header: () => h('div', { class: 'text-left' }, 'Name'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, row.getValue('name'))
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
        accessorKey: 'project_id',
        header: () => h('div', { class: 'text-left' }, 'Project'),
        cell: ({ row }) => {
            return h('div', { class: 'text-left font-medium' }, row.getValue('project_id'))
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
