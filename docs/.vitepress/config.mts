import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "notfirefox",
  description: "Personal Website",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/intro' }
    ],

    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'Introduction', link: '/intro' },
          { text: 'Darwin', link: '/darwin' },
          { text: 'Linux', link: '/linux' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/notfirefox' }
    ]
  }
})
