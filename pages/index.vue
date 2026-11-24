<script setup lang="ts">
import { site } from '~/site.config'

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const services = [
  { key: 'sites', icon: 'M3 5h18v12H3zM8 21h8M12 17v4' },
  { key: 'apps', icon: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z' },
  { key: 'shops', icon: 'M5 7h14l-1.5 9h-11zM9 7V5a3 3 0 0 1 6 0v2M9 20h.01M16 20h.01' },
  { key: 'custom', icon: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16' }
]

const c = site.contact
const contacts = [
  c.email && { label: 'contact.email', value: c.email, href: `mailto:${c.email}` },
  c.phone && { label: 'contact.phone', value: c.phone, href: `tel:${c.phone.replace(/\s/g, '')}` },
  c.telegram && { label: 'contact.telegram', value: '@' + c.telegram, href: `https://t.me/${c.telegram}` },
  c.city && { label: 'contact.city', value: c.city, href: '' }
].filter(Boolean) as { label: string; value: string; href: string }[]

const hasProjects = site.projects.length > 0
const year = new Date().getFullYear()

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: site.name,
        url: site.url,
        logo: site.url + '/favicon.svg',
        ...(c.email && { email: c.email }),
        ...(c.phone && { telephone: c.phone }),
        knowsLanguage: ['ro', 'en', 'ru'],
        areaServed: 'MD'
      })
    }
  ]
})
</script>

<template>
  <div class="page">
    <header class="header wrap">
      <NuxtLinkLocale to="/" class="logo" aria-label="devhub.md">
        devhub<span class="accent">.md</span>
      </NuxtLinkLocale>

      <nav class="nav" :aria-label="t('nav.services')">
        <a href="#services">{{ t('nav.services') }}</a>
        <a v-if="hasProjects" href="#projects">{{ t('nav.projects') }}</a>
        <a href="#contact">{{ t('nav.contact') }}</a>
      </nav>

      <nav class="langs" :aria-label="t('nav.language')">
        <NuxtLink
          v-for="l in locales"
          :key="l.code"
          :to="switchLocalePath(l.code)"
          :hreflang="l.language"
          :lang="l.code"
          :title="l.name"
          :aria-current="l.code === locale ? 'page' : undefined"
          class="lang"
          :class="{ active: l.code === locale }"
        >
          {{ l.code.toUpperCase() }}
        </NuxtLink>
      </nav>
    </header>

    <main>
      <section class="hero wrap">
        <h1>
          <span class="wordmark">devhub<span class="accent">.md</span></span>
          <span class="tagline">{{ t('hero.tagline') }}</span>
        </h1>
        <p class="lead">{{ t('hero.text') }}</p>
        <div class="actions">
          <a href="#contact" class="btn primary">{{ t('hero.cta') }}</a>
          <a href="#services" class="btn">{{ t('hero.secondary') }}</a>
        </div>
      </section>

      <section id="services" class="section wrap">
        <div class="section-head">
          <h2>{{ t('services.title') }}</h2>
          <p>{{ t('services.lead') }}</p>
        </div>
        <ul class="grid">
          <li v-for="s in services" :key="s.key" class="card">
            <svg class="icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path :d="s.icon" />
            </svg>
            <h3>{{ t(`services.items.${s.key}.title`) }}</h3>
            <p>{{ t(`services.items.${s.key}.text`) }}</p>
          </li>
        </ul>
      </section>

      <section v-if="hasProjects" id="projects" class="section wrap">
        <div class="section-head">
          <h2>{{ t('projects.title') }}</h2>
          <p>{{ t('projects.lead') }}</p>
        </div>
        <ul class="grid">
          <li v-for="p in site.projects" :key="p.key">
            <a :href="p.url" target="_blank" rel="noopener" class="card project">
              <span class="tag">{{ p.tag }}</span>
              <h3>{{ p.name }}</h3>
              <p>{{ t(`projects.items.${p.key}`) }}</p>
              <span class="open">{{ t('projects.open') }} →</span>
            </a>
          </li>
        </ul>
      </section>

      <section id="contact" class="section wrap contact">
        <h2>{{ t('contact.title') }}</h2>
        <p class="lead">{{ t('contact.text') }}</p>
        <dl v-if="contacts.length" class="contacts">
          <div v-for="item in contacts" :key="item.label">
            <dt>{{ t(item.label) }}</dt>
            <dd>
              <a v-if="item.href" :href="item.href">{{ item.value }}</a>
              <span v-else>{{ item.value }}</span>
            </dd>
          </div>
        </dl>
      </section>
    </main>

    <footer class="footer wrap">
      <span>© {{ year }} DevHub.md. {{ t('footer.rights') }}</span>
    </footer>
  </div>
</template>
