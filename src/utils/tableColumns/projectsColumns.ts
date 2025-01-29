import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'
import type { Projects } from '@/utils/supaQueries'

export const columns: ColumnDef<Projects[0]>[] = [
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
