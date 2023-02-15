<template>
  <ax-form>
    <div class="time-field">
      <label>{{ props.label }}</label>
      <VueTimepicker
        @close="emitValue($event)"
        class="mb-5 time-control"
        close-on-complete
        v-model="time"
        :minute-interval="5"
      />
    </div>
  </ax-form>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps(["label"]);
const emit = defineEmits(["emitValue"]);
const time = ref("");

const emitValue = (a: any) => {
  emit("emitValue", time.value);
};
</script>

<style lang="scss">
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
    background-color: #181818;
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
