<script lang="ts" setup>
  import { ref } from 'vue';
  import Vue3Datatable from '@bhplugin/vue3-datatable';
  useHead({ title: 'Invoice List' });

  const datatable: any = ref(null);
  const search = ref('');
  const cols = ref([
    { field: 'invoice', title: 'Invoice' },
    { field: 'name', title: 'Name' },
    { field: 'email', title: 'Email' },
    { field: 'date', title: 'Date' },
    { field: 'amount', title: 'Amount', headerClass: 'justify-end' },
    { field: 'status', title: 'Status' },
    { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
  ]);
  const items = ref([
    {
      id: 1,
      invoice: '081451',
      name: 'Laurie Fox',
      email: 'lauriefox@company.com',
      date: '15 Dec 2020',
      amount: '2275.45',
      status: 'Paid',
    },
    {
      id: 2,
      invoice: '081452',
      name: 'Alexander Gray',
      email: 'alexGray3188@gmail.com',
      date: '20 Dec 2020',
      amount: '1044.00',
      status: 'Paid',
    },
    {
      id: 3,
      invoice: '081681',
      name: 'James Taylor',
      email: 'jamestaylor468@gmail.com',
      date: '27 Dec 2020',
      amount: '20.00',
      status: 'Pending',
    },
    {
      id: 4,
      invoice: '082693',
      name: 'Grace Roberts',
      email: 'graceRoberts@company.com',
      date: '31 Dec 2020',
      amount: '344.00',
      status: 'Paid',
    },
    {
      id: 5,
      invoice: '084743',
      name: 'Donna Rogers',
      email: 'donnaRogers@hotmail.com',
      date: '03 Jan 2021',
      amount: '405.15',
      status: 'Paid',
    },
    {
      id: 6,
      invoice: '086643',
      name: 'Amy Diaz',
      email: 'amy968@gmail.com',
      date: '14 Jan 2020',
      amount: '100.00',
      status: 'Paid',
    },
    {
      id: 7,
      invoice: '086773',
      name: 'Nia Hillyer',
      email: 'niahillyer666@comapny.com',
      date: '20 Jan 2021',
      amount: '59.21',
      status: 'Pending',
    },
    {
      id: 8,
      invoice: '087916',
      name: 'Mary McDonald',
      email: 'maryDonald007@gamil.com',
      date: '25 Jan 2021',
      amount: '79.00',
      status: 'Pending',
    },
    {
      id: 9,
      invoice: '089472',
      name: 'Andy King',
      email: 'kingandy07@company.com',
      date: '28 Jan 2021',
      amount: '149.00',
      status: 'Paid',
    },
    {
      id: 10,
      invoice: '091768',
      name: 'Vincent Carpenter',
      email: 'vincentcarpenter@gmail.com',
      date: '30 Jan 2021',
      amount: '400',
      status: 'Paid',
    },
    {
      id: 11,
      invoice: '095841',
      name: 'Kelly Young',
      email: 'youngkelly@hotmail.com',
      date: '06 Feb 2021',
      amount: '49.00',
      status: 'Pending',
    },
    {
      id: 12,
      invoice: '098424',
      name: 'Alma Clarke',
      email: 'alma.clarke@gmail.com',
      date: '10 Feb 2021',
      amount: '234.40',
      status: 'Paid',
    },
  ]);

</script>

<template>
  <div>
    <div class="panel border-[#e0e6ed] px-0 pb-1.5 dark:border-[#1b2e4b]">
      <div class="datatable invoice-table">
        <div class="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
          <div class="flex items-center gap-2">
            <NuxtLink to="/admin/invoice/add" class="btn btn-primary gap-2">
              <icon-plus />
              Add New
            </NuxtLink>
          </div>
          <div class="ltr:ml-auto rtl:mr-auto">
            <input v-model="search" type="text" class="form-input" placeholder="Search..." />
          </div>
        </div>

        <vue3-datatable
          ref="datatable"
          :rows="items"
          :columns="cols"
          :totalRows="items?.length"
          :hasCheckbox="true"
          :sortable="true"
          :search="search"
          skin="whitespace-nowrap bh-table-hover"
          firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
          lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
          previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
          nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
        >
          <template #id="data">
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
          </template>
          <template #actions="data">
            <div class="flex items-center justify-center gap-4">
              <NuxtLink to="/admin/invoice/edit" class="hover:text-info">
                <icon-edit class="w-4.5 h-4.5" />
              </NuxtLink>
              <NuxtLink to="/admin/invoice/preview" class="hover:text-primary">
                <icon-eye />
              </NuxtLink>
            </div>
          </template>
        </vue3-datatable>
      </div>
    </div>
  </div>
</template>
