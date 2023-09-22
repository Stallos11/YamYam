<template>
  <div class="h100 d-flex fx-center vcenter auth-card">
    <div class="card bg-dark rounded-2 overflow-visible mt-4 light-shadow-4">
      <h1 class="card-header text-center my-2 font-s5 font-w500">Connexion</h1>

      <div class="card-content">
        <div class="text-center">
          <router-link to="/register" class="text-primary font-w500">Pas de compte ? Inscrivez-vous !</router-link>
        </div>

        <ax-form ref="form" class="mt-4" @keypress.enter.prevent="login">
          <ax-form-field label="Email*">
            <ax-form-control type="email" v-model="user.email" lazy :rules="[required, emailRule]"></ax-form-control>
          </ax-form-field>

          <ax-form-field label="Mot de passe*">
            <ax-form-control type="password" v-model="user.password" lazy :rules="[required, passwordRule]"></ax-form-control>
          </ax-form-field>
        </ax-form>

        <div class="text-center mt-3">
          <router-link to="/forgot-password" class="text-grey text-light-2">Mot de passe oublié ?</router-link>
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
          <p>Ou avec</p>
        </div>

        <div class="d-flex fx-center social-auth-icons">
          <ax-btn class="rounded-2 white d-flex vcenter fx-center shadow-1" circle @click="() => authStore.redirectWithSocial('google')">
            <Icon icon="flat-color-icons:google" size="50"></Icon>
          </ax-btn>
        </div>
      </div>

      <div class="card-footer pb-0 px-0">
        <ax-btn class="w100 primary d-flex fx-center vcenter" @click="login" :disabled="authStore.isLoading || !isNotRobot">
          <div class="spinner spinner-small text-primary" v-if="authStore.isLoading">
            <svg viewBox="25 25 50 50">
              <circle class="spinner-path" cx="50" cy="50" r="20" fill="none" stroke-width="3" />
            </svg>
          </div>

          <template v-else>
            Connexion
            <Icon icon="bx:log-in" class="ml-1"></Icon>
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

const login = () => {
  if (!form.value.validate()) return;

  authStore.login(user.value, captchaToken.value);
  // @ts-ignore
  captcha.value.reset();
};
</script>
