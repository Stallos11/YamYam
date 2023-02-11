<template>
  <div class="h100 d-flex fx-center vcenter fx-col">
    <p class="mb-5 font-s3 text-primary">
      {{ ingredientStore.selectedIngredient.id }}
    </p>
    <ax-form>
      <ax-form-field label="Product name">
        <ax-form-control
          tag="input"
          v-model="ingredientStore.selectedIngredient.product_name"
          type="text"
        ></ax-form-control>
      </ax-form-field>
      <ax-form-field label="OpenFoodFactId">
        <ax-form-control
          tag="input"
          v-model="ingredientStore.selectedIngredient.openfoodfact_id"
          type="text"
        ></ax-form-control>
      </ax-form-field>
      <ax-form-field label="Product Name Fr">
        <ax-form-control
          tag="input"
          v-model="ingredientStore.selectedIngredient.product_name_fr"
          type="text"
        ></ax-form-control>
      </ax-form-field>
      <ax-form-field label="Product Name En">
        <ax-form-control
          tag="input"
          v-model="ingredientStore.selectedIngredient.product_name_en"
          type="text"
        ></ax-form-control>
      </ax-form-field>
      <ax-form-field label="Product Name De">
        <ax-form-control
          tag="input"
          v-model="ingredientStore.selectedIngredient.product_name_de"
          type="text"
        ></ax-form-control>
      </ax-form-field>
    </ax-form>
    <ax-btn
      @click="ingredientStore.update()"
      class="btn mx-auto d-block px-5 py-1 primary rounded-3 mt-5"
      >UPDATE</ax-btn
    >
  </div>
</template>

<script setup lang="ts">
import { useIngredientStore } from "../../stores/ingredients";
const ingredientStore = useIngredientStore();
</script>
