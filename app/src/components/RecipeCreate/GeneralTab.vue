<template>
    <div class="d-flex h100">
        <ax-form class="w100">
            <div class="grix xs1 md2 gutter-xs5">
                <ax-form-field class="col-md2 col-xs1" label="Nom">
                    <ax-form-control tag="input" v-model="recipeStore.recipeCreate.recipe.name" type="text"
                        class="mb-5"></ax-form-control>
                </ax-form-field>
                <ax-form-field class="col-md2 col-xs1" label="Description">
                    <ax-form-control class="mb-5" v-model="recipeStore.recipeCreate.recipe.description"
                        tag="textarea"></ax-form-control>
                </ax-form-field>
                <div>
                    <Timepicker :label="'Tps de préparation'" v-model="recipeStore.recipeCreate.recipe.preparation_time"
                        @emit-value="setRecipeProperty('preparation_time', $event)" />
                </div>
                <div>
                    <Timepicker :label="'Tps de cuisson'" v-model="recipeStore.recipeCreate.recipe.cooking_time"
                        @emit-value="setRecipeProperty('cooking_time', $event)" />
                </div>
                <div>
                    <ax-form-field label="Dificulté">
                        <ax-form-select :items="difficultyLevels"
                            v-model="recipeStore.recipeCreate.recipe.difficulty"></ax-form-select>
                    </ax-form-field>
                </div>
                <div>
                    <ax-form-field label="Nbr de personnes">
                        <ax-form-control tag="input" v-model="recipeStore.recipeCreate.recipe.eaters_amount" type="number"
                            min="0" class="mb-5"></ax-form-control>
                    </ax-form-field>
                </div>
                <div>
                    <ax-form-field label="Catégorie">
                        <ax-form-select :items="categories"
                            v-model="recipeStore.recipeCreate.recipe.recipe_category_id"></ax-form-select>
                    </ax-form-field>
                </div>
                <div>
                    <ax-form-field label="Type">
                        <ax-form-select :items="types"
                            v-model="recipeStore.recipeCreate.recipe.recipe_type_id"></ax-form-select>
                    </ax-form-field>
                </div>
                <div>
                    <ax-form-file label="Image" @change="setFile"
                        label-classes="btn airforce dark-1 rounded-1"></ax-form-file>
                </div>
            </div>
        </ax-form>
    </div>
</template>

<script setup lang="ts">
import Timepicker from "../../components/Timepicker.vue";
import { useRecipeStore } from "../../stores/recipes";
import { useRecipeTypeStore } from "../../stores/recipeTypes";
import { useRecipeCategoryStore } from "../../stores/recipeCategories";

import { ref, onMounted } from "vue";

const recipeStore = useRecipeStore();
const recipeTypeStore = useRecipeTypeStore();
const recipeCategoryStore = useRecipeCategoryStore();

const types = ref();
const categories = ref();

const setRecipeProperty = (property: string, e: any) => {
    // @ts-ignore
    recipeStore.recipeCreate.recipe[property] = e;
};

const difficultyLevels = ref([1, 2, 3, 4, 5]);

onMounted(() => {
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
})

const setFile = (e: any) => {
    if (e.target.files[0] != null && recipeStore.recipeCreate?.recipe) {
        recipeStore.recipeCreate.recipe.image = e.target.files[0];
    }
}
</script>