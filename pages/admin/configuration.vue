<script lang="ts" setup>
  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
  import type { I18n } from 'vue-i18n';
  import CondominiumTab from '~/components/tabs/CondominiumTab.vue';
  import PaymentMethodsTab from '~/components/tabs/PaymentMethodsTab.vue';
  import useCondoStore from '~/stores/condoStore';

  const { t } = useI18n<I18n>();

  useHead({ title: t('condominium-settings') });

  const condominiumStore = useCondoStore();
  const condominium = ref();

  watchEffect(() => {
    condominium.value = condominiumStore.condominium;
  });

  const getCondominium = async () => {
    let id = JSON.parse(localStorage.getItem('condominium') as string).id;
    await condominiumStore.getCondominium(id);
  };

  onMounted(async () => {
    getCondominium();
  });
</script>

<template>
  <div>
    <div class="my-2 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">{{ $t('configuration') }}</h5>
    </div>
    <TabGroup>
      <TabList class="mb-5 flex overflow-y-auto whitespace-nowrap border-b border-[#ebedf2] font-semibold dark:border-[#191e3a]">
        <Tab as="template" v-slot="{ selected }">
          <a
            href="javascript:;"
            class="flex gap-2 border-b border-transparent p-4 !outline-none hover:border-primary hover:text-primary"
            :class="{ '!border-primary text-primary': selected }"
          >
            <icon-home />
            {{ $t('condominium') }}
          </a>
        </Tab>
        <Tab as="template" v-slot="{ selected }">
          <a
            href="javascript:;"
            class="flex gap-2 border-b border-transparent p-4 !outline-none hover:border-primary hover:text-primary"
            :class="{ '!border-primary text-primary': selected }"
          >
            <icon-dollar-sign-circle />
            {{ $t('billing-preferences') }}
          </a>
        </Tab>
        <Tab as="template" v-slot="{ selected }">
          <a
            href="javascript:;"
            class="flex gap-2 border-b border-transparent p-4 !outline-none hover:border-primary hover:text-primary"
            :class="{ '!border-primary text-primary': selected }"
          >
            <icon-user class="w-5 h-5" />
            Preferences
          </a>
        </Tab>
        <Tab as="template" v-slot="{ selected }">
          <a
            href="javascript:;"
            class="flex gap-2 border-b border-transparent p-4 !outline-none hover:border-primary hover:text-primary"
            :class="{ '!border-primary text-primary': selected }"
          >
            <icon-phone />
            Danger Zone
          </a>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CondominiumTab :condominium="condominium" @get-condominium="getCondominium()" />
        </TabPanel>
        <TabPanel>
          <PaymentMethodsTab />
        </TabPanel>
        <TabPanel>
          <div class="switch">
            <div class="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div class="panel space-y-5">
                <h5 class="mb-4 text-lg font-semibold">Choose Theme</h5>
                <div class="flex justify-around">
                  <label class="inline-flex cursor-pointer">
                    <input class="form-radio cursor-pointer ltr:mr-4 rtl:ml-4" type="radio" name="flexRadioDefault" checked />
                    <span>
                      <img class="ms-3" width="100" height="68" alt="settings-dark" src="/assets/images/settings-light.svg" />
                    </span>
                  </label>

                  <label class="inline-flex cursor-pointer">
                    <input class="form-radio cursor-pointer ltr:mr-4 rtl:ml-4" type="radio" name="flexRadioDefault" />
                    <span>
                      <img class="ms-3" width="100" height="68" alt="settings-light" src="/assets/images/settings-dark.svg" />
                    </span>
                  </label>
                </div>
              </div>
              <div class="panel space-y-5">
                <h5 class="mb-4 text-lg font-semibold">Activity data</h5>
                <p>Download your Summary, Task and Payment History Data</p>
                <button type="button" class="btn btn-primary">Download Data</button>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div class="panel space-y-5">
                <h5 class="mb-4 text-lg font-semibold">Public Profile</h5>
                <p>Your <span class="text-primary">Profile</span> will be visible to anyone on the network.</p>
                <label class="relative h-6 w-12">
                  <input type="checkbox" class="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0" id="custom_switch_checkbox1" />
                  <span
                    for="custom_switch_checkbox1"
                    class="block h-full rounded-full bg-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"
                  ></span>
                </label>
              </div>
              <div class="panel space-y-5">
                <h5 class="mb-4 text-lg font-semibold">Show my email</h5>
                <p>Your <span class="text-primary">Email</span> will be visible to anyone on the network.</p>
                <label class="relative h-6 w-12">
                  <input type="checkbox" class="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0" id="custom_switch_checkbox2" />
                  <span
                    for="custom_switch_checkbox2"
                    class="block h-full rounded-full bg-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"
                  ></span>
                </label>
              </div>
              <div class="panel space-y-5">
                <h5 class="mb-4 text-lg font-semibold">Enable keyboard shortcuts</h5>
                <p>When enabled, press <span class="text-primary">ctrl</span> for help</p>
                <label class="relative h-6 w-12">
                  <input type="checkbox" class="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0" id="custom_switch_checkbox3" />
                  <span
                    for="custom_switch_checkbox3"
                    class="block h-full rounded-full bg-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"
                  ></span>
                </label>
              </div>
              <div class="panel space-y-5">
                <h5 class="mb-4 text-lg font-semibold">Hide left navigation</h5>
                <p>Sidebar will be <span class="text-primary">hidden</span> by default</p>
                <label class="relative h-6 w-12">
                  <input type="checkbox" class="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0" id="custom_switch_checkbox4" />
                  <span
                    for="custom_switch_checkbox4"
                    class="block h-full rounded-full bg-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"
                  ></span>
                </label>
              </div>
              <div class="panel space-y-5">
                <h5 class="mb-4 text-lg font-semibold">Advertisements</h5>
                <p>Display <span class="text-primary">Ads</span> on your dashboard</p>
                <label class="relative h-6 w-12">
                  <input type="checkbox" class="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0" id="custom_switch_checkbox5" />
                  <span
                    for="custom_switch_checkbox5"
                    class="block h-full rounded-full bg-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"
                  ></span>
                </label>
              </div>
              <div class="panel space-y-5">
                <h5 class="mb-4 text-lg font-semibold">Social Profile</h5>
                <p>Enable your <span class="text-primary">social</span> profiles on this network</p>
                <label class="relative h-6 w-12">
                  <input type="checkbox" class="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0" id="custom_switch_checkbox6" />
                  <span
                    for="custom_switch_checkbox6"
                    class="block h-full rounded-full bg-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"
                  ></span>
                </label>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div class="switch">
            <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div class="panel space-y-5">
                <h5 class="mb-4 text-lg font-semibold">Purge Cache</h5>
                <p>Remove the active resource from the cache without waiting for the predetermined cache expiry time.</p>
                <button class="btn btn-secondary">Clear</button>
              </div>
              <div class="panel space-y-5">
                <h5 class="mb-4 text-lg font-semibold">Deactivate Account</h5>
                <p>You will not be able to receive messages, notifications for up to 24 hours.</p>
                <label class="relative h-6 w-12">
                  <input type="checkbox" class="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0" id="custom_switch_checkbox7" />
                  <span
                    for="custom_switch_checkbox7"
                    class="block h-full rounded-full bg-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"
                  ></span>
                </label>
              </div>
              <div class="panel space-y-5">
                <h5 class="mb-4 text-lg font-semibold">Delete Account</h5>
                <p>Once you delete the account, there is no going back. Please be certain.</p>
                <button class="btn btn-danger btn-delete-account">Delete my account</button>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
