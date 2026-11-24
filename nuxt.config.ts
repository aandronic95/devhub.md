// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: ['@nuxtjs/i18n'],

  css: ['~/assets/main.css'],

  app: {
    // Pentru un domeniu propriu (devhub.md) rămâne '/'.
    // Fără domeniu (user.github.io/repo) setează NUXT_APP_BASE_URL=/repo/ la build.
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'ro' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'robots', content: 'index, follow' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap'
        }
      ]
    }
  },

  i18n: {
    baseUrl: 'https://devhub.md',
    defaultLocale: 'ro',
    strategy: 'prefix_except_default', // /  /en/  /ru/
    detectBrowserLanguage: false, // fiecare limbă are URL propriu – mai bine pentru SEO
    locales: [
      { code: 'ro', language: 'ro-MD', name: 'Română', file: 'ro.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'ru', language: 'ru-MD', name: 'Русский', file: 'ru.json' }
    ]
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en', '/ru']
    }
  }
})
