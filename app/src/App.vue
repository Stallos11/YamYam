<script setup lang="ts">
import Pwa from './components/Pwa.vue';
</script>

<template>
  <div class="layout">
    <header>
      <nav class="navbar">
        <a href="#" class="navbar-logo hide-sm-down">
          <img src="icon.png" alt="logo" class="navbar-logo" style="filter: brightness(0%)" />
        </a>

        <div class="navbar-menu ml-auto">
          <a class="navbar-link" href="#">Recipes</a>
          <a class="navbar-link" href="#">Users</a>
        </div>
      </nav>
    </header>

    <main>
      <router-view></router-view>

      <Pwa />
    </main>

    <footer class="footer white">Copyright © 2023</footer>
  </div>
</template>

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
</style>
