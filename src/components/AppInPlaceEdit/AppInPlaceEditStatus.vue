<script setup lang="ts">
const value = defineModel<'in-progress' | 'completed' | 'archived'>()

const emit = defineEmits(['commit'])

const toggleValue = () => {
    if (value.value === 'in-progress') {
        value.value = 'completed'
    } else if (value.value === 'completed') {
        value.value = 'archived'
    } else {
        value.value = 'in-progress'
    }

    emit('commit')
}
</script>

<template>
    <div class="text-2xl cursor-pointer" @click="toggleValue">
        <Transition mode="out-in">
            <iconify-icon
                v-if="value === 'completed'"
                icon="lucide:circle-check"
                class="text-green-500"
            />
            <iconify-icon
                v-else-if="value === 'archived'"
                icon="lucide:archive"
                class="text-gray-500"
            />
            <iconify-icon v-else icon="lucide:circle-dot" class="text-primary" />
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
