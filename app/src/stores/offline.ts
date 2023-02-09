import { defineStore } from 'pinia';

interface State {
  offline: boolean;
}

export const useOfflineStore = defineStore('offline', {
  state: (): State => ({
    offline: true,
  }),
});
