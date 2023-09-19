<template>
    <div v-if="recipeStore.isLoading" class="h100 d-flex vcenter fx-center">
        <Icon icon="eos-icons:bubble-loading" width="40" class="text-white" />
    </div>
    <div v-else class="p-5">
        <div class="grix xs2 center" v-if="recipeStore.selectedRecipe?.user_id == authStore.user?.id">
            <ax-btn @click="recipeStore.editRecipe(recipeStore.selectedRecipe?.id as string)"
                class="btn-circle primary d-flex vcenter fx-center">
                <Icon icon="mdi:pen" width="30" />
            </ax-btn>
            <ax-btn @click="deleteRecipe()" class="btn-circle amaranth d-flex vcenter fx-center">
                <Icon icon="mdi:trash" width="30" />
            </ax-btn>
        </div>
        <p class="font-s4">{{ recipeStore.selectedRecipe?.name }}</p>
        <p class="font-s3 text-grey text-light-2">{{ recipeStore.selectedRecipe?.description }}</p>
        <div class="grix xs2 my-3">
            <ax-btn class="primary rounded-2 font-s2 px-4 py-1" v-if="recipeCategory">{{ recipeCategory }}</ax-btn>
            <ax-btn class="secondary rounded-2 font-s2 px-4 py-1" v-if="recipeType">{{ recipeType }}</ax-btn>
        </div>
        <div class="rounded-2" style="min-height: 12rem; background-size: cover; background-position: center;"
            :style="`background-image: url('data:image/png;base64, ${recipeStore.selectedRecipe?.image}')`">
        </div>

        <div class="grix xs4 center my-3">
            <div class="d-flex vcenter">
                <Icon icon="ic:baseline-access-time" width="20" class="mr-2" />
                {{ recipeStore.selectedRecipe?.preparation_time }}
            </div>

            <div class="d-flex vcenter">
                <Icon icon="icon-park-outline:cook" width="20" class="mr-2" />
                {{ recipeStore.selectedRecipe?.cooking_time }}
            </div>

            <div class="d-flex vcenter">
                <Icon icon="mdi:flame" width="20" class="mr-2 "></Icon>
                {{ recipeStore.selectedRecipe?.difficulty }}
            </div>

            <div class="d-flex vcenter">
                <Icon icon="mdi:cards-heart-outline" width="20" class="mr-2" />
                {{ recipeStore.selectedRecipe?.favourites?.length || 0 }}
            </div>
        </div>

        <div class="d-flex vcenter mt-5">
            <Icon @click="reducePerson" icon="line-md:minus-circle" width="25" />
            <ax-form-field class="my-0 mx-3" label="Eaters amount">
                <ax-form-control tag="input" v-model="totalPersons" type="number" min="0"></ax-form-control>
            </ax-form-field>
            <Icon @click="upPerson" icon="line-md:plus-circle" width="25" />
        </div>

        <div class="d-flex vcenter">
            <div class="fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"></div>
            <h2 class="font-w400 text-center m-3 font-s5">Ingredients</h2>
            <div class="fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"></div>
        </div>

        <div v-for="ingredient in recipeStore.selectedRecipe?.ingredients" class="d-flex fx-row mb-5">
            <a target="_blank" :href="`https://fr.openfoodfacts.org/produit/${ingredient.openfoodfact_id}`">
                <img class="rounded-2 ingredient-img" :src="ingredient.img" />
            </a>
            <div class="pl-3">
                <p class="my-0 font-s2">{{ ingredient.product_name }}</p>
                <span class="text-grey">x{{ ingredient.amount * totalPersons / (recipeStore.selectedRecipe?.eaters_amount as
                    number) }} {{ ingredient.unit }}</span>
            </div>
        </div>

        <div class="d-flex vcenter">
            <div class="fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"></div>
            <h2 class="font-w400 text-center m-3 font-s5">Instructions</h2>
            <div class="fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"></div>
        </div>

        <div v-for="(instruction, i) in recipeStore.selectedRecipe?.instructions" class="mb-5">
            <p class="my-0 font-s2">{{ `${i + 1}. ${instruction.title}` }}</p>
            <p class="my-0 font-s2">{{ instruction.description }}</p>
        </div>

        <div class="d-flex vcenter">
            <div class="fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"></div>
            <h2 class="font-w400 text-center m-3 font-s5">Nutriments</h2>
            <div class="fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"></div>
        </div>

        <div class="d-flex fx-col px-3">
            <div class="nutri">
                <span>Energy</span>
                <span>{{ totalNutriments.kcal }} kCal</span>
            </div>
            <div class="nutri">
                <span>Fat</span>
                <span>{{ totalNutriments.fat }} g</span>
            </div>
            <div class="nutri">
                <span>Saturated Fat</span>
                <span>{{ totalNutriments.saturated_fat }} g</span>
            </div>
            <div class="nutri">
                <span>Carbs</span>
                <span>{{ totalNutriments.carbohydrates }} g</span>
            </div>
            <div class="nutri">
                <span>Sugars</span>
                <span>{{ totalNutriments.sugars }} g</span>
            </div>
            <div class="nutri">
                <span>Proteins</span>
                <span>{{ totalNutriments.proteins }} g</span>
            </div>
            <div class="nutri">
                <span>Salt</span>
                <span>{{ totalNutriments.salt }} g</span>
            </div>
        </div>

        <AddComment />

        <RecipeComment v-for="comment in personnalComments" :comment="comment" />
        <RecipeComment v-for="comment in externalComments" :comment="comment" />

    </div>


    <ax-modal class="bg-dark rounded-1 shadow-1" v-model="isModalDeleteOpened">
        <template #header>
            <p class="text-center">Are you sure ?</p>
        </template>
        <div class="grix xs2 center">
            <ax-btn @click="isModalDeleteOpened = false" class="grey px-4 py-1 rounded-3">Cancel</ax-btn>
            <ax-btn @click="recipeStore.deleteRecipe(recipeStore.selectedRecipe?.id as string)"
                class="red px-4 py-1 rounded-3">Delete</ax-btn>
        </div>
    </ax-modal>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useRecipeStore } from '../../stores/recipes';
