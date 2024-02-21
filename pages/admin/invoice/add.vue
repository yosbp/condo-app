<script lang="ts" setup>
  import Multiselect from '@suadelabs/vue3-multiselect';
  import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
  import useCondoStore from '~/stores/condoStore';
  import type { DataToInvoice } from '~/types/Condominium';
  import type { InvoiceCreateBody } from '~/types/Invoice';
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import { Spanish } from 'flatpickr/dist/l10n/es.js';
  import { english } from 'flatpickr/dist/l10n/default.js';
  import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index.js';
  import 'flatpickr/dist/plugins/monthSelect/style.css';

  useHead({ title: 'Invoice Add' });

  interface Expense {
    id: string;
    name: string;
    description: string;
    category: string;
    amount: number;
  }
  const condoStore = useCondoStore();
  const store = useAppStore();
  const data = ref<DataToInvoice>({
    condominium: {
      id: '',
      name_to_invoice: '',
      email: '',
      phone: '',
    },
    expenses: [],
  });
  const params = ref({
    condominium_id: '',
    invoiceNo: '',
    reserve_fund: 0,
    invoiceDate: '',
    dueDate: '',
    expenses: [] as string[],
    notes: '',
    total: 0,
  });
  const feedbackError = ref('');

  const monthDate: any = ref({
    plugins: [
      monthSelectPlugin({
        shorthand: true, //defaults to false
        dateFormat: 'm Y', //defaults to "F Y"
        altFormat: 'F Y', //defaults to "F Y"
      }),
    ],
    locale: store.locale === 'es' ? Spanish : english,
  });

  const basic: any = ref({
    dateFormat: 'Y-m-d',
    locale: store.locale === 'es' ? Spanish : english,
    minDate: 'today',
  });

  const expenses = computed(() => {
    let expenses = data.value?.expenses || [];
    let selectedInvoicesExpenses = invoiceExpenses.value;
    let result: any = [];
    //if expense is selected, quit from expenses
    if (selectedInvoicesExpenses.length > 0) {
      expenses = expenses.filter((expense: any) => {
        return !selectedInvoicesExpenses.some((selected: any) => selected.id === expense.id);
      });
    }
    return expenses;
  });

  const selectedExpense = ref();
  const invoiceExpenses = ref<Expense[]>([]);
  const invoicesExpensesByCategories = computed(() => {
    const expenses = invoiceExpenses.value;
    const result: any = {};
    expenses.forEach((expense: any) => {
      if (!result[expense.category]) {
        result[expense.category] = [];
      }
      result[expense.category].push(expense);
    });
    return result;
  });

  const subTotalAmount = computed(() => {
    return invoiceExpenses.value.reduce((acc, expense) => acc + Number(expense.amount), 0);
  });

  const reserveFundAmount = computed(() => {
    return (subTotalAmount.value * params.value.reserve_fund) / 100;
  });

  const totalAmount = computed(() => {
    return subTotalAmount.value + (subTotalAmount.value * params.value.reserve_fund) / 100;
  });

  const removeItem = (id: string) => {
    invoiceExpenses.value.splice(
      invoiceExpenses.value.findIndex((item: any) => item.id === id),
      1,
    );
  };

  const handleSelect = (selected: any) => {
    invoiceExpenses.value.push(selected);
    selectedExpense.value = null;
  };

  watchEffect(() => {
    data.value = condoStore.data;
    params.value.total = totalAmount.value ? totalAmount.value : 0;
    params.value.expenses = invoiceExpenses.value ? invoiceExpenses.value.map((item) => item.id) : [];
  });

  const getInvoicePreview = () => {
    let invoice = {} as InvoiceCreateBody;

    feedbackError.value = '';

    invoice.condominium_id = data.value.condominium.id;

    if (params.value.invoiceDate.length > 0) {
      // Separe month and year
      let date = params.value.invoiceDate.split(' ');
      invoice.month = date[0];
      invoice.year = date[1];
    } else {
      feedbackError.value = 'Invoice Date is required';
    }

    console.log(invoice);
  };

  /*   const createInvoice = async () => {
    await condoStore.createInvoice(params.value);
  }; */

  watch(params,() => {
      // Watcher for invoiceData changes
      setTimeout(() => {
        // Timeout to wait for the invoiceData changes
        getInvoicePreview(); // Call the preview function
      }, 1000); // Wait 1 second
    },{ deep: true },
  );

  onBeforeMount(() => {
    condoStore.getDataToInvoice();
  });
