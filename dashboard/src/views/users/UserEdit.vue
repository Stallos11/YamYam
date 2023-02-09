<template>
  <div class="h100 d-flex fx-center vcenter fx-col">
    <p class="mb-5 font-s3 text-primary">
      {{ userStore.selectedUser.user.id }}
    </p>
    <ax-form>
      <ax-form-field label="Name">
        <ax-form-control
          tag="input"
          v-model="userStore.selectedUser.user.firstname"
          type="text"
        ></ax-form-control>
      </ax-form-field>
      <ax-form-field label="Email">
        <ax-form-control
          tag="input"
          v-model="userStore.selectedUser.user.email"
          type="text"
        ></ax-form-control>
      </ax-form-field>
    </ax-form>
    <ax-btn
      @click="userStore.update()"
      class="btn mx-auto d-block px-5 py-1 primary rounded-3 mt-5"
      >UPDATE</ax-btn
    >
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../../stores/user";
const userStore = useUserStore();
</script>
