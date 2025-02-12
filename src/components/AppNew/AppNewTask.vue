<script setup lang="ts">
const sheetOpen = defineModel<boolean>()
</script>

<template>
    <Sheet v-model:open="sheetOpen">
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove your data from our servers.
                </SheetDescription>
            </SheetHeader>

            <div class="grid gap-4 py-4">
                <FormKit type="text" />
                <FormKit type="text" />
            </div>

            <SheetFooter>
                <SheetClose as-child>
                    <Button type="submit"> Save changes </Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>
</template>
