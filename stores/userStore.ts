import type { OwnerUser } from "~/types/User";

const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,
    user: {} as OwnerUser,
  }),
  getters: {},
  actions: {
    async me() {
        this.loading = true;
        const { data, error } = await useApiFetch('/me');
    
        if (error.value) {
            this.loading = false;
            throw new Error(error.value?.data.message);
        }
        this.loading = false;
        this.user = data.value as any;
    },
  },
});

export default useUserStore;
