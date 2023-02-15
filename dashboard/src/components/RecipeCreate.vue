<template>
  <ax-tab v-model="currentTab" class="shadow-1 h100">
    <template #menu>
      <ax-tab-link href="#tab1">General</ax-tab-link>
      <ax-tab-link href="#tab2">Ingrédients</ax-tab-link>
      <ax-tab-link href="#tab3">Préparation</ax-tab-link>
      <ax-tab-link href="#tab4">Aperçu</ax-tab-link>
    </template>

    <ax-tab-item class="h100" id="tab1">
      <div class="d-flex h100">
        <div class="tab-left">
          <ax-form class="">
            <div class="grix xs1 md2 gutter-xs5 p-5">
              <ax-form-field class="col-md2 col-xs1" label="Recipe name">
                <ax-form-control
                  tag="input"
                  v-model="recipeStore.recipeCreate.recipe.name"
                  type="text"
                  class="mb-5"
                ></ax-form-control>
              </ax-form-field>
              <ax-form-field class="col-md2 col-xs1" label="Description">
                <ax-form-control
                  class="mb-5"
                  v-model="recipeStore.recipeCreate.recipe.description"
                  tag="textarea"
                  >Textarea content</ax-form-control
                >
              </ax-form-field>
              <div>
                <Timepicker
                  :label="'Temps de préparation'"
                  v-model="recipeStore.recipeCreate.recipe.preparationTime"
                  @emit-value="setRecipeProperty('preparationTime', $event)"
                />
              </div>
              <div>
                <Timepicker
                  :label="'Temps de cuisson'"
                  v-model="recipeStore.recipeCreate.recipe.cookingTime"
                  @emit-value="setRecipeProperty('cookingTime', $event)"
                />
              </div>
              <div>
                <ax-form-field label="Dificulty">
                  <ax-form-select
                    :items="difficultyLevels"
                    v-model="recipeStore.recipeCreate.recipe.difficulty"
                  ></ax-form-select>
                </ax-form-field>
              </div>
              <div>
                <ax-form-field label="Eaters amount">
                  <ax-form-control
                    tag="input"
                    v-model="recipeStore.recipeCreate.recipe.eatersAmount"
                    type="number"
                    min="0"
                    class="mb-5"
                  ></ax-form-control>
                </ax-form-field>
              </div>
              <div>
                <ax-form-field label="Catégorie">
                  <ax-form-select
                    :items="categories"
                    v-model="recipeStore.recipeCreate.recipe.recipeCategoryId"
                  ></ax-form-select>
                </ax-form-field>
              </div>
              <div>
                <ax-form-field label="Type">
                  <ax-form-select
                    :items="types"
                    v-model="recipeStore.recipeCreate.recipe.recipeTypeId"
                  ></ax-form-select>
                </ax-form-field>
              </div>
            </div>
          </ax-form>
        </div>
        <div class="tab-img hide-sm-down"></div>
      </div>
    </ax-tab-item>
    <ax-tab-item class="p-3 h100" id="tab2">
      <IngredientSearch />
      <IngredientSearchTable />
      <div class="mt-5 pt-5 mx-5 mt-3 gutter-xs7">
        <div
          v-for="(ingredient, i) in recipeStore.recipeCreate.ingredients"
          :key="ingredient.id"
          class="grix md3 xs1"
          :class="i % 2 == 0 ? 'primary' : ''"
        >
          <p>{{ ingredient.product_name }}</p>
          <ax-form-field :class="i % 2 == 0 ? 'striped' : ''" label="Quantité">
            <ax-form-control
              tag="input"
              v-model="ingredient.quantity"
              type="text"
            ></ax-form-control>
          </ax-form-field>
          <ax-form-field
            :class="i % 2 == 0 ? 'striped' : ''"
            label="Unité de mesure"
          >
            <ax-form-select
              :items="mesureUnits"
              v-model="ingredient.unit"
            ></ax-form-select>
          </ax-form-field>
        </div>
      </div>
    </ax-tab-item>
    <ax-tab-item class="p-3 h100" id="tab3">
      <div class="mt-5 pt-5 mx-5 mt-3 gutter-xs7">
        <ax-form-field label="Titre">
          <ax-form-control
            tag="input"
            v-model="instruction.title"
            type="text"
          ></ax-form-control>
        </ax-form-field>
        <ax-form-field label="Description">
          <ax-form-control
            tag="textarea"
            v-model="instruction.content"
            type="text"
          ></ax-form-control>
        </ax-form-field>
        <ax-btn
          @click="addInstructionToCreateRecipe()"
          class="btn my-5 primary rounded-3 px-5 py-2 text-white d-block mx-auto"
          >AJOUTER</ax-btn
        >
        <div
          v-for="(instruction, i) in recipeStore.recipeCreate.instructions"
          :key="instruction.id"
          class="d-flex fx-col"
        >
          <ax-form-field label="Titre">
            <ax-form-control
              tag="input"
              v-model="instruction.title"
              type="text"
            ></ax-form-control>
          </ax-form-field>
          <ax-form-field label="Description">
            <ax-form-control
              tag="textarea"
              v-model="instruction.content"
              type="text"
            ></ax-form-control>
          </ax-form-field>
        </div>
      </div>
    </ax-tab-item>
    <ax-tab-item class="h100" id="tab4">
      <div class="p-4">
        <p class="font-s5">
          {{ recipeStore.recipeCreate.recipe.name }}
        </p>
        <div class="">
          <ax-btn class="btn primary px-4 py-1 rounded-3 font-s2 mr-3 mb-3">{{
            recipeCategoryStore.recipe_categories.find(
              (rc) => rc.id === recipeStore.recipeCreate.recipe.recipeCategoryId
            )?.category
          }}</ax-btn>
          <ax-btn class="btn tertiary px-4 py-1 rounded-3 font-s2">{{
            recipeTypeStore.recipe_types.find(
              (rc) => rc.id === recipeStore.recipeCreate.recipe.recipeTypeId
            )?.type
          }}</ax-btn>
        </div>
        <div class="grix xs2 md12 gutter-xs5 font-s3 mt-4">
          <div class="d-flex">
            <Icon icon="ic:outline-access-time" class="mr-2"></Icon>
            <span>{{ recipeStore.recipeCreate.recipe.preparationTime }}</span>
          </div>
          <div class="d-flex">
            <Icon icon="icon-park-outline:cook" class="mr-2"></Icon>
            <span>{{ recipeStore.recipeCreate.recipe.cookingTime }}</span>
          </div>
          <div class="d-flex">
            <Icon icon="mdi:flame" class="mr-2"></Icon>
            <span>{{ recipeStore.recipeCreate.recipe.difficulty }}</span>
          </div>
          <div class="d-flex">
            <Icon icon="mdi:users-group" class="mr-2"></Icon>
            <span>{{ recipeStore.recipeCreate.recipe.eatersAmount }}</span>
          </div>
        </div>
        <p class="pb-5">
          {{ recipeStore.recipeCreate.recipe.description }}
        </p>
        <p class="font-s3 mt-5 text-primary">Ingrédients</p>
        <div class="divider white"></div>
        <div
          v-for="ingredient in recipeStore.recipeCreate.ingredients"
          :key="ingredient.id" class="mt-5"
        >
          <p class="mb-0">{{ ingredient.product_name }}</p>
          <p class="mt-0">
            <span>{{ ingredient.quantity }}</span
            ><span>{{ ingredient.unit }}</span>
          </p>
        </div>
        <p class="font-s3 mt-5 text-primary">Instructions</p>
        <div class="divider white"></div>
        <div
          v-for="instruction in recipeStore.recipeCreate.instructions"
          :key="instruction.id" class="mt-5"
        >
          <p class="mb-0 font-s">
            {{ instruction.title }}
          </p>
          <p class="mt-1">
            {{  instruction.content }}
          </p>
        </div>
      </div>
    </ax-tab-item>

    <IngredientDetailModal />
  </ax-tab>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRecipeStore } from "../stores/recipes";
