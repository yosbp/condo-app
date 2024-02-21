import type { Owner } from '../types/Owner';

const useOwnerStore = defineStore('owner', {
  state: () => ({
    owners: [] as Owner[],
    loading: false,
  }),
  getters: {},
  actions: {
    async getOwners() {
      this.loading = true;
      const { data, error } = await useApiFetch('/owner');

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      this.loading = false;
      this.owners = data.value as any;
    },
    async approveOwner(id: string) {
      this.loading = true;
      const { data, error } = await useApiFetch(`/owner/approve`, {
        method: 'POST',
        body: JSON.stringify({ owner_id: id}),
      });

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      this.loading = false;
      return data.value;
    },
    async unlinkOwner(id: string) {
      this.loading = true;
      const { data, error } = await useApiFetch(`/owner/unlink`, {
        method: 'POST',
        body: JSON.stringify({ owner_id: id}),
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

export default useOwnerStore;
