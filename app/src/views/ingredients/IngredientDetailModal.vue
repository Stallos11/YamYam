<template>
  <ax-modal class="bg-dark rounded-1 shadow-1 h100" v-model="ingredientStore.isModalDetailOpened">
    <template #header>
      <div class="d-flex fx-col vcenter">
        <p class="my-0 ml-3 text-white font-s3">
          {{ ingredientStore.selectedIngredient.product_name }}
        </p>
        <div class="grix xs2 gutter-xs2 py-4">
          <a class="btn secondary py-1 px-3 rounded-2 font-s2"
            :href="`https://fr.openfoodfacts.org/produit/${ingredientStore.selectedIngredient.openfoodfact_id}`"
            target="_blank">
            DETAILS
          </a>
          <ax-btn
            v-if="props.type == 'create' && recipeStore.recipeCreate.ingredients.find(ingr => ingr.id == ingredientStore.selectedIngredient.id) == null"
            @click="recipeStore.addIngredientToCreateRecipe()" class="primary font-s2 px-3 py-1 rounded-2">ADD</ax-btn>

            <ax-btn
            v-if="props.type == 'edit' && recipeStore.recipeEdit.ingredients.find(ingr => ingr.id == ingredientStore.selectedIngredient.id) == null"
            @click="recipeStore.addIngredientToEditRecipe()" class="primary font-s2 px-3 py-1 rounded-2">ADD</ax-btn>
        </div>
        <!-- <div class="ml-auto font-s5">
            <Icon
              v-if="props.type != 'edit' && recipeStore.recipeCreate.ingredients.find(ingr => ingr.id == ingredientStore.selectedIngredient.id) == null"
              @click="recipeStore.addIngredientToCreateRecipe()" class="ml-auto mr-2 cursor-pointer"
              icon="gridicons:add-outline" size="100"></Icon>
            <Icon v-if="props.type === 'edit'" @click="recipeStore.addIngredientToEditRecipe()"
            class="ml-auto mr-2 cursor-pointer" icon="gridicons:add-outline" size="100"></Icon>
          </div> -->
        <img style="max-height:30vh" class="responsive-media" :src="ingredientStore.selectedIngredient.img" />
      </div>
      <div class="divider white my-3"></div>
    </template>
    <p class="text-center">Nutriments / 100g</p>
    <div class="d-flex fx-col px-3">
      <div class="nutri">
        <span>Energy</span>
        <span>{{ +ingredientStore.selectedIngredient?.kcal }} kCal</span>
      </div>
      <div class="nutri">
        <span>Fat</span>
        <span>{{ +ingredientStore.selectedIngredient?.fat }} g</span>
      </div>
      <div class="nutri">
        <span>Saturated Fat</span>
        <span>{{ +ingredientStore.selectedIngredient?.saturated_fat }} g</span>
      </div>
      <div class="nutri">
        <span>Carbs</span>
        <span>{{ +ingredientStore.selectedIngredient?.carbohydrates }} g</span>
      </div>
      <div class="nutri">
        <span>Sugars</span>
        <span>{{ +ingredientStore.selectedIngredient?.sugars }} g</span>
      </div>
      <div class="nutri">
        <span>Proteins</span>
        <span>{{ +ingredientStore.selectedIngredient?.proteins }} g</span>
      </div>
      <div class="nutri">
        <span>Salt</span>
        <span>{{ +ingredientStore.selectedIngredient?.salt }} g</span>
      </div>
    </div>
  </ax-modal>
</template>

<script setup lang="ts">
import { useIngredientStore } from "../../stores/ingredients";
import { useRecipeStore } from "../../stores/recipes";
const ingredientStore = useIngredientStore();
const recipeStore = useRecipeStore();

const props = defineProps(['type'])
</script>


<style lang="scss">

.nutri{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
  margin-bottom: 0.5rem;
}

</style>