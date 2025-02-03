import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

// ALL TASKS
export const tasksWithProjectsQuery = supabase.from('tasks').select(`
    *,
    projects (
        *
    )
`)
export type TaskWithProjects = QueryData<typeof tasksWithProjectsQuery>

// ALL PROJECTS
export const projectsQuery = supabase.from('projects').select('*')
export type Projects = QueryData<typeof projectsQuery>

// SINGLE PROJECT with ALL TASKS
export const projectQuery = (slug: string) =>
    supabase.from('projects').select(`*, tasks(*)`).eq('slug', slug).single()
export type Project = QueryData<ReturnType<typeof projectQuery>>

// SINGLE TASK with PROJECT
export const taskQuery = (id: string) =>
    supabase.from('tasks').select(`*, projects(*)`).eq('id', Number(id)).single()
export type Task = QueryData<ReturnType<typeof taskQuery>>

// PROFILE
export const profileQuery = (id: string) => {
    return supabase.from('profiles').select().eq('id', id).single()
}
