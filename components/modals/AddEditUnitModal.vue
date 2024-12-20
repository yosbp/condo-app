<script setup lang="ts">
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
  import Multiselect from '@suadelabs/vue3-multiselect';
  import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
  import useUnitStore from '~/stores/unitStore';
  import type { CreateUnit, Unit } from '~/types/Unit';
  import type { I18n } from 'vue-i18n';

  const { t } = useI18n<I18n>();

  interface Emit {
    (e: 'update:isModalVisible', value: boolean): void;
    (e: 'getUnits'): void;
  }

  interface Props {
    isModalVisible: boolean;
    params: any;
  }

  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits<Emit>();
  const unitStore = useUnitStore();
  const unitTypes = ref();
  const typeSelected = ref('');
  const unitTypeSelected = ref();

  const options = ref([
    { name: 'Casa', value: 'home' },
    { name: 'Apartamento', value: 'apartment' },
  ]);

  const unit = ref<CreateUnit>({
    unit_type_id: '',
    unit_number: '',
    owner_name: '',
    owner_phone: '',
    owner_email: '',
    balance: 0,
    type: '',
  });

  watchEffect(() => {
    unit.value = {
      unit_type_id: unitTypeSelected.value ? unitTypeSelected.value.id : '',
      unit_number: props.params.unit_number ? props.params.unit_number : '',
      owner_name: props.params.owner_name ? props.params.owner_name : '',
      owner_phone: props.params.owner_phone ? props.params.owner_phone : '',
      owner_email: props.params.owner_email ? props.params.owner_email : '',
      balance: props.params.balance ? props.params.balance : 0,
      type: props.params.type ? props.params.type : 'home',
    };
    unitTypes.value = unitStore.units_types;
  });

  const saveUnit = async () => {
    if (props.params.id) {
      //update unit
      let newUnit: any;
      newUnit = {
        id: props.params.id,
        owner_name: unit.value.owner_name,
        owner_phone: unit.value.owner_phone,
        owner_email: unit.value.owner_email,
      };

      try {
        await unitStore.updateUnit(newUnit);
        showMessage(t('unit-updated-successfully'));
        emit('update:isModalVisible', false);
        emit('getUnits');
      } catch (error) {
        showMessage(t('error-updating-unit'), 'error');
      }
    } else {
      //add unique unit
      try {
        await unitStore.createUnit(unit.value);
        showMessage(t('unit-created-successfully'));
        emit('update:isModalVisible', false);
        emit('getUnits');
      } catch (error) {
        showMessage(t('error-creating-unit'), 'error');
      }
    }
  };

  const handleCloseModal = () => {
    emit('update:isModalVisible', false);
  };

  const onSelect = (option: any) => {
    unit.value.type = option.value;
  };

  onMounted(() => {
    unitStore.getUnitTypes();
  });
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
                {{ props.params.id ? $t('edit-unit') : $t('add-unit') }}
              </div>
              <div class="p-5">
                <form @submit.prevent="saveUnit()">
                  <!-- Unit Type -->
                  <div class="mb-5">
                    <label for="name">{{ $t('unit-type') }}</label>
                    <multiselect
                      v-model="unitTypeSelected"
                      :options="unitTypes"
                      class="custom-multiselect"
                      label="name"
                      placeholder="Selecciona una opción"
                      :searchable="false"
                      :allow-empty="false"
                      selected-label=""
                      select-label=""
                      deselect-label=""
                    ></multiselect>
                  </div>
                  <!-- Unit Number -->
                  <div class="mb-5" v-if="!props.params.id">
                    <label for="number">{{ $t('unit-number') }}</label>
                    <input required id="name" type="text" placeholder="Ej. PB-1" class="form-input" v-model="unit.unit_number" />
                  </div>
                  <!-- Owner Name -->
                  <div class="mb-5">
                    <label for="name">{{ $t('owner-name') }}</label>
                    <input required id="name" type="text" :placeholder="$t('enter-owner-name')" class="form-input" v-model="unit.owner_name" />
                  </div>
                  <!-- Owner Phone -->
                  <div class="mb-5">
                    <label for="name">{{ $t('owner-phone') }}</label>
                    <input id="phone" type="text" :placeholder="$t('enter-owner-phone')" class="form-input" v-model="unit.owner_phone" />
                  </div>
                  <!-- Owner Email -->
                  <div class="mb-5">
                    <label for="name">{{ $t('owner-email') }}</label>
                    <input id="email" type="email" :placeholder="$t('enter-owner-email')" class="form-input" v-model="unit.owner_email" />
                  </div>
                  <!-- Balance -->
                  <div class="mb-5" v-if="!props.params.id">
                    <label for="balance">{{ $t('balance') }}</label>
                    <input required id="name" type="number" :placeholder="$t('enter-balance')" class="form-input" v-model="unit.balance" />
                  </div>
                  <!-- Type -->
                  <div class="mb-5" v-if="!props.params.id">
                    <label for="type">{{ $t('type') }}</label>
                    <multiselect
                      v-model="typeSelected"
                      :options="options"
                      class="custom-multiselect"
                      label="name"
                      :searchable="false"
                      placeholder="Selecciona una opción"
                      :preselect-first="true"
                      :allow-empty="false"
                      selected-label=""
                      select-label=""
                      deselect-label=""
                      @select="onSelect"
                    ></multiselect>
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
