<script setup lang="ts">
import { site } from '~/site.config'

const { t, locale } = useI18n()
const i18nHead = useLocaleHead({ dir: true, lang: true, seo: true })

const ogImage = `${site.url}/og.png`

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: i18nHead.value.link,
  meta: i18nHead.value.meta,
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${site.url}/#organization`,
            name: site.name,
            url: site.url,
            logo: `${site.url}/icon-512.png`,
            ...(site.contact.email && { email: site.contact.email }),
            ...(site.contact.phone && { telephone: site.contact.phone })
          },
          {
            '@type': 'WebSite',
            '@id': `${site.url}/#website`,
            url: site.url,
            name: site.name,
            inLanguage: locale.value,
            publisher: { '@id': `${site.url}/#organization` }
          }
        ]
      })
    }
  ]
}))

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogType: 'website',
  ogSiteName: site.name,
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: site.name,
  twitterCard: 'summary_large_image',
  twitterImage: ogImage
})
</script>

<template>
  <NuxtPage />
</template>
