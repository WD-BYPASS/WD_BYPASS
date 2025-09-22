import { defineConfig } from 'vitepress';

import { 
  InlineLinkPreviewElementTransform 
} from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'

export default defineConfig({
    vite: { 
    optimizeDeps: { 
      exclude: [ 
        '@nolebase/vitepress-plugin-inline-link-preview/client', 
      ], 
    }, 
    ssr: { 
      noExternal: [ 
        // If there are other packages that need to be processed by Vite, you can add them here.
        '@nolebase/vitepress-plugin-inline-link-preview', 
      ], 
    }, 
  }, 
    title: "WD_Bypass Website",
    description: "The website for WD_Bypass.",
    base: "/WD_BYPASS/",
    themeConfig: {
        siteTitle: "WD_Bypass Website",
        footer: {
            message: "Released under the CC BY-NC-ND 4.0 License.",
            copyright: "Copyright © 2025-present WD_Bypass",
        },
        nav: [
            { text: 'Download', link: '/download' },
            { text: 'Guide', link: '/guide' },
            { text: 'Info', link: '/info' },
            { text: 'Rules', link: '/rules' }
        ],
        sidebar: {
            text: 'Pages',
            items: [
                { text: 'Download', link: '/download' },
                { text: 'Guide', link: '/guide' },
                { text: 'Info', link: '/info' },
                { text: 'Rules', link: '/rules' }
            ]
        },

        socialLinks: [
            { icon: "github", link: "https://github.com/WD-BYPASS" },
        ],

        lastUpdated: {
            text: 'Updated at',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium'
            }
        },
        search: {
            provider: 'local'
        },
    },
    markdown: { 
        config(md) { 
          // other markdown-it configurations...
          md.use(InlineLinkPreviewElementTransform) 
        } 
    },
    head: [
        ['link', { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }]
    ],
});
