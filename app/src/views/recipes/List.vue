<template>
  <div class="d-flex vcenter mt-4 px-3">
    <div class="fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"></div>
    <h2 class="font-w400 text-center m-3 font-s5">YamYam</h2>
    <div class="fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"></div>
  </div>
  <div class="text-white">
    <div class="d-flex p-3 px-5" @click="isFiltersCollapsibleOpened = !isFiltersCollapsibleOpened">
      <div class="font-s4">Filtres</div>
      <div class="d-flex ml-auto"
        :style="isFiltersCollapsibleOpened ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)'"
        style="transition: transform 0.5s ease">
        <Icon icon="material-symbols:keyboard-arrow-down-rounded" width="30" />
      </div>
    </div>

    <ax-collapsible class="px-5" v-model="isFiltersCollapsibleOpened">
      <ax-form-field label="Chercher">
        <ax-form-control tag="input" v-model="searchValue" type="text"></ax-form-control>
      </ax-form-field>

      <ax-form class="d-flex">
        <ax-form-field label="Catégorie">
          <ax-form-select :items="categories" v-model="selectedCategory"></ax-form-select>
        </ax-form-field>
      </ax-form>

      <ax-form class="d-flex">
        <ax-form-field label="Type">
          <ax-form-select :items="types" v-model="selectedType"></ax-form-select>
        </ax-form-field>
      </ax-form>

      <ax-form class="d-flex">
        <ax-form-field label="Ordre">
          <ax-form-select :items="orderTypes" v-model="selectedOrder"></ax-form-select>
        </ax-form-field>
      </ax-form>
    </ax-collapsible>

    <div class="container mt-4">
      <RecipeCard v-for="recipe in fileteredRecipes" :recipe="recipe" />
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
const selectedCategory = ref('Tout');
const selectedType = ref('Tout');
const selectedOrder = ref('Date');
const searchValue = ref('');

const categories = computed(() => {
  return ['Tout', ...(categoryStore.categories?.map((c) => c.category) as [])];
});

const types = computed(() => {
  return ['Tout', ...(typeStore.types?.map((t) => t.type) as [])];
});

const orderTypes = ['Date', 'Alphabétique', 'Plus aimé', 'Difficulté']

const fileteredRecipes = computed(() => {
  let recipes = recipeStore.recipes;

  if (searchValue.value.length) {
    recipes = recipes.filter(r => r.name.toLowerCase().includes(searchValue.value.toLowerCase()))
  }

  if (selectedCategory.value.length && selectedCategory.value != 'Tout') {
    //@ts-ignore
    recipes = recipes.filter(r => r.recipeCategory.category == selectedCategory.value)
  }

  if (selectedType.value.length && selectedType.value != 'Tout') {

    //@ts-ignore
    recipes = recipes.filter(r => r.recipeType.type == selectedType.value)
  }

  switch (selectedOrder.value) {
    case 'Date':
      // @ts-ignore
      return recipes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    case 'Alphabétique':
      // @ts-ignore
      return recipes.sort((a, b) => a.name.localeCompare(b.name))
    case 'Plus aimé':
      // @ts-ignore
      return recipes.sort((a, b) => b.favourites.length - a.favourites.length)
    case 'Difficulté':
      // @ts-ignore
      return recipes.sort((a, b) => +a.difficulty - +b.difficulty)
  }

  return recipes
})

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
