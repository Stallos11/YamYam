<template>
  <IngredientDeleteModal />
  <ax-modal
    class="bg-dark rounded-1 shadow-1 h100"
    v-model="ingredientStore.isModalOpened"
  >
    <template #header>
      <div class="d-flex fx-row vcenter">
        <div>
          <img
            :src="
              ingredientStore.selectedIngredient?.openfoodfact
                ?.image_front_thumb_url
            "
          />
        </div>
        <p class="my-0 ml-3 text-primary">
          {{ ingredientStore.selectedIngredient.product_name }}
          <Icon
            @click="ingredientStore.copyIngredientKey('product_name')"
            class="ml-auto cursor-pointer font-s2"
            icon="material-symbols:content-copy-outline-sharp"
            size="50"
          ></Icon>
        </p>
        <div class="ml-auto font-s5">
          <Icon
            @click="ingredientStore.redirEdit()"
            class="ml-auto mr-2 cursor-pointer"
            icon="ri:ball-pen-fill"
            size="100"
          ></Icon>
          <Icon
            @click="ingredientStore.showDeleteModal()"
            class="ml-auto cursor-pointer"
            icon="mdi:trash-can-circle"
            size="100"
          ></Icon>
        </div>
      </div>
      <div class="divider white my-3"></div>
    </template>
    <div>
      <div class="grix xs1 sm2 md3 center">
        <a
          class="btn primary rounded-3 px-5 py-2"
          target="_blank"
          :href="`https://fr.openfoodfacts.org/produit/${ingredientStore.selectedIngredient.openfoodfact_id}`"
          >OPEN FOOD FACT</a
        >
        <a
          class="btn primary rounded-3 px-5 py-2"
          target="_blank"
          :href="`https://world.openfoodfacts.org/api/v0/product/${ingredientStore.selectedIngredient.openfoodfact_id}.json`"
          >OPEN FOOD FACT JSON</a
        >
        <a
          class="btn primary rounded-3 px-5 py-2"
          target="_blank"
          :href="`https://fr.openfoodfacts.org/produit/${ingredientStore.selectedIngredient.openfoodfact_id}`"
          >OPEN FOOD FACT</a
        >
      </div>
    </div>
  </ax-modal>
</template>

<script setup lang="ts">
import IngredientDeleteModal from "./IngredientDeleteModal.vue";
import { useIngredientStore } from "../../stores/ingredients";
const ingredientStore = useIngredientStore();
</script>
