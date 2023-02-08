<template>
  <div class="px-4 py-2">
    <div class="grix xs1 md2">
      <div>
        <ApexChart
          :period="'week'"
          :url="'users/registrations'"
          :title="'Registered users'"
        />
      </div>
      <div>
        <ApexChart
          :period="'week'"
          :url="'users/total'"
          :title="'Total users'"
        />
      </div>
      <div></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ApexChart from "../components/ApexChart.vue";
</script>
