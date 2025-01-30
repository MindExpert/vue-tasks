<script setup lang="ts">
const props = defineProps<{
    message: string
    customCode: number
    status: number
    isCustomError: boolean
}>()

// Default Error
const error = ref({
    code: 500,
    msg: 'Oops, Smth went wrong up in here!',
})

//Custom Errors
if (props.isCustomError) {
    error.value.code = props.customCode
    error.value.msg = props.message
}

//Posgrest Erros
if (props.status === 406) {
    error.value.code = 404
    error.value.msg = "The page you're looking for is not found."
}
</script>

<template>
    <div>
        <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
        <h2 class="error__code">{{ error.code }}</h2>
        <p class="error__msg">{{ error.msg }}</p>
        <div class="error-footer">
            <p class="error-footer__text">You'll find lots to explore on the home page.</p>
            <RouterLink to="/">
                <Button class="max-w-36"> Back to homepage </Button>
            </RouterLink>
        </div>
    </div>
</template>
