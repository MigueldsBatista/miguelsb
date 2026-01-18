// https://nuxt.com/docs/api/configuration/nuxt-config
const BACKEND_URL = import.meta.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000';

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vueuse/nuxt', // review
    '@pinia/nuxt', // review
    '@nuxt/icon' // review
  ],
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  alias: {
    '@': '/<rootDir>/frontend/'
  },
  devServer: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 3000
  },
  routeRules: {
    '/api': {
      cors: true,
      proxy: { to: `${BACKEND_URL}/api` }
    }
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: {
        indent: 'tab',
        semi: true,
        commaDangle: 'never',
        quotes: 'single'
      }
    }
  }
});
