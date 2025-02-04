import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

// This is a simple example of how to protect a route [We are using the `trackAuthChanges` method from the `auth` store]
router.beforeEach(async (to, from) => {
    const authStore = useAuthStore()
    await authStore.getSession()

    const isAuthPage = ['/login', '/register'].includes(to.path)

    if (!authStore.user && !isAuthPage) {
        return { name: '/login' }
    }

    if (authStore.user && isAuthPage) {
        return { name: '/' }
    }
})

export default router
