<template>
  <div class="grix xs1 sm2">
    <div>
      <RegisteredUserChart :days="10" :title="'Registered users'" />
    </div>
    <div>
      <TotalUserChart :days="10" :title="'Total users'" />
    </div>
  </div>
  <UserTable />
  <UserModal />
</template>
<script setup lang="ts">
import UserModal from "./UserModal.vue";
import UserTable from "./UserTable.vue";
import RegisteredUserChart from "../charts/users/RegisteredUserChart.vue";
import TotalUserChart from "../charts/users/TotalUserChart.vue";
</script>
