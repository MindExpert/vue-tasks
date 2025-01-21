import Home from '@/views/Home.vue'
import { h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => Home,
        },
        {
            path: '/projects',
            name: 'Projects',
            component: () => import('@/views/Projects.vue'), // Lazy loading [dynamic import]
        },
        {
            path: '/projects/:id', // Dynamic route
            name: 'SingleProject',
            component: () => import('@/views/SingleProject.vue'),
        },
        {
            //cath all undefined routes
            path: '/:pathMatch(.*)*', // '/:catchAll(.*)*'
            name: 'NotFound',
            component: h('div', { style: 'color: red;' }, '404! Page not found'),
        },
    ],
})

export default router
