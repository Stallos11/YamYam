<template>
  <div class="card bg-light rounded-2 overflow-visible mt-5 light-shadow-4">
    <div class="card-content d-flex vcenter fx-col py-5">
      <div class="spinner text-primary">
        <svg viewBox="25 25 50 50">
          <circle class="spinner-path" cx="50" cy="50" r="20" fill="none" stroke-width="3" />
        </svg>
      </div>

      <h1 class="font-s4 font-w500 mb-0">Chargement...</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  const token = route.query.token as string;
  if (!token) return router.push('/login');

  authStore.getUserByToken(atob(token));
});
</script>
