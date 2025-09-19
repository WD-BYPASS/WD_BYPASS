export default {
    title: "WD_Bypass Website",
    description: "The website for WD_Bypass.",
    base: "/WD_Bypass-Website/",
    themeConfig: {
        siteTitle: "WD_Bypass Website",
        footer: {
            message: "Released under the CC BY-NC-ND 4.0 License.",
            copyright: "Copyright © 2025-present WD_Bypass",
        },
        nav: [
        ],
        sidebar: [
        ],

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
    head: [
        ['link', { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }]
    ],
};
