<script setup lang="ts">
  import useAuthStore from '~/stores/authStore';
  import { useRouter } from 'vue-router';

  definePageMeta({
    layout: 'auth',
  });

  useHead({ title: 'Iniciar Sesión' });

  const feedback = ref('');
  const auth = useAuthStore();
  const router = useRouter();
  const credentials = ref({
    email: '',
    password: '',
  });

  const login = async () => {
    feedback.value = '';
    try {
      const response = await auth.login(credentials.value);
      if (response.condominium === null) {
        router.push('/complete-data');
      } else {
        router.push('/');
      }
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
      <h3 class="text-2xl font-semibold text-dark mb-3">Bienvenido a Condo-App</h3>
      <p class="text-base font-medium text-light">Completa los datos para Iniciar Sesión</p>
    </div>
  </div>

  <form class="text-start w-full" @submit.prevent="login()">
    <div class="mb-4">
      <label for="email-addon" class="block text-base font-semibold text-dark mb-2">Correo</label>
      <input v-model="credentials.email" type="email" placeholder="email@mail.com" class="form-input" required />
    </div>

    <div class="mb-4">
      <label for="password-addon" class="block text-base font-semibold text-dark mb-2">Contraseña</label>
      <div class="flex">
        <input v-model="credentials.password" type="password" placeholder="Ingresa tu Contraseña" class="form-input" required />
      </div>
    </div>

    <div class="flex justify-between items-center flex-wrap gap-x-1 gap-y-2 mb-6 mt-3">
      <div class="inline-flex items-center">
        <input
          type="checkbox"
          id="checkbox-signin"
          class="h-4 w-4 text-base rounded border-gray-300 text-dark focus:ring focus:ring-default-950/30 focus:ring-offset-0"
        />
        <label class="text-base ms-2 text-light font-medium align-middle select-none" for="checkbox-signin">Recuerdame</label>
      </div>
      <!-- <a href="auth-recoverpw.html" class="text-base text-dark"><small>Forgot your password?</small></a> -->
    </div>

    <div class="text-center mb-7">
      <button
        type="submit"
        class="w-full inline-flex items-center justify-center px-6 py-2.5 bg-primary font-bold text-base text-white rounded-md transition-all duration-500"
      >
        <span
          v-if="auth.loading"
          class="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"
        ></span>
        <span v-else>Inicia Sesión</span>
      </button>
    </div>

    <!-- Feedback Error -->
    <div v-if="feedback" class="flex items-center p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light">
      <span class="ltr:pr-2 rtl:pl-2">{{ feedback }}</span>
    </div>
    <p class="shrink text-light text-center">
      Todavía no tienes una cuenta ?
      <NuxtLink to="/register" class="text-dark font-semibold ms-1"><b>Registrate</b></NuxtLink>
    </p>
  </form>
</template>
