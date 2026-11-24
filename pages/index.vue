<script setup lang="ts">
import { site } from '~/site.config'

const { t } = useI18n()

const services = ['sites', 'apps', 'shops', 'custom']
const steps = ['brief', 'design', 'build', 'launch']
const hasProjects = site.projects.length > 0

const { email, phone, telegram, city } = site.contact
const contacts = [
  email && { key: 'email', value: email, href: `mailto:${email}` },
  phone && { key: 'phone', value: phone, href: `tel:${phone.replace(/\s/g, '')}` },
  telegram && { key: 'telegram', value: `@${telegram}`, href: `https://t.me/${telegram}` },
  city && { key: 'city', value: city, href: '' }
].filter(Boolean) as { key: string; value: string; href: string }[]

const sections = computed(() =>
  [
    { id: 'services', label: t('nav.services') },
    { id: 'process', label: t('nav.process') },
    hasProjects && { id: 'projects', label: t('nav.projects') },
    { id: 'contact', label: t('nav.contact') }
  ].filter(Boolean) as { id: string; label: string }[]
)

const sectionNumber = (id: string) =>
  String(sections.value.findIndex((s) => s.id === id) + 1).padStart(2, '0')

const year = new Date().getFullYear()
const pad = (n: number) => String(n + 1).padStart(2, '0')
</script>

<template>
  <div class="page">
    <AppHeader :links="sections" />

    <main>
      <section class="hero">
        <p class="hero__tagline label">{{ t('hero.tagline') }}</p>
        <h1 class="hero__title">
          <span class="hero__word">devhub<span class="accent">.md</span><span class="caret" aria-hidden="true" /></span>
          <span class="visually-hidden"> — {{ t('hero.tagline') }}</span>
        </h1>
        <div class="hero__bottom">
          <p class="hero__text">{{ t('hero.text') }}</p>
          <div class="hero__actions">
            <a href="#contact" class="btn btn--solid">{{ t('hero.cta') }}</a>
            <a href="#services" class="btn">{{ t('hero.secondary') }}</a>
          </div>
        </div>
      </section>

      <section id="services" class="section" aria-labelledby="services-title">
        <header class="section__head">
          <span class="label">{{ sectionNumber('services') }}</span>
          <h2 id="services-title" class="section__title">{{ t('services.title') }}</h2>
        </header>
        <ol class="rows">
          <li v-for="(key, i) in services" :key="key" class="row">
            <span class="row__index label">{{ pad(i) }}</span>
            <h3 class="row__title">{{ t(`services.items.${key}.title`) }}</h3>
            <p class="row__text">{{ t(`services.items.${key}.text`) }}</p>
          </li>
        </ol>
      </section>

      <section id="process" class="section" aria-labelledby="process-title">
        <header class="section__head">
          <span class="label">{{ sectionNumber('process') }}</span>
          <h2 id="process-title" class="section__title">{{ t('process.title') }}</h2>
        </header>
        <ol class="steps">
          <li v-for="(key, i) in steps" :key="key" class="step">
            <span class="step__index" aria-hidden="true">{{ pad(i) }}</span>
            <h3 class="step__title">{{ t(`process.steps.${key}.title`) }}</h3>
            <p class="step__text">{{ t(`process.steps.${key}.text`) }}</p>
          </li>
        </ol>
      </section>

      <section v-if="hasProjects" id="projects" class="section" aria-labelledby="projects-title">
        <header class="section__head">
          <span class="label">{{ sectionNumber('projects') }}</span>
          <h2 id="projects-title" class="section__title">{{ t('projects.title') }}</h2>
        </header>
        <ul class="projects">
          <li v-for="project in site.projects" :key="project.key">
            <a :href="project.url" target="_blank" rel="noopener" class="project">
              <span class="label">{{ project.tag }}</span>
              <h3 class="project__name">{{ project.name }}</h3>
              <p class="project__text">{{ t(`projects.items.${project.key}`) }}</p>
              <span class="project__open">{{ t('projects.open') }} ↗</span>
            </a>
          </li>
        </ul>
      </section>

      <section id="contact" class="contact" aria-labelledby="contact-title">
        <span class="label">{{ sectionNumber('contact') }}</span>
        <h2 id="contact-title" class="contact__title">{{ t('contact.title') }}</h2>
        <p class="contact__text">{{ t('contact.text') }}</p>
        <dl v-if="contacts.length" class="contact__list">
          <div v-for="item in contacts" :key="item.key">
            <dt class="label">{{ t(`contact.${item.key}`) }}</dt>
            <dd>
              <a v-if="item.href" :href="item.href">{{ item.value }}</a>
              <template v-else>{{ item.value }}</template>
            </dd>
          </div>
        </dl>
      </section>
    </main>

    <footer class="footer">
      <span>© {{ year }} DevHub.md. {{ t('footer.rights') }}</span>
      <a href="#" class="footer__top">{{ t('footer.top') }} ↑</a>
    </footer>
  </div>
</template>
