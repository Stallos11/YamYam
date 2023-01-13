<template>
    <aside class="fixed left-0 top-0 h-screen bg-white shadow-xl overflow-hidden transition-all" 
        :class="{ 'w-96 opacity-100': layoutStore.sidenav, 'w-0 opacity-0': !layoutStore.sidenav }">
            <Icon @click="layoutStore.toggle()" icon="akar-icons:arrow-left" class="w-10 h-10 m-4 p-2 rounded-full hover:bg-gray-50 cursor-pointer"/>
        </aside>
    <slot />
</template>
  
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useAuthStore } from '../stores/authStore'
import { useLayoutStore } from '../stores/layoutStore';
const authStore = useAuthStore()
const layoutStore = useLayoutStore()
</script>