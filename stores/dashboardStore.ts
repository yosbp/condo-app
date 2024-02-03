import type { DashboardData } from '~/types/Dashboard';

const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    loading: false,
    dashboard: {} as DashboardData,
  }),
  getters: {},
  actions: {
    async getDashboardData() {
      this.loading = true;
      const { data, error } = await useApiFetch('/dashboard');

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      this.loading = false;
      this.dashboard = data.value as any;
    },
  },
});

export default useDashboardStore;
