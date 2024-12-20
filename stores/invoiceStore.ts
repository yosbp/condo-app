import type { Invoice, InvoiceCreateBody } from "~/types/Invoice";

const useInvoiceStore = defineStore('store', {
  state: () => ({
    invoices: [] as Invoice[],
    invoice: {} as Invoice,
    loading: false,
  }),
  getters: {},
  actions: {
    async getInvoices() {
      this.loading = true;
      const { data, error } = await useApiFetch('/invoice');

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      this.loading = false;
      this.invoices = data.value as any;
    },
    async getInvoice(id: any) {
      this.loading = true;
      const { data, error } = await useApiFetch(`/invoice/${id}`);

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      this.invoice = data.value as any;
      this.loading = false;
    },
    async createInvoice(invoice: InvoiceCreateBody) {
      this.loading = true;
      const { data, error } = await useApiFetch('http://127.0.0.1:8000/api/invoice', {
        method: 'POST',
        body: JSON.stringify(invoice),
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

export default useInvoiceStore;