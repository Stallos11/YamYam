<template>
  <ax-form class="d-flex fx-col px-5">
    <p class="text-grey">Search by</p>
    <div>
      <ax-form-field label="Query">
        <ax-form-control tag="input" v-model="queryValue" type="text"></ax-form-control>
      </ax-form-field>
    </div>
  </ax-form>
</template>
<script setup lang="ts">
import { ingredientsQueryKeyOptions } from "../models/ingredients";
import { ref, watch } from "vue";
import { useIngredientStore } from "../stores/ingredients";

const queryField = ref("");
const queryValue = ref("");
const ingredientStore = useIngredientStore();

watch(queryValue, (first: string, second: string) => {
  if (first.length > 2) {
    ingredientStore.searchIngredientBy(queryField.value, queryValue.value);
  }
});
</script>
