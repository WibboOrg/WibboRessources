// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',

  devServer: {
    port: 3007
  },

  ssr: false,

  runtimeConfig: {
    public: {
      cdnUrl: process.env.NUXT_PUBLIC_CDN_URL,
      assetsUrl: process.env.NUXT_PUBLIC_ASSETS_URL,
      avatarUrl: process.env.NUXT_PUBLIC_AVATAR_URL,
      apiEndpoint: process.env.NUXT_PUBLIC_API_ENDPOINT
    }
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['.vue'],
      // Configurer les patterns pour les sous-dossiers
      pattern: '**/*.vue'
    }
  ],

  app: {
    head: {
      title: 'Wibbo: Ressource',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'JasonDhose#0001' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  typescript: {
    shim: false,
    strict: true,
  },

  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2024-12-28',
})