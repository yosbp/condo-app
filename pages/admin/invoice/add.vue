<script lang="ts" setup>
  import Multiselect from '@suadelabs/vue3-multiselect';
  import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
  import useCondoStore from '~/stores/condoStore';
  import type { DataToInvoice } from '~/types/Condominium';
  import type { InvoiceCreateBody } from '~/types/Invoice';
  import { Spanish } from 'flatpickr/dist/l10n/es.js';
  import { english } from 'flatpickr/dist/l10n/default.js';
  import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index.js';
  import { useAppStore } from '~/stores/index';
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import 'flatpickr/dist/plugins/monthSelect/style.css';
  import useInvoiceStore from '~/stores/invoiceStore';
  import type { I18n } from 'vue-i18n';
  import type { UnitTypeInvoice } from '~/types/UnitType';

  const { t } = useI18n<I18n>();

  useHead({ title: 'Invoice Add' });

  interface Expense {
    id: string;
    name: string;
    description: string;
    category: string;
    amount: number;
  }
  const router = useRouter();
  const condoStore = useCondoStore();
  const store = useAppStore();
  const invoiceStore = useInvoiceStore();
  const unitTypes = ref<UnitTypeInvoice[]>([]);
  const dataFromApi = ref<DataToInvoice>({
    condominium: {
      id: '',
      name_to_invoice: '',
      email: '',
      phone: '',
      image_url: '',
    },
    expenses: [],
    units_types: [],
  });
  // Invoice Data
  const params = ref<InvoiceCreateBody>({
    condominium_id: '',
    description: '',
    amount: 0,
    reserve_fund: 0,
    total_amount: 0,
    due_date: '',
    month: '',
    year: '',
    expenses: [] as string[],
  });
  const feedbackError = ref('');

  // Flatpickr Config
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
  // Flatpickr Config
  const basic: any = ref({
    dateFormat: 'Y-m-d',
    locale: store.locale === 'es' ? Spanish : english,
    minDate: 'today',
  });

  // Expenses
  const expenses = computed(() => {
    let expenses = dataFromApi.value?.expenses || [];
    let selectedInvoicesExpenses = invoiceExpenses.value;
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
  const invoiceDate = ref('');

  // Group expenses by category
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

  // Subtotal, Reserve Fund and Total Amount
  const subTotalAmount = computed(() => {
    return invoiceExpenses.value.reduce((acc, expense) => acc + Number(expense.amount), 0);
  });

  // Calculate reserve fund amount
  const reserveFundAmount = computed(() => {
    return (subTotalAmount.value * params.value.reserve_fund) / 100;
  });

  // Calculate total amount with only 2 decimals
  const totalAmount = computed(() => {
    let subtotal = subTotalAmount.value + (subTotalAmount.value * params.value.reserve_fund) / 100;
    return Math.round(subtotal * 100) / 100;
  });

  // Calculate how much pay per unit type
  const payPerUnitType = computed(() => {
    let total = totalAmount.value;
    let unitType = unitTypes.value;
    let payPerUnitType = unitType.map((item) => {
      return {
        unit_type: item.name,
        amount: Math.round(total * item.percentage) / 100 || 0,
      };
    });
    return payPerUnitType;
  });

  // Remove expense from invoice
  const removeItem = (id: string) => {
    invoiceExpenses.value.splice(
      invoiceExpenses.value.findIndex((item: any) => item.id === id),
      1,
    );
  };

  // Add expense to invoice
  const handleSelect = (selected: any) => {
    if (!selected) return;
    invoiceExpenses.value.push(selected);
    selectedExpense.value = null;
  };

  // Watcher for data changes
  watchEffect(() => {
    dataFromApi.value = condoStore.data;
    unitTypes.value = dataFromApi.value.units_types;
    params.value.total_amount = totalAmount.value ? totalAmount.value : 0;
    params.value.amount = subTotalAmount.value ? subTotalAmount.value : 0;
    params.value.expenses = invoiceExpenses.value ? invoiceExpenses.value.map((item) => item.id) : [];
    params.value.month = invoiceDate.value ? invoiceDate.value.split(' ')[0] : '';
    params.value.year = invoiceDate.value ? invoiceDate.value.split(' ')[1] : '';
  });

  // Get the invoice preview
  const getInvoicePreview = () => {
    let invoice = {} as InvoiceCreateBody;

    feedbackError.value = '';

    invoice.condominium_id = dataFromApi.value.condominium.id;
    params.value.condominium_id = dataFromApi.value.condominium.id;

    // Validate invoice date
    if (invoiceDate.value.length > 0) {
      // Separe month and year
      let date = invoiceDate.value.split(' ');
      invoice.month = date[0];
      invoice.year = date[1];
    } else {
      feedbackError.value = t('invoice-date-required');
    }

    // Validate due date
    if (params.value.due_date.length === 0) {
      feedbackError.value = t('expiration-date-required');
    }

    // Validate expenses
    if (params.value.expenses.length === 0) {
      feedbackError.value = t('you-need-add-expenses');
    }
  };

  const createInvoice = async () => {
    try {
      await invoiceStore.createInvoice(params.value);
      showMessage(t('invoice-created-successfully'));
      router.push('/admin/invoice');
    } catch (error) {
      showMessage(t('error-creating-invoice'), 'error');
    }
  };

  // Watcher for invoiceData changes
  watch(
    params,
    () => {
      // Watcher for invoiceData changes
      setTimeout(() => {
        // Timeout to wait for the invoiceData changes
        getInvoicePreview(); // Call the preview function
      }, 1000); // Wait 1 second
    },
    { deep: true },
  );

  onBeforeMount(() => {
    condoStore.getDataToInvoice();
  });
</script>
<template>
  <div>
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
              <img :src="dataFromApi ? dataFromApi.condominium.image_url : '/assets/images/mini-logo.png'" alt="" class="w-14" />
            </div>
            <!-- Condominium Details -->
            <div class="mt-6 space-y-1 text-gray-500 dark:text-gray-400">
              <div>{{ dataFromApi?.condominium.name_to_invoice }}</div>
              <div>{{ dataFromApi?.condominium.email }}</div>
              <div>{{ dataFromApi?.condominium.phone }}</div>
            </div>
          </div>
          <div class="w-full lg:w-1/2 lg:max-w-fit">
            <!-- Invoice Date -->
            <div class="mt-4 flex items-center">
              <label for="startDate" class="mb-0 flex-1 ltr:mr-2 rtl:ml-2">{{ $t('invoice-date') }}</label>
              <flat-pickr v-model="invoiceDate" class="form-input w-2/3 lg:w-[250px]" :config="monthDate"></flat-pickr>
            </div>
            <!-- Expire Date -->
            <div class="mt-4 flex items-center">
              <label for="due_date" class="mb-0 flex-1 ltr:mr-2 rtl:ml-2">{{ $t('expiration-date') }}</label>
              <flat-pickr v-model="params.due_date" class="form-input w-2/3 lg:w-[250px]" :config="basic"></flat-pickr>
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
            <textarea id="notes" name="notes" class="form-textarea min-h-[130px]" placeholder="Notes...." v-model="params.description"></textarea>
          </div>
        </div>
      </div>
      <div v-if="feedbackError" class="flex items-center h-20 p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light">
        <span class="ltr:pr-2 rtl:pl-2 text-center w-full text-2xl"><strong class="ltr:mr-1 rtl:ml-1">Error!</strong>{{ feedbackError }}</span>
      </div>
      <div v-else class="mt-6 w-full xl:mt-0 2xl:w-96">
        <div class="panel mb-5">
          <div class="my-4">
            <p class="font-bold text-2xl text-center">Each Apartment will pay</p>
          </div>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>{{ $t('unit-type') }}</th>
                  <th class="text-center">{{ $t('amount') }}</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, index) in payPerUnitType" :key="index">
                  <tr>
                    <td>{{ item.unit_type }}</td>
                    <td class="text-center">${{ item.amount.toFixed(2) }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="panel">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button type="button" class="btn btn-success w-full gap-2" @click="createInvoice">
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
