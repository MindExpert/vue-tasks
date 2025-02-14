<script setup lang="ts">
import { menuKey, type MenuInjectionOptions } from '@/utils/injectionKeys'

interface LinkProp {
    title: string
    to?: string
    icon: string
}

defineProps<{
    links: LinkProp[]
}>()

const emits = defineEmits<{
    (event: 'actionClicked', payload: string): void
}>()

const emitActionClicked = (linkTitle: string) => {
    emits('actionClicked', linkTitle)
}

/** Old way of injecting the menu composable */
//const { menuOpen } = useMenu()
const { menuOpen } = inject(menuKey) as MenuInjectionOptions
</script>

<template>
    <template v-for="(link, index) in links" :key="`sidebar-link-${index}`">
        <RouterLink
            v-if="link.to"
            exactActiveClass="text-primary bg-muted"
            :to="link.to"
            class="nav-link"
            :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
        >
            <iconify-icon :icon="link.icon"></iconify-icon>
            <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">{{
                link.title
            }}</span>
        </RouterLink>

        <div
            v-else
            @click="emitActionClicked(link.title)"
            class="nav-link cursor-pointer"
            :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
        >
            <iconify-icon :icon="link.icon"></iconify-icon>
            <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">{{
                link.title
            }}</span>
        </div>
    </template>
</template>

<style lang="css" scoped>
.nav-link {
    @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground;
}
</style>
