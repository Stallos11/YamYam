
<template>
    <form class="max-w-2xl w-full mx-auto p-5 flex flex-col gap-5" 
        @submit.prevent="authStore.login(email, password)">
        <input type="text" v-model="email" class="bg-gray-50 w-full h-12 px-3" placeholder="Email" />
        <input type="password" v-model="password" class="bg-gray-50 w-full h-12 px-3" placeholder="Password" />
        <button type="submit" class="bg-blue-500 text-white w-full h-12 px-3">Connexion</button>
    </form>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
const authStore = useAuthStore()

const email = ref()
const password = ref()
</script>