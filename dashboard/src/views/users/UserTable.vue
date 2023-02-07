<template>
  <div v-if="!userStore.isLoading" class="p-5">
    <ax-form class="d-flex fx-col">
      <div class="grix xs1 sm2">
        <div>
          <ax-form-field label="Key">
            <ax-form-select
              :items="filterKeyOptions"
              v-model="searchField"
            ></ax-form-select>
          </ax-form-field>
        </div>
        <div>
          <ax-form-field label="Query">
            <ax-form-control
              tag="input"
              v-model="searchValue"
              type="text"
            ></ax-form-control>
          </ax-form-field>
        </div>
      </div>
    </ax-form>
    <EasyDataTable
      :search-field="searchField"
      :search-value="searchValue"
      table-class-name="customize-table"
      header-text-direction="center"
      body-text-direction="center"
      buttons-pagination
      :rows-per-page="5"
      :headers="headers"
      :items="userStore.users"
      alternating
      @click-row="userStore.showUserDetails"
    />
  </div>
  <div v-else class="spinner text-blue mx-auto my-5">
    <svg viewBox="25 25 50 50">
      <circle
        class="spinner-path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke-width="3"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref} from "vue";
import type { Header, Item } from "vue3-easy-data-table";
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();
const searchField = ref("");
const searchValue = ref("");

const headers: Header[] = [
  { text: "Firstname", value: "firstname", sortable: true },
  { text: "Email", value: "email", sortable: true },
  { text: "Provider", value: "provider", sortable: true },
  { text: "Created_at", value: "created_at", sortable: true },
];

const filterKeyOptions = ["firstname", "email", "provider", "created_at"];

onBeforeMount(() => userStore.fetchUsers());
</script>

<style lang="scss" >
.buttons-pagination .item.button.active {
  background-color: #5893c0 !important;
}

.easy-data-table__rows-selector ul.select-items li.selected {
  background-color: #5893c0 !important;
}
</style>
