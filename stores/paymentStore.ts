import type { CreateReportPayment, ReportedPayment } from '~/types/ReportedPayment';

const usePaymentStore = defineStore('payments', {
  state: () => ({
    reportedPayments: [] as ReportedPayment[],
    loading: false,
  }),
  getters: {},
  actions: {
    async getReportedPayments() {
      this.loading = true;
      const { data, error } = await useApiFetch('/reported-payment');

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      this.loading = false;
      this.reportedPayments = data.value as any;
    },
    async createReportPayment(info: CreateReportPayment) {
      this.loading = true;
      const { data, error } = await useApiFetch('/reported-payment', {
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

export default usePaymentStore;
