<template>
  <Transition name="scale">
    <div>
      <div class="grix xs1 sm2">
        <div>
          <ApexChart
            :period="'week'"
            :url="'recipe-types/registrations'"
            :title="'Registered recipe types'"
          />
        </div>
        <div>
          <ApexChart
            :period="'week'"
            :url="'recipe-types/total'"
            :title="'Total recipe types'"
          />
        </div>
      </div>
      <Table
        :store="'recipe_types'"
        :headers="recipeTypeTableHeaders"
        :filter-key-options="recipeTypeFilterKeyOptions"
      />
      <RecipeTypeModal />
    </div>
  </Transition>
</template>
<script setup lang="ts">
import Table from "../../components/Table.vue";
import ApexChart from "../../components/ApexChart.vue";
import {
  recipeTypeTableHeaders,
  recipeTypeFilterKeyOptions,
} from "../../models/recipe_types";
import RecipeTypeModal from "./RecipeTypeModal.vue";
</script>
