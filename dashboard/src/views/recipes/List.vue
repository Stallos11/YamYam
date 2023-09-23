<template>
  <Transition name="scale">
    <div>
      <div class="grix xs1 sm2">
        <div>
          <ApexChart :period="'month'" :url="'recipes/registrations'" :title="'Registered recipes'" />
        </div>
        <div>
          <ApexChart :period="'month'" :url="'recipes/total'" :title="'Total recipes'" />
        </div>
      </div>
      <Table :enable-form="true" :filter-key-options="recipeFilterKeyOptions" :headers="recipeTableHeaders"
        :store="'recipes'" />
    </div>
  </Transition>
</template>
<script setup lang="ts">
import Table from "../../components/Table.vue";
import ApexChart from "../../components/ApexChart.vue";
import {
  recipeTableHeaders,
  recipeFilterKeyOptions,
} from "../../models/recipes";
</script>
