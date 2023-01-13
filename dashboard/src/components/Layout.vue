<template>
    <header class="bg-white shadow-sm shadow-[#eee] w-full h-20">
        <div class="max-w-2xl w-full h-full mx-auto flex items-center justify-between px-4">
            <div class="gap-4 items-center flex">
                <Icon @click="layoutStore.toggle()"
                icon="icon-park-outline:hamburger-button" class="w-10 h-10 sm:hidden p-2 rounded-full hover:bg-gray-50 cursor-pointer"/>
                <h1 class="font-bold text-lg">Parc</h1>
            </div>
            <template v-if="authStore.user">
                <div class="flex items-center gap-3">
                    <div class="flex flex-col leading-none">
                        <span>{{ authStore.user.name }}</span>
                        <span class="italic opacity-50 text-xs">{{ authStore.user.role }}</span>
                    </div>
                    <div class="w-10 h-10 bg-gray-50 rounded-full"></div>
                </div>
            </template>
        </div>
    </header>
    <Sidenav />
    <slot />
</template>
  
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Sidenav from './Sidenav.vue'
import { useAuthStore } from '../stores/authStore'
import { useLayoutStore } from '../stores/layoutStore';
const authStore = useAuthStore()
const layoutStore = useLayoutStore()
</script>