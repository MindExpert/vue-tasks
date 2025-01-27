<script setup lang="ts">
interface LinkProp {
    title: string
    to: string
    icon: string
}

defineProps<{
    links: LinkProp[]
}>()
</script>

<template>
    <RouterLink
        v-for="(link, index) in links"
        :key="index"
        :to="link.to"
        exact-active-class="bg-muted text-white"
        class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
    >
        <iconify-icon :icon="link.icon"></iconify-icon>
        <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>
</template>

<!-- <style lang="css" scoped>
.router-link-active {
    color: var(--color-primary);
    background-color: black;
}
</style> -->
