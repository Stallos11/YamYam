<template>
  <div class="h100 d-flex fx-center vcenter fx-col">
    <p class="mb-5 font-s3 text-primary">NEW INGREDIENT</p>
    <ax-form>
      <ax-form-field label="Product name">
        <ax-form-control
          tag="input"
          v-model="ingredient.product_name"
          type="text"
        ></ax-form-control>
      </ax-form-field>
      <ax-form-field label="OpenFoodFactId">
        <ax-form-control
          tag="input"
          v-model="ingredient.openfoodfact_id"
          type="text"
        ></ax-form-control>
      </ax-form-field>
      <ax-form-field label="Product Name Fr">
        <ax-form-control
          tag="input"
          v-model="ingredient.product_name_fr"
          type="text"
        ></ax-form-control>
      </ax-form-field>
      <ax-form-field label="Product Name En">
        <ax-form-control
          tag="input"
          v-model="ingredient.product_name_en"
          type="text"
        ></ax-form-control>
      </ax-form-field>
      <ax-form-field label="Product Name De">
        <ax-form-control
          tag="input"
          v-model="ingredient.product_name_de"
          type="text"
        ></ax-form-control>
      </ax-form-field>
    </ax-form>
    <ax-btn
      @click="ingredientStore.insert(ingredient)"
      class="btn mx-auto d-block px-5 py-1 primary rounded-3 mt-5"
      >INSERT</ax-btn
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useIngredientStore } from "../../stores/ingredients";
const ingredientStore = useIngredientStore();
const ingredient = ref({
  openfoodfact_id: "",
  product_name: "",
  product_name_fr: "",
  product_name_en: "",
  product_name_de: "",
});
</script>
