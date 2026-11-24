# devhub.md

Site de prezentare pentru DevHub.md — Nuxt 3 + @nuxtjs/i18n (RO / EN / RU), generat static pentru GitHub Pages.

## Pornire

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # site static în .output/public
```

## Unde modifici

| Ce | Fișier |
|---|---|
| Email, telefon, Telegram, oraș, proiecte | `site.config.ts` |
| Textele în fiecare limbă | `i18n/locales/ro.json`, `en.json`, `ru.json` |
| Culori, fonturi, spații | `assets/main.css` (variabilele din `:root`) |
| Structura paginii | `pages/index.vue` |

URL-uri: `/` (română), `/en`, `/ru`. Fiecare are titlu, descriere, `canonical` și `hreflang` proprii.

## Deploy pe GitHub Pages

1. Urcă proiectul într-un repo pe GitHub, branch `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. La fiecare push, `.github/workflows/deploy.yml` construiește și publică site-ul.
4. Domeniu propriu: `public/CNAME` conține `devhub.md`. La registrar adaugă recordurile DNS pentru GitHub Pages
   (A: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153), apoi bifează „Enforce HTTPS”.
   Fără domeniu (user.github.io/repo): șterge `public/CNAME` și decomentează `NUXT_APP_BASE_URL` în workflow.

## După lansare

Adaugă site-ul în Google Search Console și trimite `https://devhub.md/sitemap.xml`.
