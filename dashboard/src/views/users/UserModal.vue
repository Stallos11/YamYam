<template>
  <ax-modal
    class="bg-dark rounded-1 shadow-1 h100"
    v-model="userStore.isModalOpened"
  >
    <template #header>
      <div class="grix x1 sm2 vcenter">
        <div class="">
          <p class="my-0 text-primary">
            {{ userStore.selectedUser.user.firstname }}
            <Icon
              @click="userStore.copyUserKey('firstname')"
              class="ml-auto cursor-pointer font-s2"
              icon="material-symbols:content-copy-outline-sharp"
              size="50"
            ></Icon>
          </p>
          <p
            @click="userStore.copyUserKey('email')"
            class="font-s2 my-0 cursor-pointer"
          >
            {{ userStore.selectedUser.user.email }}
          </p>
        </div>
        <div class="ml-auto font-s5">
          <Icon
            @click="userStore.delete()"
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
    <div>
      <p class="font-s4 mb-2">Recettes</p>
      <div class="divider white"></div>
      <div
        v-if="userStore.selectedUser.recipes?.length"
        class="grix xs1 sm2 p-3 gutter-xs5"
      >
        <div
          v-for="recipe in userStore.selectedUser.recipes"
          :key="recipe.id"
          class="card shadow-1 fx-row"
        >
          <img class="rounded-3" src="https://picsum.photos/200/100" />
          <div class="d-flex fx-col fx-grow">
            <div class="card-header">{{ recipe.name }}</div>
            <div class="grix xs2 center">
              <div class="d-flex fx-center vcenter">
                <Icon
                  class="cursor-pointer mr-1"
                  icon="mdi:eye-outline"
                  size="50"
                ></Icon>
                123
              </div>
              <div>
                <Icon
                  class="cursor-pointer mr-1"
                  icon="mdi:cards-heart-outline"
                  size="50"
                ></Icon>
                33
              </div>
              <div>
                <Icon
                  class="cursor-pointer mr-1"
                  icon="iconoir:stat-up"
                  size="50"
                ></Icon>
                33
              </div>
              <div>
                <Icon
                  class="cursor-pointer mr-1"
                  icon="material-symbols:ios-share-rounded"
                  size="50"
                ></Icon>
                76
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="my-2" v-else>No recipes found ...</div>
    </div>
  </ax-modal>
</template>

<script setup lang="ts">
import { useUserStore } from "../../stores/user";
const userStore = useUserStore();
</script>
