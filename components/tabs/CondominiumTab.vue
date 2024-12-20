<template>
  <div v-if="condominium && condominium.name">
    <form class="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-[#0e1726]">
      <h6 class="mb-5 text-lg font-bold">{{ $t('condominium-information') }}</h6>
      <div class="flex flex-col sm:flex-row">
        <div class="mb-5 w-full sm:w-4/12 ltr:sm:mr-4 rtl:sm:ml-4">
          <img :src="previewImage ? previewImage : (condominium.image_url ? condominium.image_url : '/assets/images/mini-logo.png')"  alt="" class="mx-auto h-20 w-20 rounded-full object-cover md:h-32 md:w-32" />
          <div class="mt-3">
            <input
              id="ctnFile"
              type="file"
              accept="image/*"
              class="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary"
              @change="onPreviewImage"
              required
            />
          </div>
        </div>
        <div class="w-full">
          <!-- Name -->
          <div class="mb-4">
            <label class="block text-base font-semibold mb-2">{{ $t('condominium-name') }}</label>
            <input v-model="condominium.name" class="form-input" type="text" placeholder="Ej. Condominio Pinos A" />
          </div>
          <div class="grid grid-cols-1 sm:flex justify-between gap-3 mb-4">
            <!-- State -->
            <div class="w-1/2">
              <label class="block text-base font-semibold mb-2">{{ $t('state') }}</label>
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
              <label class="block text-base font-semibold mb-2">{{ $t('city') }}</label>
              <input required v-model="condominium.city" type="text" class="form-input" placeholder="Ej. Charallave" />
            </div>
          </div>
          <!-- Address -->
          <div class="mb-4">
            <label class="block text-base font-semibold mb-2">{{ $t('address') }}</label>
            <input required v-model="condominium.address" type="text" class="form-input" placeholder="Ej. Calle 5, Sector Pinos" />
          </div>
          <div class="grid grid-cols-1 sm:flex justify-between gap-3 mb-4">
            <!-- Postal Code -->
            <div class="w-1/3">
              <label class="block text-base font-semibold mb-2">{{ $t('postal-code') }}</label>
              <input required v-model="condominium.postal_code" type="text" class="form-input" placeholder="Ej. 1210" />
            </div>
            <!-- Phone -->
            <div class="w-2/3">
              <label class="block text-base font-semibold mb-2">{{ $t('phone') }}</label>
              <input required v-model="condominium.phone" type="text" class="form-input" placeholder="Ej. 0212 222.22.22" />
            </div>
          </div>
          <!-- Name to Invoice -->
          <div class="mb-8">
            <label class="block text-base font-semibold mb-2">{{ $t('name-for-invoice') }}</label>
            <input
              v-model="condominium.name_to_invoice"
              type="text"
              class="form-input"
              placeholder="Ej. A.C. Junta de Condominio del Conj. Res. Valle Real Torre X. J-12221213-3"
              required
            />
          </div>
          <div class="mt-3 sm:col-span-2">
            <button type="button" class="btn btn-primary" @click="saveCondominium">{{ $t('save') }}</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
  import type { CondominiumResponse, UpdateCondominium } from '~/types/Condominium';
  import Multiselect from '@suadelabs/vue3-multiselect';
  import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
  import type { I18n } from 'vue-i18n';
  import useCondoStore from '~/stores/condoStore';

  const condominiumStore = useCondoStore();
  const { t } = useI18n<I18n>();
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

  interface Emit {
    (e: 'getCondominium'): void;
  }
  interface Props {
    condominium: CondominiumResponse;
  }

  const previewImage = ref();
  const onPreviewImage = (event: any) => {
    const file = event.target.files && event.target.files[0];

    if (!file) {
      console.error('No se seleccionó ningún archivo');
      return;
    }

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      console.error('El archivo seleccionado no es una imagen');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      previewImage.value = reader.result; // Almacena el base64 en la variable
    };

    reader.onerror = (error) => {
      console.error('Error al leer el archivo:', error);
    };

    reader.readAsDataURL(file); // Leer el archivo como Base64
  };

  const uploadImage = async () => {
    await condominiumStore.uploadImage(condominium.value.id, previewImage.value);
  };

  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits<Emit>();
  const condominium = ref();

  const saveCondominium = async () => {
    //update Condominium
    let condominiumData: UpdateCondominium;
    condominiumData = {
      name: condominium.value.name,
      state: condominium.value.state,
      city: condominium.value.city,
      address: condominium.value.address,
      postal_code: condominium.value.postal_code,
      phone: condominium.value.phone,
      name_to_invoice: condominium.value.name_to_invoice,
    };

    if (previewImage.value) {
      await uploadImage();
    }

    try {
      await condominiumStore.updateCondominium(condominium.value.id, condominiumData);
      showMessage(t('condominium-updated-successfully'));
      emit('getCondominium');
    } catch (error) {
      showMessage(t('condominium-updated-error'), 'error');
    }
  };

  watchEffect(() => {
    condominium.value = props.condominium.condominium;
  });
</script>
