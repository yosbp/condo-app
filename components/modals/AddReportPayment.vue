<script setup lang="ts">
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
  import Multiselect from '@suadelabs/vue3-multiselect';
  import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import type { I18n } from 'vue-i18n';
  import type { CreateReportPayment } from '~/types/ReportedPayment';
  import usePaymentStore from '~/stores/paymentStore';

  const { t } = useI18n<I18n>();

  interface Emit {
    (e: 'update:isModalVisible', value: boolean): void;
    (e: 'getReportedPayments'): void;
  }

  interface Props {
    isModalVisible: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits<Emit>();
  const paymentStore = usePaymentStore();
  const options = ref([
    // Venezuelan banks
    'Banco Activo',
    'Banco Agrícola de Venezuela',
    'Banco Bicentenario',
    'Banco Caroní',
    'Banco de Venezuela',
    'Banco del Tesoro',
    'Banco Exterior',
    'Banco Mercantil',
    'Banco Nacional de Crédito',
    'Banco Plaza',
    'Banco Sofitasa',
    'Banco Venezolano de Crédito',
    'Banesco',
    'Banfanb',
    'Banplus',
    'BFC Banco Fondo Común',
    'BNC Banco Nacional de Crédito',
    'BOD Banco Occidental de Descuento',
    'BVC Banco de Comercio Exterior',
    'DELSUR Banco Universal',
    'Mi Banco',
    'Oriental Bank',
    'Provincial',
    'Venezolano de Crédito',
    '100% Banco',
    'Banco del Caribe',
    'Banco Occidental de Descuento',
    'Banco Plaza',
    'Banco Sofitasa',
    'Banco Universal',
    'Bancrecer',
    'Banfanb',
    'Banplus',
  ]);

  const reportPayment = ref<CreateReportPayment>({
    description: '',
    amount: 0,
    bank: '',
    date: new Date(),
  });

  const saveIncome = async () => {
    //add ReportPayment
    try {
      await paymentStore.createReportPayment(reportPayment.value);
      showMessage(t('report-payment-created-successfully'));
      emit('update:isModalVisible', false);
      emit('getReportedPayments');
    } catch (error) {
      showMessage(t('error-creating-report-payment'), 'error');
    }
  };

  const handleCloseModal = () => {
    emit('update:isModalVisible', false);
  };

  const rangeCalendar = {
    maxDate: new Date(),
  };
</script>

<template>
  <!-- add contact modal -->
  <TransitionRoot appear :show="props.isModalVisible" as="template">
    <Dialog as="div" @close="handleCloseModal()" class="relative z-[51]">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-[black]/60" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center px-4 py-8">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
              <button
                type="button"
                class="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                @click="handleCloseModal()"
              >
                <icon-x />
              </button>
              <div class="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pr-5 rtl:pl-[50px] dark:bg-[#121c2c]">
                {{ $t('add-report-payment') }}
              </div>
              <div class="p-5">
                <form @submit.prevent="saveIncome()">
                  <!-- Description -->
                  <div class="mb-5">
                    <label for="description">{{ $t('description') }}</label>
                    <input required id="name" type="text" :placeholder="$t('enter-description')" class="form-input" v-model="reportPayment.description" />
                  </div>
                  <!-- Bank -->
                  <div class="mb-5">
                    <label for="bank">{{ $t('bank') }}</label>
                    <multiselect
                      v-model="reportPayment.bank"
                      :options="options"
                      class="custom-multiselect"
                      :searchable="true"
                      placeholder="Selecciona la Unidad"
                      selected-label=""
                      select-label=""
                      deselect-label=""
                      required
                    ></multiselect>
                  </div>
                  <!-- Amount -->
                  <div class="mb-5">
                    <label for="amount">{{ $t('amount') }}</label>
                    <input required id="amount" type="number" :placeholder="$t('enter-amount')" class="form-input" v-model="reportPayment.amount" step="0.1" />
                  </div>
                  <!-- Date -->
                  <div class="mb-5">
                    <label for="date">{{ $t('payment-date') }}</label>
                    <flat-pickr :config="rangeCalendar" v-model="reportPayment.date" class="form-input"></flat-pickr>
                  </div>
                  <div class="mt-8 flex items-center justify-end">
                    <button type="button" class="btn btn-outline-danger" @click="handleCloseModal()">{{ $t('cancel') }}</button>
                    <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4">
                      {{ $t('add') }}
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
