<template>
    <div class="p-4">
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
        <div v-for="ingredient in recipeStore.recipeCreate.ingredients" :key="ingredient.id" class="mt-5">
            <p class="mb-0">{{ ingredient.product_name }}</p>
            <p class="mt-0">
                <span>{{ ingredient.amount }}</span><span>{{ ingredient.unit }}</span>
            </p>
        </div>
        <p class="font-s3 mt-5 text-primary">Instructions</p>
        <div class="divider white"></div>
        <div v-for="instruction in recipeStore.recipeCreate.instructions" class="mt-5">
            <p class="mb-0 font-s">
                {{ instruction.title }}
            </p>
            <p class="mt-1">
                {{ instruction.description }}
            </p>
        </div>
        <ax-btn @click="recipeStore.insert()" class="mt-3 d-block mx-auto rounded-2 primary">VALIDER</ax-btn>
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

const cat = computed(() => {
    return recipeCategoryStore.recipe_categories.find((rc) => rc.id === recipeStore.recipeCreate.recipe.recipe_category_id)?.category
})

const type = computed(() => {
    return recipeTypeStore.recipe_types.find((rc) => rc.id === recipeStore.recipeCreate.recipe.recipe_type_id)?.type
})
</script>