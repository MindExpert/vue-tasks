export const useErrorStore = defineStore('error-store', () => {
    const errorMsg = ref('')
    const activeError = ref(false)

    const setError = (message: string) => {
        activeError.value = true
        errorMsg.value = message
    }
    const clearError = () => {
        activeError.value = false
        errorMsg.value = ''
    }
    return {
        errorMsg,
        activeError,
        setError,
        clearError,
    }
})
