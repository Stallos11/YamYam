<template>
  <ax-modal
    class="bg-dark rounded-1 shadow-1 my-auto"
    v-model="ingredientStore.isModalDeleteOpened"
  >
    <template #header>
      <div class="d-flex fx-center vcenter">Confirmation required</div>
      <div class="divider white mt-3"></div>
    </template>
    <div class="grix xs2 gutter-xs7">
      <div>
        <ax-btn
          @click="ingredientStore.delete()"
          class="btn d-block rounded-3 px-5 py-2 ml-auto secondary"
          >Confirm</ax-btn
        >
      </div>
      <div>
        <ax-btn
          @click="ingredientStore.cancelDelete()"
          class="btn d-block rounded-3 px-5 py-2 mr-auto error"
          >Reject</ax-btn
        >
      </div>
    </div>
  </ax-modal>
</template>

<script setup lang="ts">
import { useIngredientStore } from "../../stores/ingredients";
const ingredientStore = useIngredientStore();
</script>

<style lang="scss" scoped>
.modal {
  top: 50%;
}
</style>
