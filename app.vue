<script setup lang="ts">
import { site } from '~/site.config'

const { t } = useI18n()
const head = useLocaleHead({ dir: true, lang: true, seo: true })

useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang, dir: head.value.htmlAttrs?.dir },
  link: [...(head.value.link || [])],
  meta: [...(head.value.meta || [])]
}))

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogType: 'website',
  ogSiteName: site.name,
  twitterCard: 'summary'
})
</script>

<template>
  <NuxtPage />
</template>
