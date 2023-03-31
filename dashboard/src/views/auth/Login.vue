<template>
  <div class="d-flex fx-col fx-center vcenter h100 bg">
    <ax-form ref="form" class="mt-4" @keypress.enter.prevent="login">
      <ax-form-field label="Email*">
        <ax-form-control
          type="email"
          v-model="user.email"
          lazy
          :rules="[required, emailRule]"
        ></ax-form-control>
      </ax-form-field>

      <ax-form-field label="Password*">
        <ax-form-control
          type="password"
          v-model="user.password"
          lazy
          :rules="[required, passwordRule]"
        ></ax-form-control>
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
    <ax-btn
      class="primary text-white d-flex fx-center vcenter rounded-2 px-5 mt-5"
      @click="login"
      :disabled="authStore.isLoading"
    >
      <div
        class="spinner spinner-small text-primary"
        v-if="authStore.isLoading"
      >
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

      <template v-else>
        Sign In
        <Icon icon="bx:log-in" class="ml-1"></Icon>
      </template>
    </ax-btn>
  </div>
</template>

<script setup lang="ts">
import { VueRecaptcha } from 'vue-recaptcha';
import { ref, Ref } from "vue";
import { IUser } from "../../models/user";
import { useAuthStore } from "../../stores/auth";
import { required, emailRule, passwordRule } from "../../utils/validation";

const authStore = useAuthStore();
const user: Ref<IUser> = ref({});
const form = ref();
const captchaToken = ref("");
const siteKey = import.meta.env.VITE_RECAPTCHA_KEY;
const captcha = ref(null);

const handleSuccess = (token: string) => {
  captchaToken.value = token;
};

const handleError = () => {
};

const handleExpired = () => {
};

const login = () => {
  if (!form.value.validate()) return;

  authStore.login(user.value, captchaToken.value);
  // @ts-ignore
  captcha.value.reset();
};
</script>

<style lang="scss">
.bg {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: black;
  background-image: url("../../assets/img/home-bg.png");

  @media screen and (max-width: 959px) {
    background-image: url("src/assets/img/bg-mobile.png");
  }

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
