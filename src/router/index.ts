import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach(async () => {
    // This is a simple example of how to protect a route
    const { getSession } = useAuthStore()

    await getSession()
})

export default router
