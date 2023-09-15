<template>
    <div @click="recipeStore.showDetails(recipe.id as string)" class="recipe-card relative-pos light-shadow-2 rounded-2 my-4 mx-3">
        <ax-btn @click="recipeStore.toggleFavourite(recipe.id as string)"
            class="like-btn d-flex vcenter fx-center absolute-pos transparent text-white" size="" circle>
            <Icon v-if="recipeStore.favourites?.some(fav => fav.recipe_id === recipe.id)" icon="basil:heart-solid"
                width="30" />
            <Icon v-else icon="ri:heart-add-line" width="30" />
        </ax-btn>

        <h2 class="font-w400 font-s4 mt-2 ml-1 text-white">
            {{ recipe.name }}
        </h2>
        <div class="rounded-2" style="min-height: 12rem; background-size: cover; background-position: center;"
            :style="`background-image: url('data:image/png;base64, ${recipe.image}')`">
        </div>

        <div class="bottom-card">
            <div class="d-flex vcenter">
                <Icon icon="ic:baseline-access-time" width="20" class="mr-2" />
                {{ parsedPreparationTime() }}
            </div>

            <div class="d-flex vcenter">
                <Icon icon="icon-park-outline:cook" width="20" class="mr-2" />
                {{ parsedCookingTime() }}
            </div>

            <div class="d-flex vcenter">
                <Icon icon="mdi:cards-heart-outline" width="20" class="mr-2" />
                69
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRecipeStore } from '../stores/recipes';

const recipeStore = useRecipeStore();
const props = defineProps(['recipe']);

const parsedPreparationTime = () => {
    return `0${(props.recipe.preparation_time / 60) / 60 ^ 0}`.slice(-2) + ':' + ('0' + (props.recipe.preparation_time / 60) % 60).slice(-2)
}

const parsedCookingTime = () => {
    return `0${(props.recipe.cooking_time / 60) / 60 ^ 0}`.slice(-2) + ':' + ('0' + (props.recipe.cooking_time / 60) % 60).slice(-2)
}
</script>

<style lang="scss" scoped>
.recipe-card {

    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.95) 100%);
    }

    // 
    h2 {
        position: absolute;
        left: 10px;
        top: 10px;
    }

    .like-btn {
        right: 10px;
        top: 10px;
    }

    .bottom-card {
        position: absolute;
        left: 50%;
        bottom: 0px;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        color: white;
    }

}
</style>