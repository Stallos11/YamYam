<template>
    <div class="my-5">
        <template v-for="i in 5">
            <Icon v-if="i > comment.stars" @click="comment.stars = i" class="mr-2 text-yellow"
                icon="material-symbols:star-outline" width="25" />
            <Icon v-else class="mr-2 text-yellow" @click="comment.stars = i" icon="material-symbols:star" width="25" />
        </template>
        <ax-form class="mt-3">
            <ax-form-field label="Message">
                <ax-form-control v-model="comment.message" tag="textarea">Message</ax-form-control>
            </ax-form-field>
        </ax-form>
        <div class="grix xs2">
            <p class="mt-2">{{ comment.message.length }} / 140</p>
            <ax-btn :disabled="isDisabled" @click="sendComment"
                class="rounded-3 px-4 py-1 amaranth d-block ml-auto mr-3 font-s2 mt-2">Send</ax-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRecipeCommentStore } from '../stores/comment';

const recipeCommentStore = useRecipeCommentStore();
const comment = ref({
    stars: 1,
    message: ''
})

const isDisabled = computed(() => {
    return comment.value.message.length > 1 && comment.value.message.length <= 140 ? false : true
})


const sendComment = async () => {
    if (isDisabled.value) return;

    await recipeCommentStore.addComment(comment.value.message, comment.value.stars);

    comment.value = {
        stars: 1,
        message: ""
    }
}
</script>