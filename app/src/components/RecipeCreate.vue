<template>
  <ax-tab v-model="currentTab" class="shadow-1 h100 px-5 pt-2">
    <template #menu>
      <ax-tab-link href="#tab1">General</ax-tab-link>
      <ax-tab-link href="#tab2">Ingredients</ax-tab-link>
      <ax-tab-link href="#tab3">Instructions</ax-tab-link>
      <ax-tab-link href="#tab4">Preview</ax-tab-link>
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
    <ax-tab-item class="h100" id="tab4">
      <PreviewTab @switch-tab="switchTab" />
    </ax-tab-item>

    <IngredientDetailModal type="create" />
  </ax-tab>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IngredientDetailModal from "../views/ingredients/IngredientDetailModal.vue";
import GeneralTab from "./RecipeCreate/GeneralTab.vue";
import IngredientTab from "./RecipeCreate/IngredientTab.vue";
import PreparationTab from "./RecipeCreate/PreparationTab.vue";
import PreviewTab from "./RecipeCreate/PreviewTab.vue";

const currentTab = ref();

const switchTab = (tab: string) => {
  currentTab.value = tab;
}

</script>

<style lang="scss">
.tab-left {
  // display: flex;
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

.tab-img {
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 100%), url('../assets/img/verres.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50vw;
}

// .form-field .form-control {
//   width: 25vw;

//   &:focus {
//     border: none !important;
//   }
// }
</style>
