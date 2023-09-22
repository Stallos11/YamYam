<template>
  <div class="container mt-5">
    <p class="font-s5 bd-b bd-b-solid bd-white pb-3">Mes tickets</p>

    <div v-if="!ticketStore.isLoading" class="d-flex fx-col">
      <div v-for="ticket in ticketStore.tickets" :key="ticket.id"
        class="card shadow-1 rounded-bl2 rounded-br2 mb-5 white">
        <div class="ticket-card card-content rounded-bl3 rounded-br3 shadow-2 mb-2">
          <p class="mt-0 mb-2 font-s3 text-white truncate">{{ ticket.title }}</p>
          <div class="d-flex mb-1">
            <p class="mt-0 text-grey text-light-1 font-s2">
              {{ status }}
            </p>
            <p class="ml-auto text-grey text-light-1">{{ new Date(ticket.created_at).toLocaleDateString() }}</p>
          </div>
        </div>

        <div class="card-footer p-0">
          <router-link :to="`tickets/${ticket.id}`" class="btn btn-small d-block w100">Voir</router-link>
        </div>
      </div>
    </div>
    <Icon v-else icon="eos-icons:bubble-loading" width="40" class="text-white" />
  </div>
</template>

<script setup lang="ts">
import { Ref, computed, onMounted, ref } from 'vue';
import { useTicketStore } from '../../stores/ticket';

const ticketStore = useTicketStore();

interface ICollapsible {
  id: string,
  isOpened: boolean
}

//@ts-ignore
const collapsibles: Ref<ICollapsible[]> = ref([])

const status = computed(() => {
  return ticketStore.selectedTicket.status === "in progress" ? "En cours" : "Fermé"
})

onMounted(async () => {
  await ticketStore.getTickets()

  //@ts-ignore
  ticketStore.tickets.map(ticket => {
    // @ts-ignore
    collapsibles.value.push({
      id: ticket.id as string,
      isOpened: false
    })

  })
})

</script>

<style lang="scss">
.ticket-card {
  background-color: #292929;

}
</style>
