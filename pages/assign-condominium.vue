<script setup lang="ts">
  import useCondoStore from '~/stores/condoStore';
  import useUnitStore from '~/stores/unitStore';
  import Multiselect from '@suadelabs/vue3-multiselect';
  import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
  import useUserStore from '~/stores/userStore';
  import type { OwnerUser } from '~/types/User';

  const options = ref();

  definePageMeta({
    layout: 'auth',
  });

  useHead({ title: 'Registro' });

  const feedback = ref('');
  const condoStore = useCondoStore();
  const unitStore = useUnitStore();
  const userStore = useUserStore();
  const router = useRouter();
  const condominiumSelect = ref({
    condominium_id: '',
    unit_id: '',
  });
  const selectedCondo = ref('');
  const selectedUnit = ref('');
  const units = ref([]);
  const user = ref<OwnerUser>();

  watchEffect(() => {
    options.value = condoStore.condominiums;
    user.value = userStore.user;
  });

  const assignCondominium = async () => {
    feedback.value = '';
    try {
      await unitStore.assignUnitToOwner(condominiumSelect.value);
      userStore.me();
      /* router.push('/user'); */
    } catch (error: any) {
      feedback.value = error;
    }
  };

  // function to verify if the owner has verify with timer each 1 minute
  

  onMounted(() => {
    condoStore.getCondominiums();
    userStore.me();
  });

  const verifyUser = () => {
    if (user.value && user.value.owner && user.value.owner.unit_id && user.value.owner.is_verified) {
      router.push('/user');
    }
  };

  watch(() => user.value, () => {
    verifyUser();
  });

  const onSelect = (option: any) => {
    condominiumSelect.value.condominium_id = option.id;
    units.value = option.units;
  };

  const onSelectUnit = (option: any) => {
    condominiumSelect.value.unit_id = option.id;
  };
</script>

<template>
  <div v-show="user && user.id">
    <div class="text-start mb-7" v-if="user && user.owner && user.owner.unit_id === null && !user.owner.is_verified">
      <img class="h-16 mx-auto mb-8" src="/assets/images/logo.png" alt="images" />

      <div class="text-center mb-6">
        <h3 class="text-2xl font-semibold text-dark mb-3">Selecciona tu Condominio</h3>
        <p class="text-base font-medium text-light">Completa los datos para registrar el Condominio</p>
      </div>

      <form class="text-start w-full" @submit.prevent="assignCondominium()">
        <!-- Select condominium -->
        <div class="mb-5">
          <label class="block text-base font-semibold text-dark mb-2">Condominio</label>
          <multiselect
            v-model="selectedCondo"
            :options="options"
            class="custom-multiselect"
            label="name"
            placeholder="Selecciona una opción"
            :searchable="false"
            :allow-empty="false"
            selected-label=""
            select-label=""
            deselect-label=""
            @select="onSelect"
            required
          ></multiselect>
        </div>

        <div class="mb-8" v-if="units.length">
          <label class="block text-base font-semibold text-dark mb-2">Unidad</label>
          <multiselect
            v-model="selectedUnit"
            :options="units"
            class="custom-multiselect"
            label="name"
            placeholder="Selecciona una opción"
            :searchable="false"
            :allow-empty="false"
            selected-label=""
            select-label=""
            deselect-label=""
            @select="onSelectUnit"
            required
          ></multiselect>
        </div>

        <div class="text-center">
          <button
            type="submit"
            class="w-full inline-flex items-center justify-center px-6 py-2.5 bg-primary font-bold text-base text-white rounded-md transition-all duration-500"
          >
            <span
              v-if="condoStore.loading"
              class="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"
            ></span>
            <span v-else>Guardar</span>
          </button>
        </div>

        <div class="flex md:justify-between justify-center items-center md:gap-9 gap-2"></div>
        <!-- Feedback Error -->
        <div v-if="feedback" class="flex items-center p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light">
          <span class="ltr:pr-2 rtl:pl-2">{{ feedback }}</span>
        </div>
      </form>
    </div>
    <div v-else>
      <a href="" class="grow block mb-8">
        <img class="h-16 mx-auto" src="/assets/images/logo.png" alt="images" />
      </a>
      <div class="text-center p-3.5 rounded text-success bg-success-light dark:bg-success-dark-light">
        <h1 class="text-2xl mb-4">Ya tienes un Condominio Asignado</h1>
        <h2>Debes esperar la aprobación de tu administrador</h2>
      </div>
      <p class="text-base text-light mt-6 mb-3 font-bold">Si deseas cambiar de condominio, por favor contacta a soporte</p>
    </div>
  </div>
</template>
