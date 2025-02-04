<script setup lang="ts">
const errorStore = useErrorStore()

onErrorCaptured((error) => {
    errorStore.setError({ error })
})

onMounted(async () => {
    useAuthStore().trackAuthChanges()
})
</script>

<template>
    <AuthLayout>
        <AppErrorPage v-if="errorStore.activeError" />

        <RouterView v-slot="{ Component, route }">
            <Suspense v-if="Component" :timeout="0">
                <Component :is="Component" :key="route.name" />
                <template #fallback>
                    <div>Loading...</div>
                </template>
            </Suspense>
        </RouterView>
    </AuthLayout>
</template>
