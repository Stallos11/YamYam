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
        <div v-for="recipe in recipeStore.recipes" class="recipe-card relative-pos grey light-4 light-shadow-2 rounded-1 my-2">
          <ax-btn class="like-btn d-flex vcenter fx-center absolute-pos transparent text-white" size="" circle>
            <Icon icon="ri:heart-add-line" width="30" />
          </ax-btn>

          <h2 class="font-w400 font-s4 mt-2 ml-1 text-white">
            {{ recipe.name }}
          </h2>

          <div
            class="rounded-tl1 rounded-tr1 rounded-bl4 rounded-br4"
            style="
              min-height: 15rem;
              background-size: cover;
              background-image: linear-gradient(0deg, rgba(150, 150, 150, 0) 0%, rgba(0, 0, 0, 1) 100%),
                url(https://www.invaluable.com/blog/wp-content/uploads/sites/77/2018/10/02-creative-color.png);
            "
          ></div>

          <div class="p-3">
            <div class="grix xs3 center">
              <div class="d-flex vcenter">
                <Icon icon="ic:baseline-access-time" width="20" class="mr-2" />
                {{ Math.floor((recipe.preparation_time as number) / 60) % 60 }}min
              </div>

              <div class="d-flex vcenter">
                <Icon icon="icon-park-outline:cook" width="20" class="mr-2" />
                {{ Math.floor((recipe.cooking_time as number) / 60) % 60 }}min
              </div>

              <div class="d-flex vcenter">
                <Icon icon="mdi:cards-heart-outline" width="20" class="mr-2" />
                69
              </div>
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

<style lang="scss" scoped>
@import 'axentix';

.form-field label:not(.form-switch) {
  background-color: #323232 !important;
}

h2 {
  position: absolute;
  left: 10px;
  top: 10px;
}

.like-btn {
  right: 10px;
  top: 10px;
}
</style>
