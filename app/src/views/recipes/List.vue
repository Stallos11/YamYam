<template>
  <div class="text-white">
    <template v-if="!recipeStore.isLoading && !categoryStore.isLoading">
      <div class="d-flex p-3" @click="isFiltersCollapsibleOpened = !isFiltersCollapsibleOpened">
        <div class="font-s4">Filters</div>

        <div
          class="d-flex ml-auto"
          :style="isFiltersCollapsibleOpened ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)'"
          style="transition: transform 0.5s ease"
        >
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
        <div v-for="recipe in recipeStore.recipes" class="bg-light rounded-1 my-2 p-3">
          <h2 class="my-0">
            {{ recipe.name }}
          </h2>

          <p>
            {{ recipe.description }}
          </p>

          <div class="d-flex fx-col">
            <div class="d-flex vcenter">
              <Icon icon="ic:baseline-access-time" width="20" class="mr-2" />
              {{ Math.floor((recipe.preparation_time as number) / 60) % 60 }}min
            </div>

            <div class="d-flex vcenter mt-2">
              <Icon icon="icon-park-outline:cook" width="20" class="mr-2" />
              {{ Math.floor((recipe.cooking_time as number) / 60) % 60 }}min
            </div>

            <div class="d-flex vcenter mt-3">
              <Icon v-for="difficulty in +(recipe.difficulty as number)" icon="ph:fork-knife-light" width="20" class="mr-2 text-primary" />
              <Icon v-for="dif in 5 - +(recipe.difficulty as number)" icon="ph:fork-knife-light" width="20" class="mr-2 text-grey" />

              <div class="d-flex vcenter ml-auto"><Icon icon="mdi:user" width="20" class="mr-2" /> {{ recipe.eaters_amount }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRecipeStore } from '../../stores/recipes';
import { useTypeStore } from '../../stores/type';
import { useCategoryStore } from '../../stores/category';

const recipeStore = useRecipeStore();
const typeStore = useTypeStore();
const categoryStore = useCategoryStore();

const isFiltersCollapsibleOpened = ref(false);
const selectedCategory = ref('');

const categories = computed(() => {
  return categoryStore.categories?.map((c) => c.category);
});

onMounted(() => {
  recipeStore.getRecipes();
  typeStore.getTypes();
  categoryStore.getCategories();
});
</script>

<style lang="scss">
@import 'axentix';

.form-field label:not(.form-switch) {
  background-color: #323232 !important;
}
</style>
