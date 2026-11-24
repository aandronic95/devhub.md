<script setup lang="ts">
defineProps<{ links: { id: string; label: string }[] }>()

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <header class="header">
    <NuxtLinkLocale to="/" class="header__logo" aria-label="DevHub.md">
      devhub<span class="accent">.md</span>
    </NuxtLinkLocale>

    <nav class="header__nav" :aria-label="t('nav.main')">
      <a v-for="link in links" :key="link.id" :href="`#${link.id}`">{{ link.label }}</a>
    </nav>

    <nav class="header__langs" :aria-label="t('nav.language')">
      <NuxtLink
        v-for="l in locales"
        :key="l.code"
        :to="switchLocalePath(l.code)"
        :hreflang="l.language"
        :lang="l.code"
        :title="l.name"
        :aria-current="l.code === locale ? 'page' : undefined"
      >
        {{ l.code }}
      </NuxtLink>
    </nav>
  </header>
</template>
