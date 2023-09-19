<template>
    <div class="rounded-2 shadow-2 bd-1 bd-solid bd-grey bd-dark-4 mb-3 py-2 px-3">
        <div class="d-flex vcenter">
            <p class="my-0">{{ comment.user.firstname }}</p>
            <Icon v-if="comment.user_id === authStore.user?.id" icon="mdi:trash" width="20" class="text-red ml-auto"
                @click="isModalDeleteOpened = true" />
        </div>
        <template v-for="i in 5">
            <Icon v-if="i > comment.stars" class="mr-2 text-yellow" icon="material-symbols:star-outline" width="20" />
            <Icon v-else class="mr-2 text-yellow" icon="material-symbols:star" width="20" />
        </template>
        <p class="mb-0" style="word-break: break-all;">{{ comment.message }}</p>
    </div>

    <ax-modal class="bg-dark rounded-1 shadow-1" v-model="isModalDeleteOpened">
        <template #header>
            <p class="text-center">Are you sure ?</p>
        </template>
        <div class="grix xs2 center">
            <ax-btn @click="isModalDeleteOpened = false" class="grey px-4 py-1 rounded-3">Cancel</ax-btn>
            <ax-btn @click="deleteComment" class="red px-4 py-1 rounded-3">Delete</ax-btn>
        </div>
    </ax-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRecipeCommentStore } from '../stores/comment';
import { useAuthStore } from '../stores/auth';

const commentStore = useRecipeCommentStore();
const authStore = useAuthStore();
const props = defineProps(['comment'])

const isModalDeleteOpened = ref(false);

const deleteComment = async () => {
    await commentStore.deleteComment(props.comment.id)
    isModalDeleteOpened.value = false;
}


</script>