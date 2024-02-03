import type { CreateCondominium } from '~/types/Condominium';

const useCondoStore = defineStore('condo', {
  state: () => ({
    loading: false,
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
  },
});

export default useCondoStore;
