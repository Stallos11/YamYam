<template>
  <div class="container mt-4">
    <div v-for="recipe in recipeStore.favourites" class="recipe-card relative-pos grey light-4 light-shadow-2 rounded-1 my-2 mx-3">
      <ax-btn class="like-btn d-flex vcenter fx-center absolute-pos transparent text-white" size="" circle>
        <Icon icon="ri:heart-add-line" width="30" />
      </ax-btn>

      <h2 class="font-w400 font-s4 mt-2 ml-1 text-white">
        {{ recipe.name }}
      </h2>
      <div
        class="rounded-tl1 rounded-tr1 rounded-bl3 rounded-br3 shadow-3"
        style="min-height: 12rem; background-size: cover; background-position: center"
        :style="`background-image: url('data:image/png;base64, ${recipe.image}')`"
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

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRecipeStore } from '../../stores/recipes';

const recipeStore = useRecipeStore();

onMounted(() => {
  recipeStore.getFavourites();
});
</script>
