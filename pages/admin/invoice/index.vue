<script lang="ts" setup>
  import { ref } from 'vue';
  import Vue3Datatable from '@bhplugin/vue3-datatable';
  import type { I18n } from 'vue-i18n';
  import useInvoiceStore from '~/stores/invoiceStore';
  import Loader from '~/components/loader.vue';

  const { t } = useI18n<I18n>();

  useHead({ title: 'Invoice List' });
  const invoiceStore = useInvoiceStore();
  const rows = ref();
  const search = ref('');
  const cols = ref([
    { field: 'description', title: t('description') },
    { field: 'month', title: 'Month' },
    { field: 'year', title: 'Year' },
    { field: 'amount', title: 'Amount' },
    { field: 'reserve_fund', title: 'Reserve Fund', cellClass: 'justify-center' },
    { field: 'total_amount', title: 'Total Amount' },
    { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
  ]);

  watchEffect(() => {
    rows.value = invoiceStore.invoices;
  });

  onMounted(async () => {
    await invoiceStore.getInvoices();
  });
</script>

<template>
  <div>
    <div class="panel border-[#e0e6ed] px-0 pb-1.5 dark:border-[#1b2e4b]">
      <div class="datatable invoice-table">
        <div class="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
          <div class="flex items-center gap-2">
            <NuxtLink to="/admin/invoice/add" class="btn btn-primary gap-2">
              <icon-plus />
              {{ $t('new-invoice') }}
            </NuxtLink>
          </div>
          <div class="ltr:ml-auto rtl:mr-auto">
            <input v-model="search" type="text" class="form-input" :placeholder="`${$t('search')}...`" />
          </div>
        </div>

        <!-- Loader -->
        <Loader v-if="invoiceStore.loading" />

        <vue3-datatable
          v-else
          :rows="rows"
          :columns="cols"
          :totalRows="rows?.length"
          :search="search"
          :sortable="true"
          :noDataContent="'No se encontraron datos'"
          sortColumn="firstName"
          paginationInfo="Mostrando {0} a {1} de {2} entradas"
          skin="whitespace-nowrap bh-table-hover"
          firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
          lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
          previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
          nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
        >
          <!-- <template #id="data">
            <input type="checkbox" class="form-checkbox mt-1" :id="`chk${data.value.id}`" :value="`${data.value.id}`" />
          </template>
          <template #invoice="data">
            <NuxtLink to="/admin/invoice/preview" class="font-semibold text-primary underline hover:no-underline">#{{ data.value.invoice }}</NuxtLink>
          </template>
          <template #name="data">
            <div class="flex items-center font-semibold">
              {{ data.value.name }}
            </div>
          </template>
          <template #amount="data">
            <div class="font-semibold ltr:text-right rtl:text-left">${{ data.value.amount }}</div>
          </template>
          <template #status="data">
            <span class="badge" :class="[data.value.status.toLowerCase() === 'paid' ? 'badge-outline-success' : 'badge-outline-danger']">{{
              data.value.status
            }}</span>
          </template> -->
          <template #actions="data">
            <div class="flex items-center justify-center gap-4">
              <NuxtLink :to="`/admin/invoice/view/${data.value.id}`" class="hover:text-primary">
                <icon-eye />
              </NuxtLink>
            </div>
          </template>
        </vue3-datatable>
      </div>
    </div>
  </div>
</template>
