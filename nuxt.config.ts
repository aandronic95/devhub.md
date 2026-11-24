export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/i18n'],
  css: ['~/assets/css/fonts.css', '~/assets/css/main.css'],

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#f2f1ec' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },

  i18n: {
    baseUrl: 'https://devhub.md',
    defaultLocale: 'ro',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'ro', language: 'ro', name: 'Română', file: 'ro.json' },
      { code: 'en', language: 'en', name: 'English', file: 'en.json' },
      { code: 'ru', language: 'ru', name: 'Русский', file: 'ru.json' }
    ]
  },

  // Inline payloads: no /en/ or /ru/ folders that would shadow en.html and ru.html
  experimental: { payloadExtraction: false },

  nitro: {
    prerender: {
      // Emit /en.html instead of /en/index.html so GitHub Pages serves /en without a redirect
      autoSubfolderIndex: false,
      crawlLinks: true,
      routes: ['/', '/en', '/ru']
    }
  }
})
