<script setup lang="ts">
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
  import Multiselect from '@suadelabs/vue3-multiselect';
  import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
  import useIncomeStore from '~/stores/incomeStore';
  import type { CreateIncome } from '~/types/Income';
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import useUnitStore from '~/stores/unitStore';
  import type { Unit } from '~/types/Unit';
  import type { I18n } from 'vue-i18n';

  const { t } = useI18n<I18n>();

  interface Emit {
    (e: 'update:isModalVisible', value: boolean): void;
    (e: 'getIncomes'): void;
  }

  interface Props {
    isModalVisible: boolean;
    params: any;
  }

  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits<Emit>();
  const incomeStore = useIncomeStore();
  const unitStore = useUnitStore();
  const options = ref();
  const selectedUnit = ref<Unit>();
  const selectedMethod = ref<string>('');
  const selectedBank = ref<any>('');

  const income = ref<CreateIncome>({
    unit_id: '',
    description: '',
    method: '',
    bank: null,
    amount: 0,
    date: new Date(),
  });

  watchEffect(() => {
    income.value.unit_id = selectedUnit.value ? selectedUnit.value.id : '';
    income.value.method = selectedMethod.value ? selectedMethod.value : '';
    income.value.bank = selectedBank.value ? selectedBank.value : null;
    options.value = unitStore.units;
  });

  const saveIncome = async () => {
    if (props.params.id) {
      //update Income
      let newIncome: any;
      newIncome = {
        id: props.params.id,
        description: income.value.description,
        amount: income.value.amount,
        date: income.value.date,
      };

      try {
        await incomeStore.updateIncome(newIncome);
        showMessage(t('income-updated-successfully'));
        emit('update:isModalVisible', false);
        emit('getIncomes');
      } catch (error) {
        showMessage(t('error-creating-income'), 'error');
      }
    } else {
      //add unique income
      try {
        await incomeStore.createIncome(income.value);
        showMessage(t('income-created-successfully'));
        emit('update:isModalVisible', false);
        emit('getIncomes');
      } catch (error) {
        showMessage(t('error-creating-income'), 'error');
      }
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
                {{ props.params.id ? $t('edit-income') : $t('new-income') }}
              </div>
              <div class="p-5">
                <form @submit.prevent="saveIncome()">
                  <!-- Unit -->
                  <div class="mb-5">
                    <label for="name">{{ $t('unit') }}</label>
                    <multiselect
                      v-model="selectedUnit"
                      :options="options"
                      class="custom-multiselect"
                      :searchable="true"
                      :placeholder="$t('select-unit')"
                      label="unit_number"
                      selected-label=""
                      select-label=""
                      deselect-label=""
                      required
                    ></multiselect>
                  </div>
                  <!-- Description -->
                  <div class="mb-5">
                    <label for="name">{{ $t('description') }}</label>
                    <input required id="name" type="text" :placeholder="$t('enter-description')" class="form-input" v-model="income.description" />
                  </div>
                  <!-- Payment Method -->
                  <div class="mb-5">
                    <label for="name">{{ $t('payment-method') }}</label>
                    <multiselect
                      v-model="selectedMethod"
                      :options="['Transferencia', 'Pago Movil', 'Efectivo']"
                      class="custom-multiselect"
                      :searchable="true"
                      :placeholder="$t('select-payment-method')"
                      selected-label=""
                      select-label=""
                      deselect-label=""
                      required
                    ></multiselect>
                  </div>
                  <!-- Bank -->
                  <div class="mb-5" v-if="selectedMethod === 'Transferencia' || selectedMethod === 'Pago Movil'">
                    <label for="name">{{ $t('bank') }}</label>
                    <multiselect
                      v-model="selectedBank"
                      :options="['Banesco', 'Mercantil', 'Provincial', 'Venezuela', 'Bicentenario', 'Banco del Tesoro', 'Banco de Venezuela', 'Otro']"
                      class="custom-multiselect"
                      :searchable="true"
                      :placeholder="$t('select-bank')"
                      selected-label=""
                      select-label=""
                      deselect-label=""
                      required
                    ></multiselect>
                  </div>
                  <!-- Amount -->
                  <div class="mb-5">
                    <label for="amount">{{ $t('amount') }}</label>
                    <input required id="amount" type="number" :placeholder="$t('enter-amount')" class="form-input" v-model="income.amount" step="0.01" />
                  </div>
                  <!-- Date -->
                  <div class="mb-5">
                    <label for="date">{{ $t('date') }}</label>
                    <flat-pickr :config="rangeCalendar" v-model="income.date" class="form-input"></flat-pickr>
                  </div>
                  <div class="mt-8 flex items-center justify-end">
                    <button type="button" class="btn btn-outline-danger" @click="handleCloseModal()">{{ $t('cancel') }}</button>
                    <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4">
                      {{ props.params.id ? $t('update') : $t('add') }}
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
