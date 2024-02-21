<script setup lang="ts">
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
  import Multiselect from '@suadelabs/vue3-multiselect';
  import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
  import useUnitStore from '~/stores/unitStore';
  import type { CreateUnit, Unit } from '~/types/Unit';
  import type { I18n } from 'vue-i18n';
  import type { CreateUnitType } from '~/types/UnitType';

  const { t } = useI18n<I18n>();

  interface Emit {
    (e: 'update:isModalVisible', value: boolean): void;
    (e: 'getUnitsTypes'): void;
  }

  interface Props {
    isModalVisible: boolean;
    params: any;
  }

  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits<Emit>();
  const unitStore = useUnitStore();

  const options = ref([
    { name: 'Casa', value: 'home' },
    { name: 'Apartamento', value: 'apartment' },
  ]);

  const unitType = ref<CreateUnitType>({
    name: '',
    description: '',
    percentage: 0,
  });

  const typeSelected = ref('');

  watchEffect(() => {
    unitType.value = {
      name: props.params.name ? props.params.name : '',
      description: props.params.description ? props.params.description : '',
      percentage: props.params.percentage ? props.params.percentage : 0,
    };
  });

  const saveUnit = async () => {
    if (props.params.id) {
      //update unit
      let newUnitType: any;
      newUnitType = {
        id: props.params.id,
        name: unitType.value.name,
        description: unitType.value.description,
        percentage: unitType.value.percentage,
      };

      try {
        await unitStore.updateUnitType(newUnitType);
        showMessage(t('unit-type-updated-successfully'));
        emit('update:isModalVisible', false);
        emit('getUnitsTypes');
      } catch (error) {
        showMessage(t('error-updating-unit'), 'error');
      }
    } else {
      //add unique unit
      try {
        await unitStore.createUnitType(unitType.value);
        showMessage(t('unit-type-created-successfully'));
        emit('update:isModalVisible', false);
        emit('getUnitsTypes');
      } catch (error) {
        showMessage(t('error-creating-unit-type'), 'error');
      }
    }
  };

  const handleCloseModal = () => {
    emit('update:isModalVisible', false);
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
                {{ props.params.id ? $t('edit-unit-type') : $t('add-unit-type') }}
              </div>
              <div class="p-5">
                <form @submit.prevent="saveUnit()">
                  <!-- Unit Number -->
                  <div class="mb-5">
                    <label for="name">{{ $t('name') }}</label>
                    <input required id="name" type="text" placeholder="Ej. Apartamento Esquina" class="form-input" v-model="unitType.name" />
                  </div>
                  <!-- Owner Name -->
                  <div class="mb-5">
                    <label for="name">{{ $t('description') }}</label>
                    <input required id="name" type="text" :placeholder="$t('enter-description')" class="form-input" v-model="unitType.description" />
                  </div>
                  <!-- Balance -->
                  <div class="mb-5">
                    <label for="name">{{ $t('percentage') }}</label>
                    <div class="flex">
                      <div
                        class="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]"
                      >
                        %
                      </div>
                      <input required step="0.01" type="number" :placeholder="$t('enter-percentage')" class="form-input" v-model="unitType.percentage" />
                    </div>
                  </div>
                  <div class="mt-8 flex items-center justify-end">
                    <button type="button" class="btn btn-outline-danger" @click="handleCloseModal()">Cancel</button>
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
