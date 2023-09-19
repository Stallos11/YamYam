<template>
  <div class="d-flex vcenter mt-4 px-3">
    <div class="fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"></div>
    <h2 class="font-w400 text-center m-3 font-s5">Feed</h2>
    <div class="fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"></div>
  </div>
  <div class="text-white">
    <div class="d-flex p-3" @click="isFiltersCollapsibleOpened = !isFiltersCollapsibleOpened">
      <div class="font-s4">Filters</div>
      <div class="d-flex ml-auto"
        :style="isFiltersCollapsibleOpened ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)'"
        style="transition: transform 0.5s ease">
        <Icon icon="material-symbols:keyboard-arrow-down-rounded" width="30" />
      </div>
    </div>

    <ax-collapsible v-model="isFiltersCollapsibleOpened">
      <ax-form class="d-flex container">
        <ax-form-field label="Category">
          <ax-form-select :items="categories" v-model="selectedCategory"></ax-form-select>
        </ax-form-field>
      </ax-form>
    </ax-collapsible>

    <div class="container mt-4">
      <RecipeCard v-for="recipe in recipeStore.recipes" :recipe="recipe" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRecipeStore } from '../../stores/recipes';
import { useTypeStore } from '../../stores/type';
import { useCategoryStore } from '../../stores/category';
import RecipeCard from '../../components/RecipeCard.vue';

const recipeStore = useRecipeStore();
const typeStore = useTypeStore();
const categoryStore = useCategoryStore();

const isFiltersCollapsibleOpened = ref(false);
const selectedCategory = ref('');

const categories = computed(() => {
  return categoryStore.categories?.map((c) => c.category);
});

onMounted(async () => {
  await recipeStore.getFavourites();
  await recipeStore.getRecipes();
  await typeStore.getTypes();
  await categoryStore.getCategories();
});
</script>

<style lang="scss" scoped>
@import 'axentix';

.form-field label:not(.form-switch) {
  background-color: #323232 !important;
}
</style>
