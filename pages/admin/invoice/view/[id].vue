<script lang="ts" setup>
  import { ref } from 'vue';
  import Loader from '~/components/loader.vue';
  import useInvoiceStore from '~/stores/invoiceStore';
  useHead({ title: 'Invoice Preview' });
  import html2pdf from 'html2pdf.js';

  // Get id from the route params
  const route = useRoute();
  const invoiceStore = useInvoiceStore();
  const invoice = ref();
  const invoicePageRef = ref<HTMLElement | null>(null);
  const store = useAppStore();
  const previousTheme = ref(store.theme);

  const PDF_OPTIONS = {
    margin: [0.3, 0.5, 1, 0.5],
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  async function saveAsPdf() {
    if (!invoicePageRef.value) return;

    if (store.theme === 'dark') {
      store.toggleTheme('light');
    }

    const pdfInstance = html2pdf().set(PDF_OPTIONS).from(invoicePageRef.value);
    const date = invoiceStore.activeInvoice?.date?.toDateString().replaceAll(' ', '-').toLowerCase();
    const filename = `invoice-${date || 'unknown'}.pdf`;

    await pdfInstance.save(filename).then(() => {
      if (previousTheme === 'dark') {
        store.toggleTheme('dark');
      }
    });
  }

  const print = () => {
    window.print();
  };

  watchEffect(() => {
    invoice.value = invoiceStore.invoice;
  });

  onBeforeMount(() => {
    invoiceStore.getInvoice(route.params.id);
  });
</script>
<template>
  <pre>{{ store.theme }}</pre>
  <Loader v-if="invoiceStore.loading" />

  <div v-else>
    <div class="mb-6 flex flex-wrap items-center justify-center gap-4 lg:justify-end">
      <button type="button" class="btn btn-info gap-2">
        <icon-send />
        Send Invoice
      </button>

      <button type="button" class="btn btn-primary gap-2" @click="print">
        <icon-printer />

        Print
      </button>

      <button type="button" class="btn btn-success gap-2" @click="saveAsPdf">
        <icon-download />
        Download
      </button>

      <button type="button" class="btn btn-success gap-2" @click="store.toggleTheme('light')">
        <icon-download />
        Theme
      </button>

      <NuxtLink to="#" class="btn btn-secondary gap-2" @click.prevent="store.toggleTheme('light')">
        <icon-plus />
        Create
      </NuxtLink>

      <NuxtLink to="/" class="btn btn-warning gap-2">
        <icon-edit />
        Edit
      </NuxtLink>
    </div>
    <div class="panel" v-if="invoice && invoice.invoice" ref="invoicePageRef">
      <div class="flex flex-wrap justify-between gap-4 px-4">
        <div class="text-2xl font-semibold uppercase">Invoice</div>
        <div class="shrink-0">
          <img src="/assets/images/mini-logo.png" alt="" class="w-14 ltr:ml-auto rtl:mr-auto" />
        </div>
      </div>
      <div class="px-4 ltr:text-right rtl:text-left">
        <div class="mt-6 space-y-1 text-white-dark">
          <div>13 Tetrick Road, Cypress Gardens, Florida, 33884, US</div>
          <div>vristo@gmail.com</div>
          <div>+1 (070) 123-4567</div>
        </div>
      </div>

      <hr class="my-6 border-[#e0e6ed] dark:border-[#1b2e4b]" />
      <div class="flex flex-col flex-wrap justify-between gap-6 lg:flex-row">
        <div class="flex-1">
          <div class="space-y-1 text-white-dark">
            <div>Issue For:</div>
            <div class="font-semibold text-black dark:text-white">John Doe</div>
            <div>405 Mulberry Rd. Mc Grady, NC, 28649</div>
            <div>redq@company.com</div>
            <div>(128) 666 070</div>
          </div>
        </div>
        <div class="flex flex-col justify-between gap-6 sm:flex-row lg:w-2/3">
          <div class="xl:1/3 sm:w-1/2 lg:w-2/5">
            <div class="mb-2 flex w-full items-center justify-between">
              <div class="text-white-dark">Invoice :</div>
              <div>#8701</div>
            </div>
            <div class="mb-2 flex w-full items-center justify-between">
              <div class="text-white-dark">Issue Date :</div>
              <div>13 Sep 2022</div>
            </div>
            <div class="mb-2 flex w-full items-center justify-between">
              <div class="text-white-dark">Order ID :</div>
              <div>#OD-85794</div>
            </div>
            <div class="flex w-full items-center justify-between">
              <div class="text-white-dark">Shipment ID :</div>
              <div>#SHP-8594</div>
            </div>
          </div>
          <div class="xl:1/3 sm:w-1/2 lg:w-2/5">
            <div class="mb-2 flex w-full items-center justify-between">
              <div class="text-white-dark">Bank Name:</div>
              <div class="whitespace-nowrap">Bank Of America</div>
            </div>
            <div class="mb-2 flex w-full items-center justify-between">
              <div class="text-white-dark">Account Number:</div>
              <div>1234567890</div>
            </div>
            <div class="mb-2 flex w-full items-center justify-between">
              <div class="text-white-dark">SWIFT Code:</div>
              <div>S58K796</div>
            </div>
            <div class="mb-2 flex w-full items-center justify-between">
              <div class="text-white-dark">IBAN:</div>
              <div>L5698445485</div>
            </div>
            <div class="mb-2 flex w-full items-center justify-between">
              <div class="text-white-dark">Country:</div>
              <div>United States</div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-responsive mb-3" v-for="(category, index) in invoice.categories" :key="index">
        <table>
          <thead>
            <tr>
              <th colspan="5" class="text-center font-extrabold text-base">{{ category.category }}</th>
            </tr>
            <tr>
              <th>{{ $t('expense') }}</th>
              <th class="w-1">{{ $t('date') }}</th>
              <th class="text-center">{{ $t('amount') }}</th>
              <th class="w-1"></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in category.expenses" :key="index">
              <tr class="align-top">
                <td class="">{{ item.description }}</td>
                <td class="w-32">{{ formatDate(item.created_at) }}</td>
                <td class="font-bold text-center">${{ item.amount }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="mt-6 grid grid-cols-1 px-4 sm:grid-cols-2">
        <div></div>
        <div class="space-y-2 ltr:text-right rtl:text-left">
          <div class="flex items-center">
            <div class="flex-1">Subtotal</div>
            <div class="w-[37%]">{{ invoice.invoice.amount }}$</div>
          </div>
          <div class="flex items-center">
            <div class="flex-1">Reserve Fund</div>
            <div class="w-[37%]">{{ invoice.invoice.reserve_fund }}$</div>
          </div>
          <div class="flex items-center text-lg font-semibold">
            <div class="flex-1">Grand Total</div>
            <div class="w-[37%]">{{ invoice.invoice.total_amount }}$</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
