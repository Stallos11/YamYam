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
            <div class="grix xs1 md2 gutter-xs2 p-5">
              <h4 class="my-1">Informations Générales</h4>

              <ax-form-field class="col-md2 col-xs1" label="Nom de la recette">
                <ax-form-control tag="input" v-model="recipeStore.recipeCreate.recipe.name" type="text"></ax-form-control>
              </ax-form-field>

              <ax-form-field class="col-md2 col-xs1" label="Description">
                <ax-form-control v-model="recipeStore.recipeCreate.recipe.description" tag="textarea"></ax-form-control>
              </ax-form-field>

              <h4 class="mb-1">Photo de la recette</h4>
              <ax-form-file label="Upload" @change="setFile" label-classes="btn airforce dark-1 rounded-1"></ax-form-file>

              <h4 class="mb-1">Durées</h4>
              <div>
                <Timepicker
                  :label="'Temps de préparation'"
                  v-model="recipeStore.recipeCreate.recipe.preparation_time"
                  @emit-value="setRecipeProperty('preparation_time', $event)"
                />
              </div>
              <div>
                <Timepicker
                  :label="'Temps de cuisson'"
                  v-model="recipeStore.recipeCreate.recipe.cooking_time"
                  @emit-value="setRecipeProperty('cooking_time', $event)"
                />
              </div>

              <h4 class="mb-1">Valeurs numériques</h4>
              <div>
                <ax-form-field label="Difficulté (1 - 5)">
                  <ax-form-select :items="difficultyLevels" v-model="recipeStore.recipeCreate.recipe.difficulty"></ax-form-select>
                </ax-form-field>
              </div>
              <div>
                <ax-form-field label="Pour combien de personnes">
                  <ax-form-control
                    tag="input"
                    v-model="recipeStore.recipeCreate.recipe.eaters_amount"
                    type="number"
                    min="0"
                  ></ax-form-control>
                </ax-form-field>
              </div>

              <h4 class="mb-1">Classification</h4>
              <div>
                <ax-form-field label="Catégorie">
                  <ax-form-select :items="categories" v-model="recipeStore.recipeCreate.recipe.recipe_category_id"></ax-form-select>
                </ax-form-field>
              </div>
              <div>
                <ax-form-field label="Type">
                  <ax-form-select :items="types" v-model="recipeStore.recipeCreate.recipe.recipe_type_id"></ax-form-select>
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

      <div class="mx-5 mt-3 gutter-xs7">
        <div v-for="(ingredient, i) in recipeStore.recipeCreate?.ingredients" :key="ingredient.id" class="grix md3 xs1">
          <h6>{{ ingredient.product_name }}</h6>
          <ax-form-field label="Quantité">
            <ax-form-control tag="input" v-model="ingredient.amount" type="text"></ax-form-control>
          </ax-form-field>
          <ax-form-field label="Unité de mesure">
            <ax-form-select :items="mesureUnits" v-model="ingredient.unit"></ax-form-select>
          </ax-form-field>
        </div>
      </div>
    </ax-tab-item>

    <ax-tab-item class="p-3 h100" id="tab3">
      <h4 class="mb-5">Ajouter les étapes de préparation</h4>

      <div class="mx-5">
        <ax-form-field label="Titre">
          <ax-form-control tag="input" v-model="instruction.title" type="text"></ax-form-control>
        </ax-form-field>
        <ax-form-field label="Description">
          <ax-form-control tag="textarea" v-model="instruction.description" type="text"></ax-form-control>
        </ax-form-field>
        <ax-btn @click="addInstructionToCreateRecipe()" class="btn my-5 primary rounded-3 px-5 py-2 text-white d-block mx-auto"
          >AJOUTER</ax-btn
        >
        <div v-for="(instruction, i) in recipeStore.recipeCreate?.instructions" :key="instruction.id" class="d-flex fx-col">
          <div class="divider grey my-4"></div>

          <ax-form-field label="Titre">
            <ax-form-control tag="input" v-model="instruction.title" type="text"></ax-form-control>
          </ax-form-field>
          <ax-form-field label="Description">
            <ax-form-control tag="textarea" v-model="instruction.description" type="text"></ax-form-control>
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
            recipeCategoryStore.recipe_categories.find((rc) => rc.id === recipeStore.recipeCreate.recipe.recipe_category_id)?.category
          }}</ax-btn>
          <ax-btn class="btn tertiary px-4 py-1 rounded-3 font-s2">{{
            recipeTypeStore.recipe_types.find((rc) => rc.id === recipeStore.recipeCreate.recipe.recipe_type_id)?.type
          }}</ax-btn>
        </div>
        <div class="grix xs2 md12 gutter-xs5 font-s3 mt-4">
          <div class="d-flex">
            <Icon icon="ic:outline-access-time" class="mr-2"></Icon>
            <span>{{ recipeStore.recipeCreate.recipe.preparation_time }}</span>
          </div>
          <div class="d-flex">
            <Icon icon="icon-park-outline:cook" class="mr-2"></Icon>
            <span>{{ recipeStore.recipeCreate.recipe.cooking_time }}</span>
          </div>
          <div class="d-flex">
            <Icon icon="mdi:flame" class="mr-2"></Icon>
            <span>{{ recipeStore.recipeCreate.recipe.difficulty }}</span>
          </div>
          <div class="d-flex">
            <Icon icon="mdi:users-group" class="mr-2"></Icon>
            <span>{{ recipeStore.recipeCreate.recipe.eaters_amount }}</span>
          </div>
        </div>
        <p class="pb-5">
          {{ recipeStore.recipeCreate.recipe.description }}
        </p>
        <p class="font-s3 mt-5 text-primary">Ingrédients</p>
        <div class="divider white"></div>
        <div v-for="ingredient in recipeStore.recipeCreate?.ingredients" :key="ingredient.id" class="mt-5">
          <p class="mb-0">{{ ingredient.product_name }}</p>
          <p class="mt-0">
            <span>{{ ingredient.amount }}</span
            ><span>{{ ingredient.unit }}</span>
          </p>
        </div>
        <p class="font-s3 mt-5 text-primary">Instructions</p>
        <div class="divider white"></div>
        <div v-for="instruction in recipeStore.recipeCreate?.instructions" :key="instruction.id" class="mt-5">
          <p class="mb-0 font-s">
            {{ instruction.title }}
          </p>
          <p class="mt-1">
            {{ instruction.description }}
          </p>
        </div>
        <ax-btn @click="recipeStore.createRecipe()" class="mt-3 d-block mx-auto rounded-2 primary">VALIDER</ax-btn>
      </div>
    </ax-tab-item>
  </ax-tab>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRecipeStore } from '../stores/recipes';
