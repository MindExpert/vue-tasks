import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

// ALL TASKS
export const tasksWithProjectsQuery = supabase.from('tasks').select(`
    *,
    projects (
        *
    )
`)
export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

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
export const profileQuery = ({ column, value }: { column: string; value: string }) => {
    return supabase.from('profiles').select().eq(column, value).single()
}

// GROUPED COLLABS
export const groupedProfilesQuery = (userIds: string[]) =>
    supabase.from('profiles').select('username, avatar_url, id, full_name').in('id', userIds)
export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>

// UPDATE PROJECT
export const updateProjectQuery = (updatedProject = {}, id: number) => {
    return supabase.from('projects').update(updatedProject).eq('id', id)
}
