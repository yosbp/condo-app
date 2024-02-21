import type { CreateExpense, Expense, UpdateExpense } from '~/types/Expense';
import type { ExpenseCategory, CreateExpenseCategory, UpdateExpenseCategory } from '~/types/ExpenseCategory';

const useExpenseStore = defineStore('expense', {
  state: () => ({
    expenses: [] as Expense[],
    expenses_categories: [] as ExpenseCategory[],
    loading: false,
  }),
  getters: {},
  actions: {
    async getExpenses() {
      this.loading = true;
      const { data, error } = await useApiFetch('/expense');

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      this.loading = false;
      this.expenses = data.value as any;
    },
    async createExpense(info: CreateExpense) {
      this.loading = true;
      const { data, error } = await useApiFetch('/expense', {
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
    async updateExpense(info: UpdateExpense) {
      this.loading = true;
      const { data, error } = await useApiFetch(`/expense/${info.id}`, {
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
    async getExpensesCategories() {
      this.loading = true;
      const { data, error } = await useApiFetch('/expense-category');

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      this.loading = false;
      this.expenses_categories = data.value as any;
    },
    async createExpenseCategory(info: CreateExpenseCategory) {
      this.loading = true;
      const { data, error } = await useApiFetch('/expense-category', {
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
    async updateExpenseCategory(info: UpdateExpenseCategory) {
      this.loading = true;
      const { data, error } = await useApiFetch(`/expense-category/${info.id}`, {
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

export default useExpenseStore;
