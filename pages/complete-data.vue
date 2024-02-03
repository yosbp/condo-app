<script setup lang="ts">
  import useCondoStore from '~/stores/condoStore';
  import Multiselect from '@suadelabs/vue3-multiselect';
  import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

  const options = ref([
    'Amazonas',
    'Anzoátegui',
    'Apure',
    'Aragua',
    'Barinas',
    'Bolívar',
    'Carabobo',
    'Cojedes',
    'Delta Amacuro',
    'Falcón',
    'Guárico',
    'Lara',
    'Mérida',
    'Miranda',
    'Monagas',
    'Nueva Esparta',
    'Portuguesa',
    'Sucre',
    'Táchira',
    'Trujillo',
    'La Guaira',
    'Yaracuy',
    'Zulia',
  ]);

  definePageMeta({
    layout: 'auth',
  });

  useHead({ title: 'Registro' });

  const feedback = ref('');
  const condoStore = useCondoStore();
  const router = useRouter();
  const condominium = ref({
    name: '',
    address: '',
    state: '',
    city: '',
    country: 'Venezuela',
    postal_code: '',
    phone: '',
    name_to_invoice: '',
    initial_balance: 0,
  });

  const createCondominium = async () => {
    feedback.value = '';
    try {
      await condoStore.createCondo(condominium.value);
      router.push('/');
    } catch (error: any) {
      feedback.value = error;
    }
  };
</script>

<template>
  <div class="text-start mb-7">
    <a href="index.html" class="grow block mb-8">
      <img class="h-16 mx-auto" src="/assets/images/logo.png" alt="images" />
    </a>

    <div class="text-center">
      <h3 class="text-2xl font-semibold text-dark mb-3">Crea tu Condominio</h3>
      <p class="text-base font-medium text-light">Completa los datos para registrar el Condominio</p>
    </div>
  </div>

  <form class="text-start w-full" @submit.prevent="createCondominium()">
    <!-- Name -->
    <div class="mb-4">
      <label class="block text-base font-semibold text-dark mb-2">Nombre del Condominio</label>
      <input v-model="condominium.name" class="form-input" type="text" placeholder="Ej. Condominio Pinos A" />
    </div>
    <div class="grid grid-cols-1 sm:flex justify-between gap-3 mb-4">
      <!-- State -->
      <div class="w-1/2">
        <label class="block text-base font-semibold text-dark mb-2">Estado</label>
        <multiselect
          v-model="condominium.state"
          :options="options"
          class="custom-multiselect"
          :searchable="true"
          placeholder="Selecciona un Estado"
          selected-label=""
          select-label=""
          deselect-label=""
          required
        ></multiselect>
      </div>
      <!-- City -->
      <div class="w-1/2">
        <label class="block text-base font-semibold text-dark mb-2">Ciudad</label>
        <input required v-model="condominium.city" type="text" class="form-input" placeholder="Ej. Charallave" />
      </div>
    </div>
    <!-- Address -->
    <div class="mb-4">
      <label class="block text-base font-semibold text-dark mb-2">Dirección</label>
      <input required v-model="condominium.address" type="text" class="form-input" placeholder="Ej. Calle 5, Sector Pinos" />
    </div>
    <div class="grid grid-cols-1 sm:flex justify-between gap-3 mb-4">
      <!-- Postal Code -->
      <div class="w-1/3">
        <label class="block text-base font-semibold text-dark mb-2">Código Postal</label>
        <input required v-model="condominium.postal_code" type="text" class="form-input" placeholder="Ej. 1210" />
      </div>
      <!-- Phone -->
      <div class="w-2/3">
        <label class="block text-base font-semibold text-dark mb-2">Teléfono</label>
        <input required v-model="condominium.phone" type="text" class="form-input" placeholder="Ej. 0212 222.22.22" />
      </div>
    </div>
    <!-- Initial Balance -->
    <div class="mb-4">
      <label class="block text-base font-semibold text-dark mb-2">Balance Inicial</label>
      <input v-model="condominium.initial_balance" type="number" class="form-input" placeholder="Ej. 1000000" />
    </div>
    <!-- Name To Invoice -->
    <div class="mb-8">
      <label class="block text-base font-semibold text-dark mb-2">Nombre para la Factura</label>
      <input
        v-model="condominium.name_to_invoice"
        type="text"
        class="form-input"
        placeholder="Ej. A.C. Junta de Condominio del Conj. Res. Valle Real Torre X. J-12221213-3"
        required
      />
    </div>

    <div class="text-center mb-7">
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
</template>
