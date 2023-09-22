<template>
  <ax-form class="d-flex fx-col">
    <div class="grix xs1 sm2">
      <div>
        <ax-form-field label="Recherche">
          <ax-form-control
            tag="input"
            v-model="queryValue"
            type="text"
          ></ax-form-control>
        </ax-form-field>
      </div>
    </div>
  </ax-form>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useIngredientStore } from "../stores/ingredients";

const queryField = ref("product_name");
const queryValue = ref("");
const ingredientStore = useIngredientStore();

watch(queryValue, (first: string, second: string) => {
  if (first.length > 2) {
    ingredientStore.searchIngredientBy(queryField.value, queryValue.value);
  }
});
</script>
