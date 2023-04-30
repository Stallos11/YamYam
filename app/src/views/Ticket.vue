<template>
  <div class="container mt-5">
    <p class="font-s5 bd-b bd-b-solid bd-white pb-3">My tickets</p>

    <div v-if="!ticketStore.isLoading" class="d-flex fx-col">
      <div v-for="ticket in ticketStore.tickets" :key="ticket.id" class="mb-5">
        <ax-btn class="primary rounded-1 shadow-1" @click="showCollapsible(ticket.id as string)">
          {{ ticket.title }}
        </ax-btn>

        <ax-collapsible v-model="(collapsibles.find(col => col.id === (ticket.id)) as ICollapsible).isOpened">
          <div class="p-3 my-2 rounded-1 grey light-4">
            <p class="my-1 text-tertiary font-s2 font-w600 bd-b-solid bd-1 bd-tertiary mb-4">
              Status: {{ ticket.status }}
            </p>

            <div class="mb-3">
              {{ ticket.message }}
            </div>

            <div v-if="ticket.response">
              <p class="my-1 text-tertiary font-s2 font-w600 bd-b-solid bd-1 bd-tertiary mb-4">
                Answer:
              </p>
              {{ ticket.response }}
            </div>
          </div>
        </ax-collapsible>
      </div>
    </div>
    <Icon v-else icon="eos-icons:bubble-loading" width="40" class="text-white" />
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import { useTicketstore } from '../stores/ticket';

const ticketStore = useTicketstore();

interface ICollapsible {
  id: string,
  isOpened: boolean
}

//@ts-ignore
const collapsibles: Ref<ICollapsible[]> = ref([])

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

const showCollapsible = (id: string) => {
  const colToOpen = collapsibles.value.find((col: ICollapsible) => col.id === id);

  if (colToOpen) {
    //@ts-ignore
    if (colToOpen.isOpened) {
      colToOpen.isOpened = false;
    } else {
      collapsibles.value.map(coll => {
        //@ts-ignore
        coll.isOpened = false
      })
      colToOpen.isOpened = true;
    }
  }
}

</script>

<style lang="scss"></style>
