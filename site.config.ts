export interface Project {
  key: string
  name: string
  url: string
  tag: string
}

export const site = {
  name: 'DevHub.md',
  url: 'https://devhub.md',

  // Empty values are not rendered
  contact: {
    email: '',
    phone: '',
    telegram: '',
    city: ''
  },

  // Descriptions live in i18n/locales/*.json under projects.items.<key>
  projects: [] as Project[]
}
