import type { CreateUnit, Unit } from '~/types/Unit';
import type { CreateIncome, Income } from '~/types/Income';

const useIncomeStore = defineStore('income', {
  state: () => ({
    incomes: [] as Income[],
    loading: false,
  }),
  getters: {},
  actions: {
    async getIncomes() {
        this.loading = true;
        const { data, error } = await useApiFetch('/income');

        if (error.value) {
            this.loading = false;
            throw new Error(error.value?.data.message);
        }

        this.loading = false;
        this.incomes = data.value as any; 
    },
    async createIncome(info: CreateIncome) {
      this.loading = true;
      const { data, error } = await useApiFetch('/income', {
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
    async updateIncome(income: Income) {
      this.loading = true;
      const { data, error } = await useApiFetch(`/income/${income.id}`, {
        method: 'PUT',
        body: JSON.stringify(income),
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

export default useIncomeStore;
