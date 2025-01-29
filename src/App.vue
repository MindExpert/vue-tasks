<script setup lang="ts">
import { useErrorStore } from '@/stores/error'

const { activeError, errorMsg } = useErrorStore()
</script>

<template>
    <AuthLayout>
        <AppErrorPage v-if="activeError" :message="errorMsg" />

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
