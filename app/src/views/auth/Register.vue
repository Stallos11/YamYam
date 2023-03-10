<template>
  <div class="card bg-light rounded-2 overflow-visible mt-5 light-shadow-4">
    <div class="robot"></div>
    <h1 class="card-header text-center my-2 font-s5 font-w500">Register</h1>

    <div class="card-content">
      <div class="text-center">
        <router-link to="/login" class="text-primary font-w500">You have an account ? Log in now !</router-link>
      </div>

      <ax-form ref="form" class="mt-4" @keypress.enter.prevent="register">
        <ax-form-field label="Email*">
          <ax-form-control type="email" v-model="user.email" lazy :rules="[required, emailRule]"></ax-form-control>
        </ax-form-field>

        <ax-form-field label="Firstname*">
          <ax-form-control type="text" v-model="user.firstname" lazy :rules="[required]"></ax-form-control>
        </ax-form-field>

        <ax-form-field label="Password*">
          <ax-form-control type="password" v-model="user.password" lazy :rules="[required, passwordRule]"></ax-form-control>
        </ax-form-field>

        <ax-form-field label="Confirm Password*">
          <ax-form-control type="password" :rules="[required, samePasswordRule]"></ax-form-control>
        </ax-form-field>
      </ax-form>

      <div class="text-center mt-3">
        <router-link to="/forgot-password" class="text-grey text-light-2">Forgot password ?</router-link>
      </div>

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

      <div class="social-divider my-4">
        <span></span>
        <p>Or with</p>
      </div>

      <div class="d-flex fx-center social-auth-icons">
        <ax-btn
          class="rounded-2 text-white d-flex vcenter fx-center py-3 discord-bg shadow-1"
          circle
          @click="() => authStore.redirectWithSocial('discord')"
        >
          <Icon icon="akar-icons:discord-fill" size="50"></Icon>
        </ax-btn>

        <ax-btn class="rounded-2 white d-flex vcenter fx-center ml-3 shadow-1" circle @click="() => authStore.redirectWithSocial('google')">
          <Icon icon="flat-color-icons:google" size="50"></Icon>
        </ax-btn>
      </div>
    </div>

    <div class="card-footer pb-0 px-0">
      <ax-btn class="w100 primary d-flex fx-center vcenter" @click="register" :disabled="authStore.isLoading || !isNotRobot">
        <div class="spinner spinner-small text-primary" v-if="authStore.isLoading">
          <svg viewBox="25 25 50 50">
            <circle class="spinner-path" cx="50" cy="50" r="20" fill="none" stroke-width="3" />
          </svg>
        </div>

        <template v-else>
          Register now
          <Icon icon="bx:log-in" class="ml-1"></Icon>
        </template>
      </ax-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { User } from '../../models/user';
import { useAuthStore } from '../../stores/auth';
import { required, emailRule, passwordRule } from '../../utils/validation';
import { VueRecaptcha } from 'vue-recaptcha';
import { useRoute } from 'vue-router';

const authStore = useAuthStore();
const route = useRoute();

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

const register = () => {
  if (!form.value.validate()) return;

  authStore.register(user.value, captchaToken.value);
  // @ts-ignore
  captcha.value.reset();
};
</script>
