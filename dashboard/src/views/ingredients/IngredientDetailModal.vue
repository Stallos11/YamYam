<template>
  <IngredientDeleteModal />
  <ax-modal class="bg-dark rounded-1 shadow-1 h100" v-model="ingredientStore.isModalDetailOpened">
    <template #header>
      <div class="d-flex fx-row vcenter">
        <div>
          <img :src="ingredientStore.selectedIngredient.img
            " />
        </div>
        <!-- mdi:internet -->
        <div>
          <p class="my-0 ml-3 text-white">
            {{ ingredientStore.selectedIngredient.product_name }}
          </p>
          <a :href="`https://fr.openfoodfacts.org/produit/${ingredientStore.selectedIngredient.openfoodfact_id}`"
            target="_blank">
            <Icon class="cursor-pointer ml-3 mt-3" icon="mdi:internet" size="50" />
          </a>
          <a :href="`https://world.openfoodfacts.org/api/v0/product/${ingredientStore.selectedIngredient.openfoodfact_id}.json`"
            target="_blank">
            <Icon class="cursor-pointer ml-3 mt-3" icon="carbon:json" size="50" />
          </a>
        </div>
        <div class="ml-auto font-s5">
          <Icon
            @click="props.type === 'edit' ? recipeStore.addIngredientToEditRecipe() : recipeStore.addIngredientToCreateRecipe()"
            class="ml-auto mr-2 cursor-pointer" icon="gridicons:add-outline" size="100"></Icon>
        </div>
      </div>
      <div class="divider white my-3"></div>
    </template>
    <div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Kcal</th>
              <th>Fat</th>
              <th>Saturated Fat</th>
              <th>Carbs</th>
              <th>Sugars</th>
              <th>Proteins</th>
              <th>Proteins</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="ingredientStore.selectedIngredient?.id">
              <td>{{ +ingredientStore.selectedIngredient?.kcal }}</td>
              <td>{{ +ingredientStore.selectedIngredient?.fat }}</td>
              <td>{{ +ingredientStore.selectedIngredient?.saturated_fat }}</td>
              <td>{{ +ingredientStore.selectedIngredient?.carbohydrates }}</td>
              <td>{{ +ingredientStore.selectedIngredient?.sugars }}</td>
              <td>{{ +ingredientStore.selectedIngredient?.proteins }}</td>
              <td>{{ +ingredientStore.selectedIngredient?.salt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </ax-modal>
</template>

<script setup lang="ts">
import IngredientDeleteModal from "./IngredientDeleteModal.vue";
import { useIngredientStore } from "../../stores/ingredients";
import { useRecipeStore } from "../../stores/recipes";
const ingredientStore = useIngredientStore();
const recipeStore = useRecipeStore();

const props = defineProps(['type'])
</script>
