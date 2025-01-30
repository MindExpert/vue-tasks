<script setup lang="ts">
useErrorStore().setError({
    error: 'Oops, Smth went wrong up in here!',
    customCode: 500,
})
</script>

<template>
    <div></div>
</template>
