export default {
  mode: 'universal',
  server: {
    host: '0.0.0.0'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/css/reset.css',
    '~/css/main.css',
    '~/css/grid.css',
    '~/css/decorate.css',
    '~/css/buttons.css',
    '~/css/mouse-scroll.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~/plugins/vue2-siema.js',
      ssr: false
    }, {
      src: '~/plugins/vue-scroll-reveal',
      ssr: false
    }, {
      src: 'plugins/owl.js',
      ssr: false
    }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    '@nuxtjs/apollo'
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GRAPH_URL,
        wsEndpoint: process.env.SOCKET_URL
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
