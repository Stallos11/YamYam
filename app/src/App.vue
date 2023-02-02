<script setup lang="ts">
import Pwa from './components/Pwa.vue';
</script>

<template>
  <div class="layout">
    <header>
      <nav class="navbar shadow-1 primary">
        <a href="#" class="navbar-brand">YamYam</a>
        <div class="navbar-menu ml-auto">
          <a class="navbar-link" href="#">Recipes</a>
          <a class="navbar-link" href="#">Recipes</a>
        </div>
      </nav>
    </header>

    <main>
      <router-view></router-view>

      <Pwa />
    </main>

    <footer class="footer primary">Copyright © 2022 - Example</footer>
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
  'primary': #fec538,
  'secondary': #2983e6,
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
</style>
