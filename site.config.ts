// Datele tale – completează aici. Ce lași gol ('') nu apare pe site.
export const site = {
  name: 'DevHub.md',
  url: 'https://devhub.md',

  contact: {
    email: '', // ex: 'hello@devhub.md'
    phone: '', // ex: '+373 60 000 000'
    telegram: '', // doar username, ex: 'devhubmd'
    city: '' // ex: 'Chișinău, Moldova'
  },

  // Proiecte în portofoliu. Lista goală = secțiunea „Proiecte” nu apare.
  // Exemplu:
  // { name: 'RezervăOra', url: 'https://rezervaora.md', tag: 'SaaS', key: 'rezervaora' }
  // Descrierea fiecărui proiect se pune în i18n/locales/*.json la projects.items.<key>
  projects: [] as { name: string; url: string; tag: string; key: string }[]
}
