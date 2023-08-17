<template>
  <div class="h100 d-flex fx-center vcenter auth-card">
    <div class="card bg-dark rounded-2 overflow-visible mt-4 light-shadow-4 mb-4">
      <div class="robot"></div>
      <h1 class="card-header text-center my-2 font-s5 font-w500">Reset my password</h1>

      <div class="card-content">
        <ax-form ref="form" class="mt-4" @keypress.enter.prevent="reset">
          <ax-form-field label="Email*">
            <ax-form-control type="email" v-model="user.email" readonly :rules="[required, emailRule]"></ax-form-control>
          </ax-form-field>

          <ax-form-field label="Password*">
            <ax-form-control type="password" v-model="user.password" lazy :rules="[required, passwordRule]"></ax-form-control>
          </ax-form-field>

          <ax-form-field label="Confirm Password*">
            <ax-form-control type="password" :rules="[required, samePasswordRule]"></ax-form-control>
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
        <ax-btn class="w100 primary d-flex fx-center vcenter" @click="reset" :disabled="authStore.isLoading || !isNotRobot">
          <div class="spinner spinner-small text-primary" v-if="authStore.isLoading">
            <svg viewBox="25 25 50 50">
              <circle class="spinner-path" cx="50" cy="50" r="20" fill="none" stroke-width="3" />
            </svg>
          </div>

          <template v-else>
            Reset my password
            <Icon icon="bx:log-in" class="ml-1"></Icon>
          </template>
        </ax-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { User } from '../../models/user';
import { useAuthStore } from '../../stores/auth';
import { required, emailRule, passwordRule } from '../../utils/validation';
import { VueRecaptcha } from 'vue-recaptcha';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

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

const samePasswordRule = (v: any) => v === user.value.password || "Password doesn't match";

const reset = () => {
  if (!form.value.validate()) return;

  authStore.resetPassword(user.value, captchaToken.value);
  // @ts-ignore
  captcha.value.reset();
};

onMounted(() => {
  if (!route.query.email || !route.query.token) return router.push({ name: 'login' });
  user.value.email = route.query.email as string;
  user.value.token = route.query.token as string;
});
</script>
