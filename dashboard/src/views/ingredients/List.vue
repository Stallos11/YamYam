<template>
  <Transition name="scale">
    <div>
      <div class="grix xs1 sm2">
        <div>
          <ApexChart
            :period="'week'"
            :url="'ingredients/registrations'"
            :title="'Registered ingredients'"
          />
        </div>
        <div>
          <ApexChart
            :period="'week'"
            :url="'ingredients/total'"
            :title="'Total ingredients'"
          />
        </div>
      </div>
      <IngredientSearch />
      <Table
        :enable-form="true"
        :filter-key-options="ingredientsFilterKeyOptions"
        :headers="ingredientsTableHeaders"
        :store="'ingredients'"
      />
      <IngredientModal />
    </div>
  </Transition>
</template>
<script setup lang="ts">
import IngredientSearch from "../../components/IngredientSearch.vue";
import Table from "../../components/Table.vue";
import ApexChart from "../../components/ApexChart.vue";
import {
  ingredientsTableHeaders,
  ingredientsFilterKeyOptions,
} from "../../models/ingredients";
import IngredientModal from "./IngredientModal.vue";
import { ref, watch } from "vue";
import { useIngredientStore } from "../../stores/ingredients";

const queryField = ref("");
const queryValue = ref("");
const ingredientStore = useIngredientStore();

watch(queryValue, (first: string, second: string) => {
  if (first.length > 2) {
    ingredientStore.searchIngredientBy(queryField.value, queryValue.value);
  }
});
</script>
