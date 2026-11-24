# devhub.md

Company website for DevHub.md. Built with Nuxt 3 and `@nuxtjs/i18n`, statically generated and hosted on GitHub Pages.

## Development

```bash
npm install
npm run dev
npm run generate   # static output in .output/public
```

## Structure

| Path | Purpose |
| --- | --- |
| `site.config.ts` | Contact details and portfolio projects |
| `i18n/locales/` | Copy for `ro` (default), `en`, `ru` |
| `pages/index.vue` | Page layout |
| `components/AppHeader.vue` | Header, navigation, language switcher |
| `assets/css/` | Styles and self-hosted fonts |
| `public/` | Static files: icons, Open Graph image, sitemap, robots |

Routes: `/`, `/en`, `/ru`. Each page has its own title, description, canonical URL and `hreflang` alternates.

## Deployment

Every push to `main` builds and publishes the site via `.github/workflows/deploy.yml`.
The custom domain `devhub.md` is configured in the repository Pages settings and in Cloudflare DNS.
