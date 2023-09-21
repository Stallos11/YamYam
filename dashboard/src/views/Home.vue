<template>
  <div class="px-4 py-2">
    <div class="grix xs1 md2">
      <div>
        <ApexChart
          :period="'month'"
          :url="'users/registrations'"
          :title="'New users'"
        />
      </div>
      <div>
        <ApexChart
          :period="'month'"
          :url="'users/total'"
          :title="'Total users'"
        />
      </div>
    </div>
    <div class="grix xs1 sm2 md4">
      <div>
        <ApexChart
          :period="'month'"
          :url="'recipe-types/registrations'"
          :title="'New recipe types'"
        />
      </div>
      <div>
        <ApexChart
          :period="'month'"
          :url="'recipe-types/total'"
          :title="'Total recipe types'"
        />
      </div>
      <div>
        <ApexChart
          :period="'month'"
          :url="'recipe-categories/registrations'"
          :title="'New recipe categories'"
        />
      </div>
      <div>
        <ApexChart
          :period="'month'"
          :url="'recipe-categories/total'"
          :title="'Total recipe categories'"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ApexChart from "../components/ApexChart.vue";
</script>

<style lang="scss">

</style>