import { defineStore } from 'pinia';

interface State {
  isLoading: boolean;
  balance?: number;
  claimCapability: number;
  claimTimeLeft: number;
  balanceIntervalId?: ReturnType<typeof setInterval> | undefined;
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    isLoading: false,
    balance: undefined,
    claimCapability: 0,
    claimTimeLeft: 0,
    balanceIntervalId: undefined,
  }),
  actions: {},
});