import { computed, onBeforeMount, ref } from 'vue';
import { useRecipeCategoryStore } from '../../stores/recipeCategories';
import { useRecipeTypeStore } from '../../stores/recipeTypes';
import { useRecipeCommentStore } from '../../stores/comment';
import { useAuthStore } from '../../stores/auth';
import AddComment from '../../components/AddComment.vue';
import RecipeComment from '../../components/RecipeComment.vue';

const authStore = useAuthStore();
const recipeStore = useRecipeStore();
const recipeCategoryStore = useRecipeCategoryStore();
const recipeTypeStore = useRecipeTypeStore();
const commentStore = useRecipeCommentStore();
const route = useRoute();
const totalPersons = ref();
const isModalDeleteOpened = ref(false);

onBeforeMount(async () => {
    if (!recipeCategoryStore.recipe_categories.length) await recipeCategoryStore.fetchData()
    if (!recipeTypeStore.recipe_types.length) await recipeTypeStore.fetchData()
    if (!recipeStore.selectedRecipe?.id) await recipeStore.showDetails(route.params.id as string)
    await commentStore.getComments();
    totalPersons.value = recipeStore.selectedRecipe?.eaters_amount as number;
})

const nutriments = ref(['kcal', 'carbohydrates', 'fat', 'saturated_fat', 'proteins', 'salt', 'sugars']);
const coefs = ref({
    mg: 0.00001,
    g: 0.01,
    kg: 10,
    mL: 0.00001,
    cL: 0.001,
    L: 10
})

const personnalComments = computed(() => {
    return commentStore.comments.filter(com => com.user_id === authStore.user?.id);
})


const externalComments = computed(() => {
    return commentStore.comments.filter(com => com.user_id != authStore.user?.id);
})

const reducePerson = () => {
    totalPersons.value--;
    if (totalPersons.value < 1) totalPersons.value = 1
}

const upPerson = () => {
    totalPersons.value++
}

const totalNutriments = computed(() => {
    let result: any = {};

    nutriments.value.forEach(nutri => {
        result[nutri] = recipeStore.selectedRecipe?.ingredients.reduce((acc, val) => {
            //@ts-ignore
            const total = val[nutri] * val.amount * coefs.value[val.unit] * totalPersons.value;
            return acc + total
        }, 0).toFixed(3)
    })

    return result;
})

const recipeCategory = computed(() => {
    return recipeCategoryStore.recipe_categories.find(rc => rc.id == recipeStore.selectedRecipe?.recipe_category_id)?.category || false
})

const recipeType = computed(() => {
    return recipeTypeStore.recipe_types.find(rt => rt.id == recipeStore.selectedRecipe?.recipe_type_id)?.type || false
})

const deleteRecipe = () => {
    isModalDeleteOpened.value = true;
}

</script>

<style lang="scss">
.nutri {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid white;
    margin-bottom: 0.5rem;
    padding-bottom: 0.2rem;
}
</style>