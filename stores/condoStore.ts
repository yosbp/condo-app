import type { CondominiumsSelectResponse, CreateCondominium, DataToInvoice, UpdateCondominium } from '~/types/Condominium';

const useCondoStore = defineStore('condo', {
  state: () => ({
    loading: false,
    condominiums: [] as CondominiumsSelectResponse[],
    condominium: {},
    data: {} as DataToInvoice,
  }),
  getters: {},
  actions: {
    async createCondo(info: CreateCondominium) {
      this.loading = true;
      const { data, error } = await useApiFetch('/condominium', {
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
    async getCondominiums() {
      this.loading = true;
      const { data, error } = await useApiFetch('/condominium');

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }
      this.loading = false;
      this.condominiums = data.value as any;
    },
    async getCondominium(id: string) {
      this.loading = true;
      const { data, error } = await useApiFetch(`/condominium/${id}`);

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }
      this.loading = false;
      this.condominium = data.value as any;
    },
    async updateCondominium(id: string, info: UpdateCondominium) {
      this.loading = true;
      const { data, error } = await useApiFetch(`/condominium/${id}`, {
        method: 'PUT',
        body: JSON.stringify(info),
      });

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      this.loading = false;
      this.condominium = data.value as any;
      return data.value;
    },
    async getDataToInvoice(){
      this.loading = true;
      const { data, error } = await useApiFetch('/data-to-invoice');

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }
      this.loading = false;
      this.data = data.value as any;
      return data.value as DataToInvoice;
    },
    async uploadImage(id: string, file: File) {
      this.loading = true;
      const formData = new FormData();
      formData.append('image', file);
      const { data, error } = await useApiFetch(`/condominium/${id}/upload-image`, {
        method: 'POST',
        body: formData,
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

export default useCondoStore;
