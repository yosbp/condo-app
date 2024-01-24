// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Sales Admin | VRISTO - Multipurpose Tailwind Dashboard Template',
      titleTemplate: '%s | VRISTO - Multipurpose Tailwind Dashboard Template',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no',
        },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/app.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n'],

  i18n: {
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'es', file: 'es.json' },
    ],
    lazy: true,
    defaultLocale: 'es',
    strategy: 'no_prefix',
    langDir: 'locales/',
  },
  vite: {
    optimizeDeps: { include: ['quill'] },
  },
  router: {
    options: { linkExactActiveClass: 'active' },
  },
})
