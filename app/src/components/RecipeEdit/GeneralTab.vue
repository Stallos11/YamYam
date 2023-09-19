<template>
    <div v-if="!recipeStore.isLoading" class="d-flex h100">
        <ax-form class="w100">
            <div class="grix xs1 md2 gutter-xs5">
                <ax-form-field class="col-md2 col-xs1" label="Recipe name">
                    <ax-form-control tag="input" v-model="recipeStore.recipeEdit.name" type="text"></ax-form-control>
                </ax-form-field>
                <ax-form-field class="col-md2 col-xs1" label="Description">
                    <ax-form-control v-model="recipeStore.recipeEdit.description" tag="textarea"></ax-form-control>
                </ax-form-field>
                <ax-form-field>
                    <label>Preparation Time</label>
                    <VueTimepicker class="time-control" close-on-complete v-model="recipeStore.recipeEdit.preparation_time"
                        :minute-interval="5" />
                </ax-form-field>
                <ax-form-field>
                    <label>Cooking Time</label>
                    <VueTimepicker class="time-control" close-on-complete v-model="recipeStore.recipeEdit.cooking_time"
                        :minute-interval="5" />
                </ax-form-field>
                <div>
                    <ax-form-field label="Dificulty">
                        <ax-form-select :items="difficultyLevels"
                            v-model="recipeStore.recipeEdit.difficulty"></ax-form-select>
                    </ax-form-field>
                </div>
                <div>
                    <ax-form-field label="Eaters amount">
                        <ax-form-control tag="input" v-model="recipeStore.recipeEdit.eaters_amount" type="number"
                            min="0"></ax-form-control>
                    </ax-form-field>
                </div>
                <div>
                    <ax-form-field label="Catégorie">
                        <ax-form-select :items="categories"
                            v-model="recipeStore.recipeEdit.recipe_category_id"></ax-form-select>
                    </ax-form-field>
                </div>
                <div>
                    <ax-form-field label="Type">
                        <ax-form-select :items="types" v-model="recipeStore.recipeEdit.recipe_type_id"></ax-form-select>
                    </ax-form-field>
                </div>
                <div>
                    <ax-form-file label="Upload" @change="setFile"
                        label-classes="btn airforce dark-1 rounded-1"></ax-form-file>
                </div>
            </div>
        </ax-form>
    </div>
    <div v-else class="h100 d-flex vcenter fx-center">
        <Icon icon="eos-icons:bubble-loading" width="40" class="text-white" />
    </div>
</template>

<script setup lang="ts">
import { useRecipeStore } from "../../stores/recipes";
import { useRecipeTypeStore } from "../../stores/recipeTypes";
import { useRecipeCategoryStore } from "../../stores/recipeCategories";

import { ref, onMounted } from "vue";

const recipeStore = useRecipeStore();
const recipeTypeStore = useRecipeTypeStore();
const recipeCategoryStore = useRecipeCategoryStore();

const types = ref();
const categories = ref();
const updatedImageB64 = ref('');
const difficultyLevels = ref(['1', '2', '3', '4', '5']);

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
    const file = e.target.files[0]
    if (file != null && recipeStore.recipeEdit.id) {
        recipeStore.recipeEdit.image = file;

        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = function () {
            if ((reader.result as string).length) recipeStore.recipeEdit.previewImage = btoa(reader.result as string)
        };
        reader.onerror = function () {
            console.log('there are some problems');
        };
    }
}
</script>