export default {
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
            { text: 'Rules', link: '/rules' },
            { text: 'KCSgate Combat Data', link: '/kcsgatecombatdata'}
        ],
        sidebar: {
            text: 'Pages',
            items: [
            { text: 'Download', link: '/download' },
            { text: 'Guide', link: '/guide' },
            { text: 'Info', link: '/info' },
            { text: 'Rules', link: '/rules' },
            { text: 'KCSgate Combat Data', link: '/kcsgatecombatdata'}
            ]
        },

        socialLinks: [
            { icon: "github", link: "https://github.com/WD-BYPASS" },
            { icon: "discord", link: "https://discord.gg/b38E9wyuYp" },
            { icon: "gmail", link: "WDBYPASSdevteam@gmail.com"}
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
