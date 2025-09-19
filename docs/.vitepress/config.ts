import { defineConfig } from 'vitepress'

export default defineConfig({
  // Site metadata
  title: 'WD_BYPASS',
  description: 'Hosting for WD_BYPASS website files and app distribution.',

  // Project Pages base path (https://wd-bypass.github.io/WD_BYPASS/)
  base: '/WD_BYPASS/',

  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'Info', link: '/info' },
      { text: 'Rules', link: '/rules' },
      { text: 'Download', link: '/download' },
      { text: 'GitHub', link: 'https://github.com/WD-BYPASS/WD_BYPASS' }
    ],
    sidebar: [
      {
        text: 'WD_BYPASS',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide' },
          { text: 'Info', link: '/info' },
          { text: 'Rules', link: '/rules' },
          { text: 'Download', link: '/download' }
        ]
      }
    ]
  }
})
