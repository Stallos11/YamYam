<template>
    <div class="container">
        <div v-if="!ticketStore.isLoading">
            <template v-if="ticketStore.tickets.length">
                <ax-form>
                    <ax-form-field label="Search ticket">
                        <ax-form-control tag="input" v-model="searchValue" type="text"></ax-form-control>
                    </ax-form-field>
                </ax-form>
                <EasyDataTable @click-row="showTicket" :table-min-height="0" theme-color="#5893c0"
                    table-class-name="customize-table" :search-field="searchField" :search-value="searchValue"
                    header-text-direction="center" body-text-direction="center" buttons-pagination :rows-per-page="5"
                    :headers="tableHeader" :items="ticketStore.tickets" alternating>
                    <template #item-created_at="{ created_at }">
                        {{  new Date(created_at).toLocaleString() }}
                    </template>
                </EasyDataTable>
            </template>
            <div v-else>
                <p class="">No tickets found</p>
            </div>
        </div>
        <Icon v-else class="d-block mx-auto text-amaranth" icon="eos-icons:bubble-loading" width="50" />
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useTicketStore } from "../../stores/tickets";
import { useRouter } from 'vue-router';
import type { Header, ClickRowArgument } from "vue3-easy-data-table";
const ticketStore = useTicketStore()
const router = useRouter();

const showTicket = (data: ClickRowArgument) => {
    router.push(`tickets/${data.id}`)
}

onBeforeMount(() => {
    ticketStore.getTickets()
})
const searchField = ["id", "title", "user", "status", "created_at"];
const searchValue = ref('');

const tableHeader: Header[] = [
    { text: "Title", value: "title", sortable: true },
    { text: "User", value: "user", sortable: true },
    { text: "Status", value: "status", sortable: true },
    { text: "Created at", value: "created_at", sortable: true },
];

</script>

