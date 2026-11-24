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
    email: 'info@devhub.md',
    phone: '',
    telegram: '',
    city: ''
  },

  // Contact form submissions are delivered to this address
  formEndpoint: 'https://formsubmit.co/ajax/info@devhub.md',

  stack: [
    { key: 'frontend', items: ['Vue', 'Nuxt', 'React', 'Next.js'] },
    { key: 'mobile', items: ['React Native', 'Android', 'iOS'] },
    { key: 'backend', items: ['Laravel', 'PHP'] },
    { key: 'data', items: ['MySQL', 'PostgreSQL', 'Docker'] }
  ],

  // Descriptions live in i18n/locales/*.json under projects.items.<key>
  projects: [] as Project[]
}
