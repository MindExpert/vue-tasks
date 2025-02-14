// This state is global and can be used in any component Thats why is outside of the scope of component
const menuOpen = ref(false)

export const useMenu = () => {
    const toggleMenu = () => (menuOpen.value = !menuOpen.value)

    return {
        menuOpen,
        toggleMenu,
    }
}
