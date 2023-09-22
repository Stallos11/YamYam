<template>
    <div class="container mt-4">
        <div class="d-flex vcenter">
            <div class="fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"></div>
            <h2 class="font-w400 text-center m-3 font-s5">Mes recettes</h2>
            <div class="fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"></div>
        </div>
        <template v-if="recipeStore.userRecipes?.length">
            <RecipeCard v-for="recipe in recipeStore.userRecipes" :recipe="recipe" />
        </template>
        <div v-else class="h100 d-flex fx-col vcenter fx-center">
            <img class="responsive-media p-3" src="../../assets/donut.svg" alt="">
            <p>Pas de recette</p>
            <ax-btn :to="'/feed'" tag="router-link" class="primary rounded-2 py-1 px-4">Voir les recettes</ax-btn>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue';
import { useRecipeStore } from '../../stores/recipes';
import RecipeCard from '../../components/RecipeCard.vue';

const recipeStore = useRecipeStore();


onMounted(async () => {
    await recipeStore.getFavourites();
    await recipeStore.getUserRecipes();
});
</script>
  