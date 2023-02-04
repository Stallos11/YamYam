<template>
  <div class="px-4 py-2">
    <RegisteredUserChart />
    <div class="grix xs1 md2">
      <div>
        <TotalUserChart />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import RegisteredUserChart from "./charts/users/RegisteredUserChart.vue";
import TotalUserChart from "./charts/users/TotalUserChart.vue";
</script>
