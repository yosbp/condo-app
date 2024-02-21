<script setup lang="ts">
  import { ref } from 'vue';
  import Vue3Datatable from '@bhplugin/vue3-datatable';
  import { showMessage } from '#imports';
  import useOwnerStore from '~/stores/ownerStore';
  import type { Owner } from '~/types/Owner';
  import type { I18n } from 'vue-i18n';

  const { t } = useI18n<I18n>();
  const ownerStore = useOwnerStore();

  useHead({ title: t('registered-owners') });
  const search = ref('');
  const rows = ref();
  const cols =
    ref([
      { field: 'name', title: t('owner-name') },
      { field: 'unit', title: t('unit') },
      { field: 'created_at', title: t('created-at') },
      { field: 'status', title: t('status') },
      { field: 'actions', title: t('actions') },
    ]) || [];

  watchEffect(() => {
    rows.value = ownerStore.owners;
  });

  const defaultParams = ref({
    id: '',
    name: '',
    unit: '',
    status: '',
    'email': '',
    created_at: '',
  });

  const params = ref(defaultParams.value);
  const isModalVisible = ref(false);

  const viewOwner = (owner: Owner) => {
    params.value = owner;
    isModalVisible.value = true;
  };

  onMounted(async () => {
    ownerStore.getOwners();
  });
</script>

<template>
  <div>
    <h1 class="text-4xl font-semibold dark:text-white-light text-center">{{ $t('registered-owners') }}</h1>
    <div class="panel mt-6 pb-0">
      <div class="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
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
          <template #actions="data">
            <div class="flex items-center justify-center gap-4">
              <button type="button" class="btn btn-sm btn-outline-primary" @click="viewOwner(data.value)">{{ $t('view') }}</button>
              <!-- <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteUnit(data.value)">Delete</button> -->
            </div>
          </template>
        </vue3-datatable>
      </div>
    </div>
  </div>

  <ModalsViewOwner v-model:is-modal-visible="isModalVisible" v-model:params="params" @get-owners="ownerStore.getOwners()" />
</template>
