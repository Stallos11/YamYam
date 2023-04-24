<template>
  <footer class="footer rounded-tl3 rounded-tr3 shadow-3">
    <div class="footer-inner grix xs5 w100 center p-2 mx-3 rounded-4">
      <Icon icon="material-symbols:dynamic-feed-rounded" width="30" class="" />
      <Icon icon="fluent:bowl-salad-20-filled" width="30" class="" />
      <Icon icon="mdi:plus" width="60" class="primary rounded-full center-icon" />
      <Icon icon="mdi:cards-heart-outline" width="30" class="pos-xs4" />
      <Icon icon="uil:setting" width="30" class="" />
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.footer {
  position: fixed;
  background-color: #292929;
  height: 5rem;
  bottom: 0;

  .footer-inner {
    border: thin rgb(61, 61, 61) solid;
    background-image: linear-gradient(0deg, #282828, #1c1c1c 80%);

    .center-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
