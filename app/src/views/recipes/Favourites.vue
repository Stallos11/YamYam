<template>
  <div class="container mt-4">
    <div class="d-flex vcenter">
      <div class="fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"></div>
      <h2 class="font-w400 text-center m-3 font-s5">Favoris</h2>
      <div class="fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"></div>
    </div>
    <template v-if="recipeStore.favourites?.length">
      <RecipeCard v-for="recipe in recipes" :recipe="recipe" />
    </template>
    <div v-else class="h100 d-flex fx-col vcenter fx-center">
      <img class="responsive-media p-3" src="../../assets/donut.svg" alt="">
      <p>Pas de recette favorite</p>
      <ax-btn :to="'/feed'" tag="router-link" class="primary rounded-2 py-1 px-4">Voir les recettes</ax-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRecipeStore } from '../../stores/recipes';
import RecipeCard from '../../components/RecipeCard.vue';

const recipeStore = useRecipeStore();

const recipes = computed(() => {
  return recipeStore.recipes.filter(r => recipeStore.favourites?.some(fav => r.id === fav.recipe_id))
})

onMounted(async () => {
  await recipeStore.getRecipes();
  await recipeStore.getFavourites();
});
</script>
