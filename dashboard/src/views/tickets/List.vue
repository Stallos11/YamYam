<template>
    <div class="container">
        <div class="spinner spinner-small text-primary" v-if="ticketStore.isLoading">
            <svg viewBox="25 25 50 50">
                <circle class="spinner-path" cx="50" cy="50" r="20" fill="none" stroke-width="3" />
            </svg>
        </div>
        <div class="grix xs1 sm2 md4" v-else>
            <div class="grey dark-4 p-3 rounded-2 my-2 light-shadow-2" v-for="ticket in ticketStore.tickets"
                :key="ticket.id">
                <p>{{ ticket.title }}</p>
                <p>{{ ticket.message }}</p>
                <p>{{ ticket.status }}</p>

                <div class="d-flex">
                    <router-link :to="`tickets/${ticket.id}`" class="btn blue">Show</router-link>
                    <button @click="ticketStore.closeTicket(ticket.id as string)" class="btn red">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useTicketStore } from "../../stores/tickets";

const ticketStore = useTicketStore()

onBeforeMount(() => {
    ticketStore.getTickets()
})

</script>