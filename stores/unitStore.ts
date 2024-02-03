import type { CreateUnit, Unit } from '~/types/Unit';

const useUnitStore = defineStore('unit', {
  state: () => ({
    units: [] as Unit[],
    loading: false,
  }),
  getters: {},
  actions: {
    async getUnits() {
      this.loading = true;
      const { data, error } = await useApiFetch('/unit');

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      this.loading = false;
      this.units = data.value as any;
    },
    async createUnit(info: CreateUnit) {
      this.loading = true;
      const { data, error } = await useApiFetch('/unit', {
        method: 'POST',
        body: JSON.stringify(info),
      });

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      console.log(data.value);
      this.loading = false;
      return data.value;
    },
    async updateUnit(info: Unit) {
      this.loading = true;
      const { data, error } = await useApiFetch(`/unit/${info.id}`, {
        method: 'PUT',
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

export default useUnitStore;
