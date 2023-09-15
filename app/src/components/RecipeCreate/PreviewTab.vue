<template>
    <div class="p-4 grix xs1 lg2 gutter-xs4">
        <div>
            <p class="font-s5">
                {{ recipeStore.recipeCreate.recipe.name || 'No name' }}
            </p>
            <div>
                <ax-btn class="btn primary px-4 py-1 rounded-3 font-s2 mr-3 mb-3">
                    {{ cat || 'empty cat' }}
                </ax-btn>
                <ax-btn class="btn tertiary px-4 py-1 rounded-3 font-s2">
                    {{ type || 'empty type' }}
                </ax-btn>
            </div>
            <div class="grix xs2 md12 gutter-xs5 font-s3 mt-4">
                <div class="d-flex vcenter">
                    <Icon icon="ic:outline-access-time" class="mr-2 text-secondary"></Icon>
                    <span>{{ recipeStore.recipeCreate.recipe.preparation_time }}</span>
                </div>
                <div class="d-flex vcenter">
                    <Icon icon="icon-park-outline:cook" class="mr-2 text-secondary"></Icon>
                    <span>{{ recipeStore.recipeCreate.recipe.cooking_time }}</span>
                </div>
                <div class="d-flex vcenter">
                    <Icon icon="mdi:flame" class="mr-2 text-secondary"></Icon>
                    <span>{{ recipeStore.recipeCreate.recipe.difficulty }}</span>
                </div>
                <div class="d-flex vcenter">
                    <Icon icon="mdi:users-group" class="mr-2 text-secondary"></Icon>
                    <span>{{ recipeStore.recipeCreate.recipe.eaters_amount }}</span>
                </div>
            </div>
            <p class="pb-5">
                {{ recipeStore.recipeCreate.recipe.description }}
            </p>
            <p class="font-s3 mt-5 text-secondary">Ingrédients</p>
            <div class="divider white"></div>
            <div v-for="ingredient in recipeStore.recipeCreate.ingredients" :key="ingredient.id" class="mt-5">
                <p class="mb-0">{{ ingredient.product_name }}</p>
                <p class="mt-0">
                    <span>{{ ingredient.amount }}</span><span>{{ ingredient.unit }}</span>
                </p>
            </div>
            <p class="font-s3 mt-5 text-secondary">Instructions</p>
            <div class="divider white"></div>
            <div v-for="instruction in recipeStore.recipeCreate.instructions" class="mt-5">
                <p class="mb-0 font-s">
                    {{ instruction.title }}
                </p>
                <p class="mt-1">
                    {{ instruction.description }}
                </p>
            </div>
            <ax-btn :disabled="!isRecipeOk.isValid" @click="createRecipe"
                class="mt-3 d-block mx-auto rounded-2 primary rounded-3 px-4 py-1">Validate</ax-btn>
        </div>
        <div class="d-flex fx-col px-4">
            <p class="font-s4" :class="isRecipeOk.isValid ? 'text-green' : 'text-red'">
                Recipe {{ isRecipeOk.isValid ? 'valid' : 'invalid' }}
                <span class="font-s7" v-if="isRecipeOk.isValid">👌</span>
                <span class="font-s7" v-else="isRecipeOk.isValid">🥲</span>
            </p>
            
            <p class="cursor-pointer mb-0" @click="switchTab('tab1')" :class="isRecipeOk.recipeNameOk ? 'text-green' : 'text-red'">Name</p>
            <p class="cursor-pointer mb-0" @click="switchTab('tab1')" :class="isRecipeOk.recipeDescriptionOk ? 'text-green' : 'text-red'">Description</p>
            <p class="cursor-pointer mb-0" @click="switchTab('tab1')" :class="isRecipeOk.recipePreparationTimeOk ? 'text-green' : 'text-red'">Preparation time</p>
            <p class="cursor-pointer mb-0" @click="switchTab('tab1')" :class="isRecipeOk.recipeCookingTimeOk ? 'text-green' : 'text-red'">Cooking time</p>
            <p class="cursor-pointer mb-0" @click="switchTab('tab1')" :class="isRecipeOk.difficultyOk ? 'text-green' : 'text-red'">Difficulty</p>
            <p class="cursor-pointer mb-0" @click="switchTab('tab1')" :class="isRecipeOk.eatersAmountOk ? 'text-green' : 'text-red'">Eaters amount</p>
            <p class="cursor-pointer mb-0" @click="switchTab('tab1')" :class="isRecipeOk.categoryOk ? 'text-green' : 'text-red'">Category</p>
            <p class="cursor-pointer mb-0" @click="switchTab('tab1')" :class="isRecipeOk.typeOk ? 'text-green' : 'text-red'">Type</p>
            <p class="cursor-pointer mb-0" @click="switchTab('tab2')" :class="isRecipeOk.ingredientsNotEmpty ? 'text-green' : 'text-red'">Ingredients not empty</p>
            <p class="cursor-pointer mb-0" @click="switchTab('tab2')" :class="isRecipeOk.ingredientsOk ? 'text-green' : 'text-red'">Ingredients valid</p>
            <p class="cursor-pointer mb-0" @click="switchTab('tab3')" :class="isRecipeOk.instructionsNotEmpty ? 'text-green' : 'text-red'">Instructions not empty</p>
            <p class="cursor-pointer mb-0" @click="switchTab('tab3')" :class="isRecipeOk.instructionsOk ? 'text-green' : 'text-red'">Instructions valid</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRecipeCategoryStore } from '../../stores/recipeCategories';
