<script setup lang="ts">
import AppErrorPage from '@/components/AppError/AppErrorPage.vue'
import { useErrorStore } from '@/stores/error'

useErrorStore().setError('Some error message')
</script>

<template>
    <AppErrorPage />
</template>
