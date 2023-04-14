<template>
  <RecipeTypeDeleteModal />
  <ax-modal class="bg-dark rounded-1 shadow-1 h100" v-model="recipeTypeStore.isModalOpened">
    <template #header>
      <div class="grix x1 sm2 vcenter">
        <div class="">
          <p class="my-0 text-primary">
            {{ recipeTypeStore.selectedRecipeType.type }}
            <Icon @click="recipeTypeStore.copyRecipeTypeKey('firstname')" class="ml-auto cursor-pointer font-s2"
              icon="material-symbols:content-copy-outline-sharp" size="50"></Icon>
          </p>
        </div>
        <div class="ml-auto font-s5">
          <Icon @click="recipeTypeStore.redirEdit()" class="ml-auto mr-2 cursor-pointer" icon="ri:ball-pen-fill"
            size="100"></Icon>
          <Icon @click="recipeTypeStore.showDeleteModal()" class="ml-auto cursor-pointer" icon="mdi:trash-can-circle"
            size="100"></Icon>
        </div>
      </div>
      <div class="divider white my-3"></div>
    </template>
    <div>
      <div class="grix xs1 sm2 md3 p-3 gutter-xs5">
        <div class="d-flex fx-row primary rounded-2 p-3">
          <div>Nbr de recettes</div>
          <div class="ml-auto">{{ recipeTypeStore.selectedRecipeType.usedBy }}</div>
        </div>

      </div>
    </div>
  </ax-modal>
</template>

<script setup lang="ts">
import RecipeTypeDeleteModal from "./RecipeTypeDeleteModal.vue";
import { useRecipeTypeStore } from "../../stores/recipeTypes";
const recipeTypeStore = useRecipeTypeStore();
</script>
