<script setup lang="ts">
  import { ref } from 'vue';
  import Vue3Datatable from '@bhplugin/vue3-datatable';
  import { showMessage } from '#imports';
  import type { CreateReportPayment } from '~/types/ReportedPayment';
  import usePaymentStore from '~/stores/paymentStore';
  import type { I18n } from 'vue-i18n';

  const { t } = useI18n<I18n>();
  const paymentStore = usePaymentStore();

  useHead({ title: t('reported-payments') });

  definePageMeta({
    layout: 'user',
  });

  const search = ref('');
  const rows = ref();
  const cols =
    ref([
      { field: 'description', title: t('description') },
      { field: 'bank', title: t('bank') },
      { field: 'amount', title: t('amount') },
      { field: 'date', title: t('payment-date') },
      { field: 'is_verified', title: t('status') },
    ]) || [];

  watchEffect(() => {
    rows.value = paymentStore.reportedPayments;
  });

  const isModalVisible = ref(false);

  const addReportPayment = () => {
    isModalVisible.value = true;
  };

  onMounted(async () => {
    await paymentStore.getReportedPayments();
  });
</script>

<template>
  <div>
    <h1 class="text-4xl font-semibold dark:text-white-light text-center">{{ $t('reported-payments') }}</h1>
    <div class="panel mt-6 pb-0">
      <div class="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
        <div class="flex flex-wrap items-center">
          <button type="button" class="btn btn-primary btn-sm m-1" @click="addReportPayment()">
            <icon-plus class="w-5 h-5 ltr:mr-2 rtl:ml-2" />
            {{ $t('report-payment') }}
          </button>
        </div>
        <div class="ltr:ml-auto rtl:mr-auto">
          <input v-model="search" type="text" class="form-input w-auto" :placeholder="`${$t('search')}...`" />
        </div>
      </div>

      <div class="datatable">
        <vue3-datatable
          :rows="rows"
          :columns="cols"
          :totalRows="rows?.length"
          :search="search"
          :sortable="true"
          :noDataContent="'No se encontraron datos'"
          paginationInfo="Mostrando {0} a {1} de {2} entradas"
          sortColumn="firstName"
          skin="whitespace-nowrap bh-table-hover"
          firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
          lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
          previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
          nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
        >
          <template #created_at="data">
            {{ formatDate(data.value.created_at) }}
          </template>

          <template #is_verified="data">
            <span class="badge" :class="`badge-outline-${data.value.is_verified ? 'success' : 'danger'}`">{{ data.value.is_verified ? $t('approved') : $t('pending') }}</span>
          </template>
        </vue3-datatable>
      </div>
    </div>
  </div>

  <ModalsAddReportPayment v-model:is-modal-visible="isModalVisible" @get-reported-payments="paymentStore.getReportedPayments" />
</template>