import { useRecipeTypeStore } from '../../stores/recipeTypes';
import { useRecipeStore } from '../../stores/recipes';

const recipeStore = useRecipeStore();
const recipeTypeStore = useRecipeTypeStore();
const recipeCategoryStore = useRecipeCategoryStore();
const emit = defineEmits(['switchTab']);

const switchTab = (tab: string) => {
    emit('switchTab', tab)
}

const cat = computed(() => {
    return recipeCategoryStore.recipe_categories.find((rc) => rc.id === recipeStore.recipeCreate.recipe.recipe_category_id)?.category
})

const type = computed(() => {
    return recipeTypeStore.recipe_types.find((rc) => rc.id === recipeStore.recipeCreate.recipe.recipe_type_id)?.type
})

const isRecipeOk = computed(() => {
    const recipe = recipeStore.recipeCreate;

    const recipeNameOk = !!recipe.recipe.name.length;
    const recipeDescriptionOk = !!recipe.recipe.description.length;
    const recipePreparationTimeOk = !!(recipe.recipe.preparation_time as string).length;
    const recipeCookingTimeOk = !!(recipe.recipe.cooking_time as string).length;
    const difficultyOk = !!recipe.recipe.difficulty
    const eatersAmountOk = !!recipe.recipe.eaters_amount && recipe.recipe.eaters_amount > 0
    const categoryOk = !!recipe.recipe.recipe_category_id.length;
    const typeOk = !!recipe.recipe.recipe_type_id.length;

    const ingredientsNotEmpty = !!recipe.ingredients.length;
    const ingredientsOk = ingredientsNotEmpty && recipe.ingredients.every(ingr => {
        if (ingr.amount && ingr.unit) return true;
        return false
    })

    const instructionsNotEmpty = !!recipe.instructions.length;
    const instructionsOk = instructionsNotEmpty && recipe.instructions.every(inst => {
        if (!inst.title.trim().length || !inst.description.trim().length || !inst.title.length || !inst.description.length) return false;
        return true
    })

    const isValid = recipeNameOk && recipeDescriptionOk && recipePreparationTimeOk && recipeCookingTimeOk && difficultyOk && eatersAmountOk && categoryOk && typeOk && ingredientsNotEmpty && ingredientsOk && instructionsOk;

    return {
        recipeNameOk,
        recipeDescriptionOk,
        recipePreparationTimeOk,
        recipeCookingTimeOk,
        difficultyOk,
        eatersAmountOk,
        categoryOk,
        typeOk,
        ingredientsNotEmpty,
        ingredientsOk,
        instructionsNotEmpty,
        instructionsOk,
        isValid
    }
})

const createRecipe = () => {
    if (!isRecipeOk.value.isValid) return;
    recipeStore.insert()
}
</script>