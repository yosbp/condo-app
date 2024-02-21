import type { CreateUnit, Unit } from '~/types/Unit';
import type { CreateUnitType, UnitType } from '~/types/UnitType';

const useUnitStore = defineStore('unit', {
  state: () => ({
    units: [] as Unit[],
    units_types: [] as UnitType[],
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
    async getUnitTypes() {
      this.loading = true;
      const { data, error } = await useApiFetch('/unit-type');

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      this.loading = false;
      this.units_types = data.value as any;
    },
    async createUnitType(info: CreateUnitType) {
      this.loading = true;
      const { data, error } = await useApiFetch('/unit-type', {
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
    async updateUnitType(info: UnitType) {
      this.loading = true;
      const { data, error } = await useApiFetch(`/unit-type/${info.id}`, {
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
    async assignUnitToOwner(info: any) {
      this.loading = true;
      const { data, error } = await useApiFetch('/owner/assign-unit', {
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

export default useUnitStore;
