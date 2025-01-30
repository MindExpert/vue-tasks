<script setup lang="ts">
defineProps<{
    message: string
    customCode: number
    details: string
    code: string
    hint: string | null
    status: number
}>()
</script>

<template>
    <div>
        <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
        <h2 class="error__code">{{ customCode || code }}</h2>
        <h3 class="error__code" v-if="status">Status Code: {{ status }}</h3>
        <p class="error__msg">{{ message }}</p>
        <p v-if="hint">{{ hint }}</p>
        <p v-if="details">{{ details }}</p>
        <div class="error-footer">
            <p class="error-footer__text">You'll find lots to explore on the home page.</p>
            <RouterLink to="/">
                <Button class="max-w-36"> Back to homepage </Button>
            </RouterLink>
        </div>
    </div>
</template>