</script>
<template>
  <div>
    <pre>{{ params }}</pre>
    <!-- Loading -->
    <div v-if="condoStore.loading" class="w-full flex justify-center align-middle">
      <span class="animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle mx-auto mb-10"></span>
    </div>

    <!-- Content -->
    <div class="flex flex-col gap-2.5 2xl:flex-row" v-else="!condoStore.loading">
      <div class="panel flex-1 px-0 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <div class="flex flex-wrap justify-between px-4">
          <div class="mb-6 w-full lg:w-1/2">
            <div class="flex shrink-0 items-center text-black dark:text-white">
              <img src="/assets/images/logo.svg" alt="" class="w-14" />
            </div>
            <!-- Condominium Details -->
            <div class="mt-6 space-y-1 text-gray-500 dark:text-gray-400">
              <div>{{ data?.condominium.name_to_invoice }}</div>
              <div>{{ data?.condominium.email }}</div>
              <div>{{ data?.condominium.phone }}</div>
            </div>
          </div>
          <div class="w-full lg:w-1/2 lg:max-w-fit">
            <!-- Invoice Number -->
            <div class="flex items-center">
              <label for="number" class="mb-0 flex-1 ltr:mr-2 rtl:ml-2">Invoice Number</label>
              <input id="number" type="text" name="inv-num" class="form-input w-2/3 lg:w-[250px]" placeholder="#8801" v-model="params.invoiceNo" />
            </div>
            <!-- Invoice Date -->
            <div class="mt-4 flex items-center">
              <label for="startDate" class="mb-0 flex-1 ltr:mr-2 rtl:ml-2">{{ $t('invoice-date') }}</label>
              <flat-pickr v-model="params.invoiceDate" class="form-input w-2/3 lg:w-[250px]" :config="monthDate"></flat-pickr>
            </div>
            <!-- Expire Date -->
            <div class="mt-4 flex items-center">
              <label for="dueDate" class="mb-0 flex-1 ltr:mr-2 rtl:ml-2">{{ $t('expiration-date') }}</label>
              <flat-pickr v-model="params.dueDate" class="form-input w-2/3 lg:w-[250px]" :config="basic"></flat-pickr>
            </div>
          </div>
        </div>
        <hr class="my-6 border-[#e0e6ed] dark:border-[#1b2e4b]" />
        <!-- Expense Selector -->
        <div class="flex flex-row gap-5 px-5">
          <Multiselect
            v-model="selectedExpense"
            :options="expenses"
            label="name"
            class="custom-multiselect"
            :placeholder="$t('select-expense')"
            selected-label=""
            select-label=""
            deselect-label=""
          ></Multiselect>
          <button type="button" class="btn btn-primary h-9 w-32" @click="handleSelect(selectedExpense)">{{ $t('add') }}</button>
        </div>
        <hr class="my-6 border-[#e0e6ed] dark:border-[#1b2e4b]" />
        <div class="mt-8">
          <!-- If not have expenses selected -->
          <div v-if="!invoiceExpenses.length">
            <div class="text-center">{{ $t('you-need-add-expenses') }}</div>
            <hr class="my-6 border-[#e0e6ed] dark:border-[#1b2e4b]" />
          </div>
          <!-- If have expenses selected -->
          <div class="table-responsive mb-3" v-for="(expense, index) in invoicesExpensesByCategories" :key="index">
            <table>
              <thead>
                <tr>
                  <th colspan="5" class="text-center font-extrabold text-base">{{ expense[0].category }}</th>
                </tr>
                <tr>
                  <th>{{ $t('expense') }}</th>
                  <th class="w-1">{{ $t('date') }}</th>
                  <th class="text-center">{{ $t('amount') }}</th>
                  <th class="w-1"></th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in expense" :key="index">
                  <tr class="align-top">
                    <td class="">{{ item.description }}</td>
                    <td class="w-32">{{ formatDate(item.created_at) }}</td>
                    <td class="font-bold text-center">${{ item.amount }}</td>
                    <td>
                      <button type="button" @click="removeItem(item.id)">
                        <icon-x class="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <div class="mt-6 flex flex-col justify-between px-4 sm:flex-row">
            <div class="mb-6 sm:mb-0"></div>
            <div class="sm:w-2/5">
              <div class="flex items-center justify-between">
                <div>{{ $t('subtotal') }}</div>
                <div>${{ subTotalAmount.toFixed(2) }}</div>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <div>{{ $t('reserve-fund') }}(%)</div>
                <div class="flex justify-end">
                  <input type="number" placeholder="" class="form-input rounded-none w-1/2 lg:w-[80px]" v-model="params.reserve_fund" />
                  <div
                    class="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b] w-4"
                  >
                    %
                  </div>
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <div>{{ $t('reserve-fund') }}($)</div>
                <div>${{ reserveFundAmount.toFixed(2) }}</div>
              </div>
              <div class="mt-4 flex items-center justify-between font-semibold">
                <div>{{ $t('total') }}</div>
                <div>${{ totalAmount.toFixed(2) }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8 px-4">
          <div>
            <label for="notes">Notes</label>
            <textarea id="notes" name="notes" class="form-textarea min-h-[130px]" placeholder="Notes...." v-model="params.notes"></textarea>
          </div>
        </div>
      </div>
      <div v-if="feedbackError" class="flex items-center h-20 p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light">
        <span class="ltr:pr-2 rtl:pl-2 text-center w-full text-2xl"><strong class="ltr:mr-1 rtl:ml-1">Error!</strong>{{ feedbackError }}</span>
      </div>
      <div v-else class="mt-6 w-full xl:mt-0 2xl:w-96">
        <div class="panel">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button type="button" class="btn btn-success w-full gap-2">
              <icon-save class="ltr:mr-2 rtl:ml-2 shrink-0" />
              Save
            </button>

            <NuxtLink to="/admin/invoice" class="btn btn-primary w-full gap-2">
              <icon-eye class="ltr:mr-2 rtl:ml-2 shrink-0" />
              Preview
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
