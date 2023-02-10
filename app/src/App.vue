<template>
  <div class="layout">
    <header>
      <nav class="navbar">
        <a href="#" class="navbar-logo mx-0">
          <img src="/icon.png" alt="logo" class="navbar-logo" />
        </a>

        <div class="navbar-menu ml-auto text-white">
          <router-link to="login" class="navbar-link">Login</router-link>

          <span class="font-s7 mx-3" :class="offline ? 'text-green' : 'text-red'">•</span>
        </div>
      </nav>
    </header>

    <main class="container">
      <router-view></router-view>

      <Pwa />
    </main>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import Ping from 'ping.js';
import { ref } from 'vue';
import Pwa from './components/Pwa.vue';

const offline = ref(false);

setInterval(() => {
  var p = new Ping();

  p.ping('https://github.com')
    .then((data: any) => {
      // console.log('Successful ping: ' + data);
      offline.value = true;
    })
    .catch((data: any) => {
      // console.error('Ping failed: ' + data);
      offline.value = false;
    });
}, 2000);
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
  'primary': #20acac,
  'secondary': #53dfdf,
  'tertiary': #2781e6,
  'success': #12ad12,
  'warning': #fccc2e,
  'error': #df2c29,
  'white': #fff,
  'black': #000,
  'transparent': transparent,
  'bg-dark': #1c2127,
  'bg-light': #262a32,
);

@import 'axentix';
@import '@axentix/vue/dist/vue3/vue-axentix.css';

// Forms hack
.grix > .form-field {
  margin-top: 0.5rem !important;
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
</style>
