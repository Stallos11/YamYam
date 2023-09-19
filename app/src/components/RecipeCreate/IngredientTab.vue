<template>
    <div class="grix xs1 lg2 gutter-xs3">
        <div>
            <p class="font-s4 mt-0 bd-b-solid bd-white bd-2 pb-2">Ingredient list</p>

            <div v-for="(ingredient, i) in recipeStore.recipeCreate.ingredients" :key="ingredient.id"
                class="grix xs1 gutter-xs3 vcenter">
                <p>{{ ingredient.product_name }}</p>
                <div class="grix xs4 gutter-xs3 vcenter center">
                    <a target="_blank" :href="`https://fr.openfoodfacts.org/produit/${ingredient.openfoodfact_id}`">
                        <img class="rounded-2 ingredient-img" :src="ingredient.img" />
                    </a>
                    <ax-form-field label="Qty">
                        <ax-form-control min="1" tag="input" v-model="ingredient.amount" type="number"></ax-form-control>
                    </ax-form-field>
                    <ax-form-field label="Unit">
                        <ax-form-select :items="mesureUnits" v-model="ingredient.unit"></ax-form-select>
                    </ax-form-field>
                    <ax-btn @click="removeIngredient(ingredient.id)" circle small class="red d-flex vcenter fx-center">
                        <Icon icon="clarity:times-line" width="20" />
                    </ax-btn>
                </div>
            </div>
        </div>
        <div>
            <IngredientSearch />
            <IngredientSearchTable />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRecipeStore } from "../../stores/recipes";
import IngredientSearch from "../IngredientSearch.vue";
import IngredientSearchTable from "../IngredientSearchTable.vue";

const recipeStore = useRecipeStore();
const mesureUnits = [
    "mg",
    "g",
    "kg",
    "mL",
    "cL",
    "L",
];

const removeIngredient = (id: string) => {
    recipeStore.recipeCreate.ingredients = recipeStore.recipeCreate.ingredients.filter(ingr => ingr.id != id)
}

</script>