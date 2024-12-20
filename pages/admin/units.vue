<script setup lang="ts">
  import { ref } from 'vue';
  import Vue3Datatable from '@bhplugin/vue3-datatable';
  import { showMessage } from '#imports';
  import useUnitStore from '~/stores/unitStore';
  import type { Unit } from '~/types/Unit';
  import type { I18n } from 'vue-i18n';

  const { t } = useI18n<I18n>();
  const unitStore = useUnitStore();

  useHead({ title: t('units') });
  const search = ref('');
  const rows = ref();
  const cols =
    ref([
      { field: 'unit_number', title: t('unit-number') },
      { field: 'owner_name', title: t('owner-name') },
      { field: 'balance', title: t('balance') },
      { field: 'type', title: t('type') },
      { field: 'created_at', title: t('created-at') },
      { field: 'actions', title: t('actions') },
    ]) || [];

  watchEffect(() => {
    rows.value = unitStore.units;
  });

  const defaultParams = ref({
    unit_number: '',
    owner_name: '',
    balance: 0,
    type: '',
  });

  const params = ref(defaultParams.value);
  const isModalVisible = ref(false);

  const addUnit = () => {
    params.value = JSON.parse(JSON.stringify(defaultParams.value));
    isModalVisible.value = true;
  };

  const editUnit = (unit: Unit) => {
    params.value = unit;
    isModalVisible.value = true;
  };

  /* const deleteUnit = (user: any = null) => {
    rows.value = rows.value.filter((d) => d.id != user.id);
    showMessage('User has been deleted successfully.');
  }; */

  onMounted(async () => {
    await unitStore.getUnits();
  });
</script>

<template>
  <div>
    <h1 class="text-4xl font-semibold dark:text-white-light text-center">{{ $t('units') }}</h1>
    <div class="panel mt-6 pb-0">
      <div class="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
        <div class="flex flex-wrap items-center">
          <button type="button" class="btn btn-primary btn-sm m-1" @click="addUnit()">
            <icon-plus class="w-5 h-5 ltr:mr-2 rtl:ml-2" />
            {{ $t('new-unit') }}
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
          sortColumn="firstName"
          :noDataContent="'No se encontraron datos'"
          paginationInfo="Mostrando {0} a {1} de {2} entradas"
          skin="whitespace-nowrap bh-table-hover"
          firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
          lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
          previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
          nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
        >
          <template #created_at="data">
            {{ formatDate(data.value.created_at) }}
          </template>
          <template #type="data">
            {{ $t(data.value.type) }}
          </template>
          <template #actions="data">
            <div class="flex items-center justify-center gap-4">
              <button type="button" class="btn btn-sm btn-outline-primary" @click="editUnit(data.value)">{{ $t('edit') }}</button>
              <!-- <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteUnit(data.value)">Delete</button> -->
            </div>
          </template>
        </vue3-datatable>
      </div>
    </div>
  </div>

  <ModalsAddEditUnitModal v-model:is-modal-visible="isModalVisible" v-model:params="params" @get-units="unitStore.getUnits" />
</template>
