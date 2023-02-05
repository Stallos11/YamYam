<template>
  <div class="px-4 py-2">
    <RegisteredUserChart :days="30" :title="'Registered users'" />
    <div class="grix xs1 md2">
      <div>
        <TotalUserChart :days="30" :title="'Total users'" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import RegisteredUserChart from "./charts/users/RegisteredUserChart.vue";
import TotalUserChart from "./charts/users/TotalUserChart.vue";
</script>
