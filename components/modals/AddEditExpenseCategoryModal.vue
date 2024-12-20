<script setup lang="ts">
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
  import useExpenseStore from '~/stores/expenseStore';
  import type { CreateExpense } from '~/types/Expense';
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import type { I18n } from 'vue-i18n';
  import type { CreateExpenseCategory } from '~/types/ExpenseCategory';

  const { t } = useI18n<I18n>();
  interface Emit {
    (e: 'update:isModalVisible', value: boolean): void;
    (e: 'getExpensesCategories'): void;
  }

  interface Props {
    isModalVisible: boolean;
    params: any;
  }

  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits<Emit>();
  const expenseStore = useExpenseStore();

  const expenseCategory = ref<CreateExpenseCategory>({
    name: '',
    description: '',
  });

  watchEffect(() => {
    expenseCategory.value = {
      name: props.params.name ? props.params.name : '',
      description: props.params.description ? props.params.description : '',
    };
  });

  const saveExpenseCategory = async () => {
    if (props.params.id) {
      //update Expense
      let newExpenseCategory: any;
      newExpenseCategory = {
        id: props.params.id,
        name: expenseCategory.value.name,
        description: expenseCategory.value.description,
      };

      try {
        await expenseStore.updateExpenseCategory(newExpenseCategory);
        showMessage(t('expense-category-updated-successfully'));
        emit('update:isModalVisible', false);
        emit('getExpensesCategories');
      } catch (error) {
        showMessage(t('error-updating-expense-category'), 'error');
      }
    } else {
      //add unique expense
      try {
        await expenseStore.createExpenseCategory(expenseCategory.value);
        showMessage(t('expense-category-created-successfully'));
        emit('update:isModalVisible', false);
        emit('getExpensesCategories');
      } catch (error) {
        showMessage(t('error-creating-expense-category'), 'error');
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
                {{ props.params.id ? $t('edit-expense-category') : $t('new-expense-category') }}
              </div>
              <div class="p-5">
                <form @submit.prevent="saveExpenseCategory()">
                  <!-- Name -->
                  <div class="mb-5">
                    <label for="name">{{ $t('name') }}</label>
                    <input required id="name" type="text" :placeholder="$t('enter-name')" class="form-input" v-model="expenseCategory.name" />
                  </div>
                  <!-- Description -->
                  <div class="mb-5">
                    <label for="name">{{ $t('description') }}</label>
                    <input required id="name" type="text" :placeholder="$t('enter-description')" class="form-input" v-model="expenseCategory.description" />
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
