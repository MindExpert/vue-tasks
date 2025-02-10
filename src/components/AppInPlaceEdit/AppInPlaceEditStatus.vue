<script setup lang="ts">
const value = defineModel<'in-progress' | 'completed' | 'archived'>()

const emit = defineEmits(['commit'])

const { readonly = false } = defineProps<{
    readonly?: boolean
}>()

const toggleValue = () => {
    if (readonly) return

    if (value.value === 'archived') return

    if (value.value === 'in-progress') {
        value.value = 'completed'
    } else if (value.value === 'completed') {
        value.value = 'archived'
    }

    emit('commit')
}
</script>

<template>
    <div class="text-2xl cursor-pointer" @click="toggleValue">
        <Transition mode="out-in">
            <iconify-icon
                v-if="value === 'in-progress'"
                icon="lucide:circle-dot"
                class="text-primary"
            />
            <iconify-icon
                v-else-if="value === 'completed'"
                icon="lucide:circle-check"
                class="text-green-500"
            />
            <iconify-icon v-else icon="lucide:archive" class="text-gray-500" />
        </Transition>
    </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: transform 0.1s;
}

.v-enter-from,
.v-leave-to {
    transform: scale(0.3);
}
</style>
