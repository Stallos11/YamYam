<template>
  <RecipeDeleteModal />
  <ax-modal
    class="bg-dark rounded-1 shadow-1 h100"
    v-model="recipeStore.isModalOpened"
  >
    <template #header>
      <div class="grix x1 sm2 vcenter">
        <div class="">
          <p class="my-0 text-primary">
            {{ recipeStore.selectedRecipe.name }}
            <Icon
              @click="recipeStore.copyRecipeKey('name')"
              class="ml-auto cursor-pointer font-s2"
              icon="material-symbols:content-copy-outline-sharp"
              size="50"
            ></Icon>
          </p>
        </div>
        <div class="ml-auto font-s5">
          <Icon
            @click="recipeStore.redirEdit()"
            class="ml-auto mr-2 cursor-pointer"
            icon="ri:ball-pen-fill"
            size="100"
          ></Icon>
          <Icon
            @click="recipeStore.showDeleteModal()"
            class="ml-auto cursor-pointer"
            icon="mdi:trash-can-circle"
            size="100"
          ></Icon>
        </div>
      </div>
      <div class="divider white my-3"></div>
    </template>
    <div>
      <div class="grix xs1 sm2 md3 p-3 gutter-xs5">
        <div class="d-flex fx-row primary rounded-2 p-3">
          <div>Recettes consultées</div>
          <div class="ml-auto">69</div>
        </div>
        <div class="d-flex fx-row primary rounded-2 p-3">
          <div>Recettes crées</div>
          <div class="ml-auto">69</div>
        </div>
        <div class="d-flex fx-row primary rounded-2 p-3">
          <div>Commentaires</div>
          <div class="ml-auto">69</div>
        </div>
      </div>
    </div>
  </ax-modal>
</template>

<script setup lang="ts">
import RecipeDeleteModal from "./RecipeDeleteModal.vue";
import { useRecipeStore } from "../../stores/recipes";
const recipeStore = useRecipeStore();
</script>
