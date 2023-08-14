<template>
    <div class="container">
        <button @click="ticketStore.closeTicket(ticketStore.selectedTicket.id as string)" class="btn red">Close</button>
        <p>{{ ticketStore.selectedTicket.status }}</p>
        <p>{{ ticketStore.selectedTicket.title }}</p>

        <div class="conv px-5">
            <div class="grey dark-1 p-3 rounded-2 my-2 light-shadow-2 mr-5">
                <p>{{ ticketStore.selectedTicket.message }}</p>
                <p class="text-right font-s1 mb-0">{{ new Date(ticketStore.selectedTicket.created_at).toLocaleTimeString() + ' ' + new
                    Date(ticketStore.selectedTicket.created_at).toLocaleDateString() }}</p>
            </div>

            <div v-for="response in ticketStore.selectedTicketResponses"
                :class="response.user_id == authStore.user?.id ? 'ml-5 grey dark-4' : 'mr-5 grey dark-1'"
                class=" p-3 rounded-2 my-2 light-shadow-2">
                <p>{{ response.message }}</p>
                <p class="text-right font-s1 mb-0">{{ new Date(response.created_at).toLocaleTimeString() + ' ' + new
                    Date(response.created_at).toLocaleDateString() }}</p>
            </div>
        </div>

        <div class="my-5">
            <ax-form>
                <ax-form-field label="Response">
                    <ax-form-control v-model="response" tag="textarea">Put your response here</ax-form-control>
                </ax-form-field>
            </ax-form>
            <button @click="sendResponse" class="btn primary rounded-2 px-4 py-1">Send response</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useTicketStore } from "../../stores/tickets";
import { useAuthStore } from "../../stores/auth";
import { useErrorStore } from "../../stores/error";
import { useRoute } from 'vue-router';

const ticketStore = useTicketStore()
const authStore = useAuthStore()
const toastStore = useErrorStore()
const route = useRoute();

const response = ref('');

onBeforeMount(() => {
    ticketStore.getTicket(route.params.id as string)
    ticketStore.getTicketResponses(route.params.id as string)
})

const sendResponse = () => {
    if (response.value.length < 3) {
        toastStore.setError('Invalid response')
        return;
    }
    ticketStore.insertResponse(response.value)
    response.value = '';
}

</script>

<style>
.conv {
    max-height: 60vh;
    overflow-y: scroll;
}
</style>