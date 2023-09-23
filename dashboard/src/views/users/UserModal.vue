<template>
  <UserDeleteModal />
  <ax-modal class="bg-dark rounded-1 shadow-1 h100" v-model="userStore.isModalOpened">
    <template #header>
      <div class="grix x1 sm2 vcenter">
        <div class="">
          <p class="my-0 text-primary">
            {{ userStore.selectedUser.user.firstname }}
            <Icon @click="userStore.copyUserKey('firstname')" class="ml-auto cursor-pointer font-s2"
              icon="material-symbols:content-copy-outline-sharp" size="50"></Icon>
          </p>
          <p @click="userStore.copyUserKey('email')" class="font-s2 my-0 cursor-pointer">
            {{ userStore.selectedUser.user.email }}
          </p>
        </div>
        <div class="ml-auto font-s5">
          <Icon @click="userStore.redirEdit()" class="ml-auto mr-2 cursor-pointer" icon="ri:ball-pen-fill" size="100">
          </Icon>
          <Icon @click="userStore.showDeleteModal()" class="ml-auto cursor-pointer" icon="mdi:trash-can-circle"
            size="100"></Icon>
        </div>
      </div>
      <div class="divider white my-3"></div>
    </template>
    <div>
      <div class="grix xs1 sm2 md3 p-3 gutter-xs5">
        <div class="d-flex fx-row primary rounded-2 p-3">
          <div>Recettes créées</div>
          <div class="ml-auto">{{ userStore.selectedUser.recipes?.length }}</div>
        </div>
        <div class="d-flex fx-row primary rounded-2 p-3">
          <div>Recettes aimées</div>
          <div class="ml-auto">{{ userStore.selectedUser.favourites.length }}</div>
        </div>
      </div>
    </div>
    <div>
      <p class="font-s4 mb-2">Recettes</p>
      <div class="divider white"></div>
      <div v-if="userStore.selectedUser.recipes?.length" class="grix xs1 lg2 p-3 gutter-xs5">
        <div v-for="recipe in userStore.selectedUser.recipes" :key="recipe.id" @click="recipeStore.showDetails(recipe.id)"
          class="card recipe-card rounded-2 shadow-1 fx-row"
          style="min-height: 12rem; background-size: cover; background-position: center;"
          :style="`background-image: url('data:image/png;base64, ${recipe.image}')`">
          <div class="d-flex fx-col fx-grow">
            <div class="card-header">{{ recipe.name }}</div>
          </div>
        </div>
      </div>
      <div class="my-2" v-else>No recipes found ...</div>
    </div>
  </ax-modal>
</template>

<script setup lang="ts">
import { useRecipeStore } from "../../stores/recipes";
import { useUserStore } from "../../stores/user";
import UserDeleteModal from "./UserDeleteModal.vue";
const userStore = useUserStore();
const recipeStore = useRecipeStore();
</script>

<style lang="scss" scoped>
.recipe-card {
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.95) 100%);
  }
}

.card-header{
  z-index: 200;
}
</style>