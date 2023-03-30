<template>
  <div class="text-white">
    <template v-if="!recipeStore.isLoading">
      <div class="container mt-4">
        <div v-for="recipe in recipeStore.recipes" class="bg-light rounded-1 my-2 p-3">
          <h2 class="my-0">
            {{ recipe.name }}
          </h2>

          <p>
            {{ recipe.description }}
          </p>

          {{ recipe.difficulty }}/5 difficulty
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRecipeStore } from '../../stores/recipes';

const recipeStore = useRecipeStore();

onMounted(() => {
  recipeStore.getRecipes();
});
</script>

<style lang="scss"></style>
