<template>
    <div class="container">
        <div class="d-flex vcenter">
            <div>
                <h1>{{ ticketStore.selectedTicket.title }}</h1>
                <p class="mt-0">Status: {{ ticketStore.selectedTicket.status }}</p>
            </div>
            <button v-if="ticketStore.selectedTicket.status == 'in progress'" @click="ticketStore.closeTicket(ticketStore.selectedTicket.id as string)"
                class=" btn ml-auto rounded-2 px-3 py-1 red">Close</button>
        </div>

        <div ref="conv" class="conv px-5">
            <div class="grey dark-1 p-3 rounded-2 my-2 light-shadow-2 mr-5">
                <p>{{ ticketStore.selectedTicket.message }}</p>
                <p class="text-right font-s1 mb-0">{{ new Date(ticketStore.selectedTicket.created_at).toLocaleTimeString() +
                    ' ' + new
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
import { onMounted, ref } from 'vue';
import { useTicketStore } from "../../stores/tickets";
import { useAuthStore } from "../../stores/auth";
import { useErrorStore } from "../../stores/error";
import { useRoute } from 'vue-router';

const ticketStore = useTicketStore()
const authStore = useAuthStore()
const toastStore = useErrorStore()
const route = useRoute();

const response = ref('');
const conv = ref();


onMounted(() => {
    ticketStore.getTicket(route.params.id as string)
    ticketStore.getTicketResponses(route.params.id as string)

    setTimeout(() => {
        conv.value.scrollTop = conv.value.scrollHeight
        response.value = '';
    }, 300)
})

const sendResponse = async () => {
    if (response.value.length < 2) {
        toastStore.setError('Invalid response')
        return;
    }

    await ticketStore.insertResponse(response.value)

    setTimeout(() => {
        conv.value.scrollTop = conv.value.scrollHeight
        response.value = '';
    }, 300)
}


</script>

<style>
.conv {
    max-height: 60vh;
    overflow-y: scroll;
    scroll-behavior: smooth;
}
</style>