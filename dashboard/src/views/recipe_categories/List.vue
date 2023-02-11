<template>
  <Transition name="scale">
    <div>
      <div class="grix xs1 sm2">
        <div>
          <ApexChart
            :period="'week'"
            :url="'recipe-categories/registrations'"
            :title="'Registered recipe categories'"
          />
        </div>
        <div>
          <ApexChart
            :period="'week'"
            :url="'recipe-categories/total'"
            :title="'Total recipe categories'"
          />
        </div>
      </div>
      <Table
        :enable-form="true"
        :filter-key-options="recipeCategoryFilterKeyOptions"
        :headers="recipeCategoryTableHeaders"
        :store="'recipe_categories'"
      />
      <RecipeCategoryModal />
    </div>
  </Transition>
</template>
<script setup lang="ts">
import Table from "../../components/Table.vue";
import ApexChart from "../../components/ApexChart.vue";
import {
  recipeCategoryTableHeaders,
  recipeCategoryFilterKeyOptions,
} from "../../models/recipe_categories";
import RecipeCategoryModal from "./RecipeCategoryModal.vue";
</script>
