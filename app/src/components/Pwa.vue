<template>
  <div
    v-if="offlineReady || needRefresh"
    class="card bd-grey bd-dark-1 bd-solid bd-1 bg-light rounded-2 shadow-5 p-3 mx-3 fixed-pos"
    role="alert"
  >
    <div class="mb-3">
      <span v-if="offlineReady"> App is ready. </span>
      <span v-else> An update is available. </span>
    </div>

    <div class="d-flex">
      <ax-btn class="rounded-2 primary mr-2 btn-gradient-primary" size="small" v-if="needRefresh" @click="updateServiceWorker()">
        Reload
      </ax-btn>
      <ax-btn class="rounded-2 btn-gradient-secondary" size="small" @click="close">Close</ax-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { useOfflineStore } from '../stores/offline';
import { watch } from 'vue';

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

const offlineStore = useOfflineStore();

const close = async () => {
  offlineReady.value = false;
  needRefresh.value = false;
};

watch(offlineReady, (newval, oldval) => {
  offlineStore.offline = newval;
});
</script>

<style lang="scss" scoped>
@import 'axentix/src/core/variables';

.card {
  bottom: calc(var(--ax-footer-min-height) + 1.5rem);
  left: 50%;
  width: fit-content;
  z-index: 500;
  transform: translateX(-55%);
}
</style>
