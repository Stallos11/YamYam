<template>
  <div v-if="!ingredientStore.isLoading" class="py-2">
    <EasyDataTable
      :search-field="searchField"
      :search-value="searchValue"
      table-class-name="customize-table"
      header-text-direction="center"
      body-text-direction="center"
      buttons-pagination
      :empty-message="'Chercher des ingredients'"
      :rows-per-page="10"
      :headers="ingredientsTableHeaders"
      :items="ingredientStore.ingredients"
      alternating
      hide-rows-per-page
      @click-row="ingredientStore.showIngredientDetails"
    />
  </div>
  <div v-else class="spinner text-blue mx-auto my-5">
    <svg viewBox="25 25 50 50">
      <circle
        class="spinner-path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke-width="3"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useIngredientStore } from "../stores/ingredients";
import { ingredientsTableHeaders } from "../models/ingredients";

const searchField = ref("");
const searchValue = ref("");
const ingredientStore = useIngredientStore();
</script>

<style lang="scss">
.buttons-pagination .item.button.active {
  background-color: #5893c0 !important;
}

.easy-data-table__rows-selector ul.select-items li.selected {
  background-color: #5893c0 !important;
}
.vue3-easy-data-table__message {
  --easy-table-message-font-color: white;
}
</style>
