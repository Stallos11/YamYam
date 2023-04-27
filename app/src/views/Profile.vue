<template>
  <div class="container mt-5">
    <div class="profile-card p-3 rounded-2">
      <h2 class="my-2">Account summary</h2>

      <ul>
        <li>0 Created recipes</li>
        <li>3 Favourite recipes</li>
      </ul>
    </div>

    <div class="profile-card p-3 rounded-2 my-3">
      <h2 class="my-2">Send ticket</h2>

      <span class="text-grey text-center">Found a bug ? A feature idea ? Send us your thoughts</span>

      <ax-form @submit.prevent="submit" class="mt-4">
        <ax-form-field label="Title">
          <ax-form-control tag="input" v-model="title" type="text"></ax-form-control>
        </ax-form-field>

        <ax-form-field label="Messsage">
          <ax-form-control v-model="message" tag="textarea">Message</ax-form-control>
        </ax-form-field>

        <ax-btn class="primary d-flex rounded-1 mx-auto mt-3" size="small">
          <Icon class="mr-1" icon="material-symbols:mail-outline" width="20" /> Send
        </ax-btn>
      </ax-form>
    </div>

    <ax-btn @click.prevent="authStore.logout" class="red dark-1 d-flex rounded-1 mx-auto mt-3" size="small">
      <Icon class="mr-1" icon="material-symbols:power-rounded" width="20" /> Disconnect
    </ax-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const title = ref('');
const message = ref('');

const submit = () => {
  console.log({ title: title.value, message: message.value });
};
</script>

<style lang="scss">
.profile-card {
  background-color: #292929;

  label {
    background-color: #292929 !important;
  }
}
</style>
