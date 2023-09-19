<template>
  <div class="layout auth-layout" v-if="!authStore.isLoggedIn">
    <header>
      <nav class="navbar">
        <a href="/" class="navbar-logo mx-0">
          <img src="/icon.png" alt="logo" class="navbar-logo" />
        </a>

        <div class="navbar-menu ml-auto text-white lh-normal mr-2">
          <router-link to="login" class="navbar-link">Login</router-link>
        </div>
      </nav>
    </header>

    <main>
      <router-view></router-view>
      <Pwa />
    </main>
  </div>

  <div class="layout bg-dark relative-pos" v-else>
    <!-- <div class="navbar-fixed">
      <header>
        <nav class="navbar bg-dark text-white shadow-2 rounded-bl2 rounded-br2">
          <a href="/" class="navbar-logo mx-0">
            <img src="/icon.png" alt="logo" class="navbar-logo" />
          </a>

          <div class="navbar-menu ml-auto lh-normal mr-2">
            <ax-dropdown
              v-model="isDropdownOpened"
              @click="isDropdownOpened = !isDropdownOpened"
              content-classes="bg-light light-shadow-1 rounded-1 dropdown-right my-auto"
              animation-type="fade"
            >
              <template #trigger>
                <a href="" @click.prevent class="font-w600 d-inline-flex fx-center vcenter pr-0">
                  <Icon icon="mdi:account-circle" width="30" class="ml-1 mt-1" />
                </a>
              </template>

              <a href="" class="dropdown-item" @click.prevent="authStore.logout">
                <Icon icon="mdi:logout" width="20" class="mr-2" />Log out
              </a>
            </ax-dropdown>
          </div>
        </nav>
      </header>
    </div> -->

    <main class="bg-dark" style="margin-bottom: 5rem">
      <router-view></router-view>
      <Pwa />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Pwa from './components/Pwa.vue';
import { useAuthStore } from './stores/auth';
import Footer from './components/Footer.vue';

const authStore = useAuthStore();
const isDropdownOpened = ref(false);
</script>

<style lang="scss">
@font-face {
  font-family: 'Quicksand';
  src: url('/assets/Quicksand-VariableFont_wght.ttf') format('truetype');
  font-weight: 1 999;
}

$font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol';

$axentix-palette: (
  // "primary": #20acac,
  'primary': #20ac4a,
  'secondary': #53dfdf,
  'tertiary': #2781e6,
  'success': #12ad12,
  'warning': #fccc2e,
  'error': #df2c29,
  'white': #fff,
  'black': #000,
  'transparent': transparent,
  'bg-dark': #323232,
  'bg-light': #434343
);

@import 'axentix';
@import '@axentix/vue/dist/vue3/vue-axentix.css';

// Forms hack
.grix>.form-field {
  margin-top: 0.5rem !important;
}

.layout {
  padding-bottom: 5rem;
}

body {
  background-color: #323232;
}

.form-field {
  &:not(:first-child) {
    margin-top: 1.75rem;
  }

  label:not(.form-switch) {
    display: inline-block;
    position: absolute;
    top: -0.5rem;
    margin-bottom: 0;
    background-color: getColor('bg-dark');
    z-index: 10;
    margin-left: 0.5rem;
    padding: 0 0.25rem;
    color: getColor('grey', 'light', 3);
  }

  .form-control {
    border-radius: 0.5rem;

    &:focus {
      border: 1px solid getColor('primary') !important;
      box-shadow: none;
    }
  }

  &.not-valid {
    label {
      color: getColor('error');
    }

    .form-control {
      border: 1px solid getColor('error') !important;
      box-shadow: none;
    }
  }
}

.form-control[disabled],
.form-control[readonly] {
  background-color: transparent !important;
  pointer-events: none;
}

.auth-card {
  .card {
    width: 30rem;

    @include responsive('sm') {
      width: 24rem;
    }

    @include responsive('xs') {
      width: 95%;
    }
  }

  .social-divider {
    text-align: center;
    position: relative;

    span {
      position: absolute;
      width: 100%;
      left: 0;
      top: 50%;
      border-bottom: 1px solid getColor('grey', 'dark', 2);
    }

    p {
      color: getColor('grey', 'light', 3);
      background-color: getColor('bg-dark');
      display: inline-block;
      position: relative;
      padding: 0 1.25rem;
    }
  }

  .social-auth-icons {
    .btn {
      width: 3.5rem;
      height: 3.5rem;
      line-height: 3.5rem;
    }
  }
}

.dropdown-item {
  display: flex;
  align-items: center;
}

.auth-layout {
  background: linear-gradient(rgb(0 0 0 / 15%), rgb(0 0 0 / 69%)), url('/img/bg-mobile.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.home {
  margin-top: -11rem;
  background-image: url(/img/home-bg.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: black;
  height: 130vh;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 959px) {
    background: linear-gradient(rgb(0 0 0 / 15%), rgb(0 0 0 / 69%)), url('/img/bg-mobile.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: black;
  }
}

.pres {
  background: #070606;

  .pres-left {
    background: radial-gradient(circle, #3d2208 0%, #2e1b07 20%, #080606 60%);
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-left: 2.5rem;
    padding-right: 2.5rem;

    @media screen and (max-width: 959px) {
      padding-top: 2rem;
      height: 50vh;
    }
  }

  .orange1-bg {
    background-image: url(/img/orange.png);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 50vh;
    width: 35vw;
    max-height: 40vh !important;

    @media screen and (max-width: 959px) {
      width: 100vw;
    }
  }
}

.customize-table {
  --easy-table-border: 0px solid #445269;
  --easy-table-row-border: 0px solid #445269;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #1b1b1b;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #5893c0;

  --easy-table-body-row-font-color: #f5f5f5;
  --easy-table-body-row-background-color: #292929;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #f0f0f0;
  --easy-table-body-row-hover-background-color: #1b1b1b;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #1f1f1f;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: #4acef7;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}

.time-field {
  margin: 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  label {
    display: inline-block;
    position: absolute;
    top: -0.5rem;
    margin-bottom: 0;
    background-color: #313131;
    z-index: 10;
    margin-left: 0.5rem;
    padding: 0 0.25rem;
    color: #e2e2e2;
  }
}

.time-control {
  position: relative;
  display: inline-flex;
  border-radius: 0.5rem;
  border: var(--ax-form-control-border);
  padding: 0 0;
  transition: border 0.2s ease, box-shadow 0.3s ease;
  height: 2.5rem;
  width: 100%;
  appearance: none;
  line-height: 1.3;
  color: inherit;
  background-color: inherit;
}

.vue__time-picker {
  width: 100%;

  .dropdown {
    z-index: 15;
  }

  input.vue__time-picker-input {
    color: white;
    background: transparent;
    border: none !important;
    height: 2.5rem;
    position: relative;
    display: inline-flex;
    padding: 0.5rem 0.75rem;
    transition: border 0.2s ease, box-shadow 0.3s ease;
    width: 100%;
    appearance: none;
    line-height: 1.3;
    color: inherit;

    &:focus-visible {
      outline: none !important;
    }
  }
}
</style>
