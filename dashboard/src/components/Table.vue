<template>
  <div v-if="!store[props.store].isLoading" class="px-5 py-2">
    <ax-form v-if="props.enableForm" class="d-flex fx-col">
      <p class="text-grey">Filter by</p>
      <div class="grix xs1 sm2 mb-4">
        <div>
          <ax-form-field label="Key">
            <ax-form-select
              :items="props.filterKeyOptions"
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
      :headers="props.headers"
      :items="store[props.store]"
      alternating
      @click-row="store.showDetails"
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
import { onBeforeMount, ref } from "vue";
import { useGlobalStore } from "../stores/global";

const globalStore = useGlobalStore();
const props = defineProps([
  "store",
  "headers",
  "filterKeyOptions",
  "enableForm",
]);
const store = ref();
const searchField = ref("");
const searchValue = ref("");

onBeforeMount(() => {
  store.value = globalStore.getStore(props.store);
  store.value.fetchData();
});
</script>

<style lang="scss">
.buttons-pagination .item.button.active {
  background-color: #5893c0 !important;
}

.easy-data-table__rows-selector ul.select-items li.selected {
  background-color: #5893c0 !important;
}
.vue3-easy-data-table__message {
  --easy-table-message-font-color: white;
}
</style>
