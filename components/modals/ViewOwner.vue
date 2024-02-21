<script setup lang="ts">
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
  import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
  import 'flatpickr/dist/flatpickr.css';
  import type { I18n } from 'vue-i18n';
  import usePaymentStore from '~/stores/paymentStore';
  import useOwnerStore from '~/stores/ownerStore';
  import type { Owner } from '~/types/Owner';

  const { t } = useI18n<I18n>();

  interface Emit {
    (e: 'update:isModalVisible', value: boolean): void;
    (e: 'getOwners'): void;
  }

  interface Props {
    isModalVisible: boolean;
    params: Owner;
  }

  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits<Emit>();
  const ownerStore = useOwnerStore();

  const approveOwner = async () => {
    // Approve owner
    try {
      await ownerStore.approveOwner(props.params.id);
      showMessage(t('owner-approved-successfully'));
      emit('update:isModalVisible', false);
      emit('getOwners');
    } catch (error) {
      showMessage(t('error-approve-owner'), 'error');
    }
  };

  const unlinkOwner = async () => {
    // Unlink owner
    try {
      await ownerStore.unlinkOwner(props.params.id);
      showMessage(t('owner-unlinked-successfully'));
      emit('update:isModalVisible', false);
      emit('getOwners');
    } catch (error) {
      showMessage(t('error-unlink-owner'), 'error');
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
                {{ $t('view-owner') }}
              </div>
              <div class="p-5">
                <!-- Add a list to only see owner, not inputs -->
                <div class="max-w-2xl overflow-hidden shadow sm:rounded-lg">
                  <div>
                    <dl>
                      <div class="px-4 py-5 bg-gray-50 dark:bg-[#121c2c] sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-extrabold">Full name</dt>
                        <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">{{ props.params.name }}</dd>
                      </div>
                      <div class="px-4 py-5 bg-white dark:bg-[#121c2c] sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-extrabold">{{ $t('unit') }}</dt>
                        <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">{{ props.params.unit }}</dd>
                      </div>
                      <div class="px-4 py-5 bg-gray-50 dark:bg-[#121c2c] sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-extrabold">{{ $t('email') }}</dt>
                        <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">{{ props.params.email }}</dd>
                      </div>
                      <div class="px-4 py-5 bg-white dark:bg-[#121c2c] sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-extrabold">{{ $t('status') }}</dt>
                        <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">{{ props.params.status }}</dd>
                      </div>
                      <div class="px-4 py-5 bg-white dark:bg-[#121c2c] sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-extrabold">{{ $t('created-at') }}</dt>
                        <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">{{ formatDate(props.params.created_at) }}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div class="flex justify-end gap-4 mt-5">
                  <button v-if="props.params.status === 'Not Verified'" type="button" class="btn btn-success" @click="approveOwner()">
                    {{ $t('approve') }}
                  </button>
                  <button v-if="props.params.status === 'Verified'" type="button" class="btn btn-danger" @click="unlinkOwner()">
                    {{ $t('unlink') }}
                  </button>
                  <button type="button" class="btn btn-outline-primary" @click="handleCloseModal()">{{ $t('cancel') }}</button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
