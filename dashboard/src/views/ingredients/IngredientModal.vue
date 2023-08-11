<template>
  <IngredientDeleteModal />
  <ax-modal class="bg-dark rounded-1 shadow-1 h100" v-model="ingredientStore.isModalOpened">
    <template #header>
      <div class="d-flex fx-row vcenter">
        <div>
          <img :src="
            ingredientStore.selectedIngredient?.openfoodfact
              ?.image_front_thumb_url
          " />
        </div>
        <!-- mdi:internet -->
        <div>
          <p class="my-0 ml-3 text-white">
            {{ ingredientStore.selectedIngredient.product_name }}
          </p>
          <a :href="`https://fr.openfoodfacts.org/produit/${ingredientStore.selectedIngredient.openfoodfact_id}`"
            target="_blank">
            <Icon class="cursor-pointer ml-3 mt-3" icon="mdi:internet" size="50" />
          </a>
          <a :href="`https://world.openfoodfacts.org/api/v0/product/${ingredientStore.selectedIngredient.openfoodfact_id}.json`"
            target="_blank">
            <Icon class="cursor-pointer ml-3 mt-3" icon="carbon:json" size="50" />
          </a>
        </div>
        <div class="ml-auto font-s5">
          <Icon @click="ingredientStore.redirEdit()" class="ml-auto mr-2 cursor-pointer" icon="ri:ball-pen-fill"
            size="100"></Icon>
          <Icon @click="ingredientStore.showDeleteModal()" class="ml-auto cursor-pointer" icon="mdi:trash-can-circle"
            size="100"></Icon>
        </div>
      </div>
      <div class="divider white my-3"></div>
    </template>
    <div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Kcal</th>
              <th>Fat</th>
              <th>Carbs</th>
              <th>Proteins</th>
              <th>Fiber</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="ingredientStore.selectedIngredient.id">
              <td>{{ +ingredientStore.selectedIngredient.openfoodfact.nutriments['energy-kcal'].toFixed(2) }}</td>
              <td>{{ +ingredientStore.selectedIngredient.openfoodfact.nutriments.fat.toFixed(2) }}</td>
              <td>{{ +ingredientStore.selectedIngredient.openfoodfact.nutriments.carbohydrates.toFixed(2) }}</td>
              <td>{{ +ingredientStore.selectedIngredient.openfoodfact.nutriments.proteins.toFixed(2) }}</td>
              <td>{{ +ingredientStore.selectedIngredient.openfoodfact.nutriments.fiber.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </ax-modal>
</template>

<script setup lang="ts">
import IngredientDeleteModal from "./IngredientDeleteModal.vue";
import { useIngredientStore } from "../../stores/ingredients";
import { onMounted, ref } from "vue";
import axios from "axios";
const ingredientStore = useIngredientStore();

const nutriments = ref({})
onMounted(() => {

}
)
</script>
