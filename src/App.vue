<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
    <nav class="h-16 border-b bg-muted/40 flex items-center justify-between px-6">
        <form class="relative w-full h-fit max-w-96">
            <iconify-icon
                class="absolute top-[50%] translate-y-[-50%] left-2 text-muted-foreground"
                icon="lucide:search"
            ></iconify-icon>
            <Input
                type="search"
                placeholder="Search projects"
                class="w-full pl-8 bg-background h-8 rounded-lg border-primary/60 focus:outline-none"
            />
        </form>

        <div class="flex items-center space-x-4">
            <router-link class="flex items-center space-x-2" to="/">Home</router-link>
            <router-link class="flex items-center space-x-2" to="/projects">Projects</router-link>
            <router-link class="flex items-center space-x-2" to="/tasks">Tasks</router-link>
        </div>

        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                    <AvatarFallback>EM</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem disabled>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscriptions</DropdownMenuItem>
                <DropdownMenuItem><span>Log out</span> </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </nav>
    <main>
        <RouterView />
    </main>
</template>

<style scoped></style>
