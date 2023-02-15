<template>
  <ax-tab v-model="currentTab" class="shadow-1 h100">
    <template #menu>
      <ax-tab-link href="#tab1">General</ax-tab-link>
      <ax-tab-link href="#tab2">Apercu</ax-tab-link>
    </template>

    <ax-tab-item class="h100" id="tab1">
      <div class="d-flex h100">
        <div class="tab-left">
          <ax-form class="m-5">
            <ax-form-field label="Recipe name">
              <ax-form-control
                tag="input"
                v-model="recipe.name"
                type="text"
                class="mb-5"
              ></ax-form-control>
            </ax-form-field>
            <ax-form-field label="Description">
              <ax-form-control
                class="mb-5"
                v-model="recipe.description"
                tag="textarea"
                >Textarea content</ax-form-control
              >
            </ax-form-field>
          </ax-form>
          <div class="grix xs1 md2 gutter-xs5 px-5">
            <div>
              <Timepicker
                :label="'Temps de préparation'"
                v-model="recipe.preparationTime"
                @emit-value="setRecipeProperty('preparationTime', $event)"
              />
            </div>
            <div>
              <Timepicker
                :label="'Temps de cuisson'"
                v-model="recipe.cookingTime"
                @emit-value="setRecipeProperty('cookingTime', $event)"
              />
            </div>
            <div>
              <ax-form-field label="Dificulty">
                <ax-form-select
                  :items="difficultyLevels"
                  v-model="recipe.difficulty"
                ></ax-form-select>
              </ax-form-field>
            </div>
            <div>
              <ax-form-field label="Eaters amount">
                <ax-form-control
                  tag="input"
                  v-model="recipe.eatersAmount"
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
                  v-model="recipe.categoryId"
                ></ax-form-select>
              </ax-form-field>
            </div>
            <div>
              <ax-form-field label="Type">
                <ax-form-select
                  :items="types"
                  v-model="recipe.typeId"
                ></ax-form-select>
              </ax-form-field>
            </div>
          </div>
        </div>
        <div class="tab-img hide-sm-down"></div>
      </div>
    </ax-tab-item>
    <ax-tab-item class="p-3 h100" id="tab2">aaa</ax-tab-item>
  </ax-tab>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRecipeStore } from "../stores/recipes";
import Timepicker from "../components/Timepicker.vue";
import { useAuthStore } from "../stores/auth";
import { useRecipeTypeStore } from "../stores/recipeTypes";
import { useRecipeCategoryStore } from "../stores/recipeCategories";

const recipeStore = useRecipeStore();
const recipeTypeStore = useRecipeTypeStore();
const recipeCategoryStore = useRecipeCategoryStore();
const authStore = useAuthStore();
const categories = ref();
const types = ref();
const currentTab = ref(0);
const difficultyLevels = ref([1, 2, 3, 4, 5]);

const setRecipeProperty = (property: string, e: any) => {
  console.log("property", property);
  console.log("event", e);
  //@ts-ignore
  recipe.value[property] = e;
};

const recipe = ref({
  name: "",
  description: "",
  preparationTime: 0,
  cookingTime: 0,
  difficulty: 0,
  eatersAmount: 0,
  userId: authStore.user?.id,
  typeId: 0,
  categoryId: 0,
});
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

.form-field .form-control {
  @media screen and (max-width: 969px) {
    background: rgba(0, 0, 0, 0.5);
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
