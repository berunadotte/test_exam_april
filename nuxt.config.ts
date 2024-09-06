export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  typescript: {
    strict: true,
  },
  modules: ['@pinia/nuxt', '@nuxt/fonts'],
  fonts: [{ name: 'Roboto', provider: 'google' }],
  runtimeConfig: {
    public: {
      API_KEY: process.env.API_KEY,
    },
  },
})
