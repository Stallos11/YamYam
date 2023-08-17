<template>
  <ax-form class="d-flex fx-col px-5">
    <h4>Ajouter des ingrédients</h4>

    <div>
      <ax-form-field label="Nom de l'ingrédient">
        <ax-form-control tag="input" v-model="queryValue" type="text"></ax-form-control>
      </ax-form-field>
    </div>
  </ax-form>
</template>
<script setup lang="ts">
import { ingredientsQueryKeyOptions } from '../models/ingredients';
import { ref, watch } from 'vue';
import { useIngredientStore } from '../stores/ingredients';

const queryField = ref('');
const queryValue = ref('');
const ingredientStore = useIngredientStore();

watch(queryValue, (first: string, second: string) => {
  if (first.length > 2) {
    ingredientStore.searchIngredientBy(ingredientsQueryKeyOptions[0], queryValue.value);
  }
});
</script>
