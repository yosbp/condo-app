import type { CreateMaintenanceRecord } from '~/types/MaintenanceRecord';

const useMaintenanceStore = defineStore('maintenance', {
  state: () => ({
    loading: false,
  }),
  getters: {},
  actions: {
    async getMaintenanceRecords() {
      this.loading = true;
      const { data, error } = await useApiFetch('/payment/reported');

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      this.loading = false;
      return data.value;
    },
    async createMaintenanceRecord(info: CreateMaintenanceRecord) {
      this.loading = true;
      const { data, error } = await useApiFetch('/payment/reported', {
        method: 'POST',
        body: JSON.stringify(info),
      });

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      this.loading = false;
      return data.value;
    },
  },
});

export default useMaintenanceStore;
