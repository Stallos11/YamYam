<template>
  <ax-tab v-model="currentTab" class="shadow-1 h100 px-5 pt-2">
    <template #menu>
      <ax-tab-link href="#tab1">Général</ax-tab-link>
      <ax-tab-link href="#tab2">Ingrédients</ax-tab-link>
      <ax-tab-link href="#tab3">Instructions</ax-tab-link>
      <ax-tab-link href="#tab4">Aperçu</ax-tab-link>
    </template>

    <ax-tab-item class="h100 pt-5" id="tab1">
      <GeneralTab />
    </ax-tab-item>
    <ax-tab-item class="h100 pt-5" id="tab2">
      <IngredientTab />
    </ax-tab-item>
    <ax-tab-item class="h100 pt-5" id="tab3">
      <PreparationTab />
    </ax-tab-item>
    <ax-tab-item class="h100 pt-5" id="tab4">
      <PreviewTab @switch-tab="switchTab" />
    </ax-tab-item>

    <IngredientDetailModal type="edit" />
  </ax-tab>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import IngredientDetailModal from "../views/ingredients/IngredientDetailModal.vue";
import GeneralTab from "./RecipeEdit/GeneralTab.vue";
import IngredientTab from "./RecipeEdit/IngredientTab.vue";
import PreparationTab from "./RecipeEdit/PreparationTab.vue";
import PreviewTab from "./RecipeEdit/PreviewTab.vue";
import { useRecipeStore } from '../stores/recipes';
import { useRoute } from 'vue-router';

const currentTab = ref();
const recipeStore = useRecipeStore();
const route = useRoute();
const switchTab = (tab: string) => {
  currentTab.value = tab;
}

onBeforeMount(async () => {
  if (!recipeStore.recipeEdit.id) await recipeStore.editRecipe(route.params.id as string);
})
</script>

<style lang="scss">
.tab-left {
  width: 50vw;

  @media screen and (max-width: 969px) {
    width: 100vw;
    background-image: linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70) 100%), url('../assets/img/bg-mobile.png'), ;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

.form-field {
  &.striped {
    label:not(.form-switch) {
      background-color: #5893c0;
    }
  }
}
</style>