import Timepicker from '../components/Timepicker.vue';
import { useRecipeTypeStore } from '../stores/recipeTypes';
import { useRecipeCategoryStore } from '../stores/recipeCategories';
import IngredientSearch from './IngredientSearch.vue';
import IngredientSearchTable from './IngredientSearchTable.vue';

const recipeStore = useRecipeStore();
const recipeTypeStore = useRecipeTypeStore();
const recipeCategoryStore = useRecipeCategoryStore();
const categories = ref();
const types = ref();
const currentTab = ref(0);
const difficultyLevels = ref([1, 2, 3, 4, 5]);

const instruction = ref({
  title: '',
  description: '',
});

const setFile = (e) => {
  console.log('e', e.target.files[0]);

  if (e.target.files[0] != null) {
    recipeStore.recipeCreate.recipe.image = e.target.files[0];
  }
};

const addInstructionToCreateRecipe = () => {
  recipeStore.addInstructionToCreateRecipe(instruction.value);
  instruction.value = {
    title: '',
    description: '',
  };
};

const mesureUnits = ['mg', 'g', 'kg', 'mL', 'cL', 'L', 'Cuillère à soupe', 'Cuillère à café', 'Poignée', 'Pincée', 'Pincette', 'Trait'];

const setRecipeProperty = (property: string, e: any) => {
  //@ts-ignore
  recipeStore.recipeCreate.recipe[property] = e;
};

onBeforeMount(() => {
  recipeCategoryStore.fetchData().then((e) => {
    categories.value = recipeCategoryStore.recipe_categories.map((recipe_category) => {
      return {
        name: recipe_category.category,
        value: recipe_category.id,
        disabled: false,
        selected: false,
      };
    });
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
    background-image: url('../assets/img/verres.png');
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
}

.tab-img {
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 100%), url('../assets/img/verres.png');
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
