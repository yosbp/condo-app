<script setup lang="ts">
  import useAuthStore from '~/stores/authStore';

  definePageMeta({
    layout: 'auth',
  });

  useHead({ title: 'Registro' });

  const feedback = ref('');
  const auth = useAuthStore();
  const router = useRouter();
  const credentials = ref({
    name: '',
    email: '',
    password: '',
    role: 'owner',
  });

  const register = async () => {
    feedback.value = '';
    try {
      await auth.register(credentials.value);
      router.push('/assign-condominium');
    } catch (error: any) {
      feedback.value = error;
    }
  };
</script>

<template>
  <div class="text-start mb-7">
    <a href="" class="grow block mb-8">
      <img class="h-16 mx-auto" src="/assets/images/logo.png" alt="images" />
    </a>

    <div class="text-center">
      <h3 class="text-2xl font-semibold text-dark mb-3">Crea tu Cuenta</h3>
      <p class="text-base font-medium text-light">Completa los datos para Registrar tu Cuenta</p>
    </div>
  </div>

  <form class="text-start w-full" @submit.prevent="register()">
    <div class="mb-4">
      <label for="fullname-addon" class="block text-base font-semibold text-dark mb-2">Nombre Completo</label>
      <input v-model="credentials.name" class="form-input" type="text" placeholder="Ingresa tu nombre completo" />
    </div>

    <div class="mb-4">
      <label for="email-addon" class="block text-base font-semibold text-dark mb-2">Email address</label>
      <input v-model="credentials.email" class="form-input" type="email" placeholder="Ingresa tu correo" />
    </div>

    <div class="mb-4">
      <label for="password-addon" class="block text-base font-semibold text-dark mb-2">Contraseña</label>

      <input v-model="credentials.password" type="password" class="form-input" placeholder="Ingresa tu contraseña" />
    </div>

    <div class="flex justify-between items-center flex-wrap gap-x-1 gap-y-2 mb-6 mt-3">
      <div class="inline-flex items-center">
        <input type="checkbox" class="form-checkbox" />
        <label class="text-base ms-2 text-light font-medium align-middle select-none"> Recuérdame </label>
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
        <span v-else>Registrarse</span>
      </button>
    </div>

    <div class="flex md:justify-between justify-center items-center mb-8 md:gap-9 gap-2"></div>
    <!-- Feedback Error -->
    <div v-if="feedback" class="flex items-center p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light">
      <span class="ltr:pr-2 rtl:pl-2">{{ feedback }}</span>
    </div>
    <p class="shrink text-light text-center">
      ¿Ya tienes una cuenta?
      <NuxtLink to="/login" class="text-dark font-semibold ms-1"><b>Inicia Sesión</b></NuxtLink>
    </p>
  </form>
</template>