import Timepicker from "../components/Timepicker.vue";
import { useRecipeTypeStore } from "../stores/recipeTypes";
import { useRecipeCategoryStore } from "../stores/recipeCategories";
import IngredientSearch from "./IngredientSearch.vue";
import IngredientSearchTable from "./IngredientSearchTable.vue";
import IngredientDetailModal from "../views/ingredients/IngredientDetailModal.vue";

const recipeStore = useRecipeStore();
const recipeTypeStore = useRecipeTypeStore();
const recipeCategoryStore = useRecipeCategoryStore();
const categories = ref();
const types = ref();
const currentTab = ref(0);
const difficultyLevels = ref([1, 2, 3, 4, 5]);

const instruction = ref({
  title: "",
  content: "",
  order: 0,
});

const addInstructionToCreateRecipe = () => {
  recipeStore.addInstructionToCreateRecipe(instruction.value);
  instruction.value = {
    title: "",
    content: "",
    order: 0,
  };
};

const mesureUnits = [
  "mg",
  "g",
  "kg",
  "mL",
  "cL",
  "L",
  "Cuillère à soupe",
  "Cuillère à café",
  "Poignée",
  "Pincée",
  "Pincette",
  "Trait",
];

const setRecipeProperty = (property: string, e: any) => {
  //@ts-ignore
  recipeStore.recipeCreate.recipe[property] = e;
};

onBeforeMount(() => {
  recipeCategoryStore.fetchData().then((e) => {
    categories.value = recipeCategoryStore.recipe_categories.map(
      (recipe_category) => {
        return {
          name: recipe_category.category,
          value: recipe_category.id,
          disabled: false,
          selected: false,
        };
      }
    );
  });

  recipeTypeStore.fetchData().then((e) => {
    types.value = recipeTypeStore.recipe_types.map((recipe_type) => {
      return {
        name: recipe_type.type,
        value: recipe_type.id,
        disabled: false,
        selected: false,
      };
    });
  });
});
</script>

<style lang="scss">
.tab-left {
  // display: flex;
  width: 50vw;

  @media screen and (max-width: 969px) {
    width: 100vw;
    background-image: url("../assets/img/verres.png");
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
  .form-control {
    @media screen and (max-width: 969px) {
      background: rgba(0, 0, 0, 0.5);
    }
  }
}

.tab-img {
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 100%),
    url("../assets/img/verres.png");
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
