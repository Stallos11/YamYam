<template>
  <div class="h100 d-flex fx-center vcenter auth-card">
    <div class="card bg-dark rounded-2 overflow-visible mt-4 light-shadow-4 mb-4">
      <div class="robot"></div>
      <h1 class="card-header text-center my-2 font-s5 font-w500">Forgot password ?</h1>

      <div class="card-content">
        <div class="text-center">
          <router-link to="/login" class="text-primary font-w500">Back to login.</router-link>
        </div>

        <ax-form ref="form" class="mt-4" @keypress.enter.prevent="forgotPassword">
          <ax-form-field label="Email*">
            <ax-form-control type="email" v-model="user.email" :rules="[required, emailRule]"></ax-form-control>
          </ax-form-field>
        </ax-form>

        <div class="d-flex fx-center my-4 captcha">
          <VueRecaptcha
            ref="captcha"
            :sitekey="siteKey"
            :load-recaptcha-script="true"
            theme="dark"
            @verify="handleSuccess"
            @expired="handleExpired"
            @error="handleError"
          ></VueRecaptcha>
        </div>
      </div>

      <div class="card-footer pb-0 px-0">
        <ax-btn class="w100 primary d-flex fx-center vcenter" @click="forgotPassword" :disabled="authStore.isLoading || !isNotRobot">
          <div class="spinner spinner-small text-primary" v-if="authStore.isLoading">
            <svg viewBox="25 25 50 50">
              <circle class="spinner-path" cx="50" cy="50" r="20" fill="none" stroke-width="3" />
            </svg>
          </div>

          <template v-else>
            Send
            <Icon icon="mdi:email-arrow-right" class="ml-1"></Icon>
          </template>
        </ax-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { User } from '../../models/user';
import { useAuthStore } from '../../stores/auth';
import { required, emailRule, passwordRule } from '../../utils/validation';
import { VueRecaptcha } from 'vue-recaptcha';

const authStore = useAuthStore();

const siteKey = import.meta.env.VITE_RECAPTCHA_KEY;
const user: Ref<User> = ref({});
const form = ref();
const isNotRobot = ref(false);
const captchaToken = ref('');
const captcha = ref(null);

const handleSuccess = (token: string) => {
  captchaToken.value = token;
  isNotRobot.value = true;
};

const handleError = () => {
  isNotRobot.value = false;
};

const handleExpired = () => {
  isNotRobot.value = false;
};

const forgotPassword = () => {
  if (!form.value.validate()) return;

  authStore.forgotPassword(user.value.email as string, captchaToken.value);
  // @ts-ignore
  captcha.value.reset();
};
</script>
