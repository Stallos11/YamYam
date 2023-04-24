<template>
  <div class="layout" v-if="!authStore.isLoggedIn">
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
    <div class="navbar-fixed">
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
    </div>

    <main class="bg-dark">
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
.grix > .form-field {
  margin-top: 0.5rem !important;
}

.layout {
  margin-bottom: 5rem;
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
    background-color: getColor('bg-light');
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
      background-color: getColor('bg-light');
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
</style>
