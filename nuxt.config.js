export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  runtimeConfig: {
    adminPassword: process.env.NUXT_ADMIN_PASSWORD || ''
  }
})
