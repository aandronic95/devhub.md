<script setup lang="ts">
import { site } from '~/site.config'

const { t } = useI18n()

const services = ['sites', 'apps', 'mobile', 'shops', 'custom']
const principles = ['speed', 'seo', 'mobile', 'code']
const steps = ['brief', 'design', 'build', 'launch']
const faqKeys = ['time', 'mobile', 'seo', 'languages', 'stack', 'start']
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
    { id: 'services', label: t('nav.services'), nav: true },
    { id: 'why', label: t('nav.why'), nav: false },
    { id: 'process', label: t('nav.process'), nav: true },
    { id: 'stack', label: t('nav.stack'), nav: true },
    hasProjects && { id: 'projects', label: t('nav.projects'), nav: true },
    { id: 'faq', label: t('nav.faq'), nav: true },
    { id: 'contact', label: t('nav.contact'), nav: true }
  ].filter(Boolean) as { id: string; label: string; nav: boolean }[]
)

const navLinks = computed(() => sections.value.filter((s) => s.nav))

const pad = (n: number) => String(n + 1).padStart(2, '0')
const num = (id: string) => pad(sections.value.findIndex((s) => s.id === id))

const faq = computed(() =>
  faqKeys.map((key) => ({ q: t(`faq.items.${key}.q`), a: t(`faq.items.${key}.a`) }))
)

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.value.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a }
        }))
      })
    }
  ]
}))

const year = new Date().getFullYear()
</script>

<template>
  <div class="page">
    <AppHeader :links="navLinks" />

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
        <SectionHead id="services-title" :index="num('services')" :title="t('services.title')" />
        <ol class="rows">
          <li v-for="(key, i) in services" :key="key" class="row">
            <span class="row__index label">{{ pad(i) }}</span>
            <h3 class="row__title">{{ t(`services.items.${key}.title`) }}</h3>
            <p class="row__text">{{ t(`services.items.${key}.text`) }}</p>
          </li>
        </ol>
      </section>

      <section id="why" class="section section--tight" aria-labelledby="why-title">
        <SectionHead id="why-title" :index="num('why')" :title="t('why.title')" />
        <ul class="tiles">
          <li v-for="key in principles" :key="key" class="tile">
            <h3 class="tile__title">{{ t(`why.items.${key}.title`) }}</h3>
            <p class="tile__text">{{ t(`why.items.${key}.text`) }}</p>
          </li>
        </ul>
      </section>

      <section id="process" class="section" aria-labelledby="process-title">
        <SectionHead id="process-title" :index="num('process')" :title="t('process.title')" />
        <ol class="steps">
          <li v-for="(key, i) in steps" :key="key" class="step">
            <span class="step__index" aria-hidden="true">{{ pad(i) }}</span>
            <h3 class="step__title">{{ t(`process.steps.${key}.title`) }}</h3>
            <p class="step__text">{{ t(`process.steps.${key}.text`) }}</p>
          </li>
        </ol>
      </section>

      <section id="stack" class="section section--tight" aria-labelledby="stack-title">
        <SectionHead id="stack-title" :index="num('stack')" :title="t('stack.title')" />
        <dl class="stack">
          <div v-for="group in site.stack" :key="group.key" class="stack__group">
            <dt class="label">{{ t(`stack.groups.${group.key}`) }}</dt>
            <dd v-for="item in group.items" :key="item" class="stack__item">{{ item }}</dd>
          </div>
        </dl>
      </section>

      <section v-if="hasProjects" id="projects" class="section" aria-labelledby="projects-title">
        <SectionHead id="projects-title" :index="num('projects')" :title="t('projects.title')" />
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

      <section id="faq" class="section" aria-labelledby="faq-title">
        <SectionHead id="faq-title" :index="num('faq')" :title="t('faq.title')" />
        <FaqList :items="faq" />
      </section>

      <section id="contact" class="contact" aria-labelledby="contact-title">
        <div class="contact__intro">
          <span class="label">{{ num('contact') }}</span>
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
        </div>
        <ContactForm :services="services" />
      </section>
    </main>

    <footer class="footer">
      <span>© {{ year }} DevHub.md. {{ t('footer.rights') }}</span>
      <a href="#" class="footer__top">{{ t('footer.top') }} ↑</a>
    </footer>
  </div>
</template>
