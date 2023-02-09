<template>
  <div class="h100 d-flex fx-center vcenter fx-col">
    <p class="mb-5 font-s3 text-primary">NEW RECIPE TYPE</p>
    <ax-form>
      <ax-form-field label="Name">
        <ax-form-control
          tag="input"
          v-model="recipe_type"
          type="text"
        ></ax-form-control>
      </ax-form-field>
    </ax-form>
    <ax-btn
      @click="recipeTypeStore.insert(recipe_type)"
      class="btn mx-auto d-block px-5 py-1 primary rounded-3 mt-5"
      >INSERT</ax-btn
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRecipeTypeStore } from "../../stores/recipeTypes";
const recipeTypeStore = useRecipeTypeStore();
const recipe_type = ref("");
</script>
