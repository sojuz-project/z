import css from './css/default';
import clientState from './plugins/init-apollo-state';
export default {
  env: {
    STYLE_BASE: 'zero',
  },
  mode: 'universal',
  modern: 'server',
  server: {
    host: '0.0.0.0',
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#000' },
  /*
   ** Global CSS
   */
  css: css,
  // css: ['swiper/dist/css/swiper.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/init-global-components',
    },
    {
      src: '~/plugins/mixins',
    },
    {
      src: '~/plugins/lazysizes',
      ssr: false,
    },
    // {
    //   src: '~/plugins/vue-awesome-swiper.js',
    //   ssr: false,
    // },
  ],
  router: {
    extendRoutes(routes, resolve) {
      const PageComponent = resolve(__dirname, 'components/Page.vue');
      const PanelComponent = resolve(__dirname, 'components/Panel.vue');
      const modalRoute = [
        {
          // name: 'modal',
          path: 'modal/:modalSlug',
          component: resolve(__dirname, 'components/Modal.vue'),
        },
      ];

      routes.push(
        ...[
          {
            path: '/',
            component: PageComponent,
            children: modalRoute,
          },
          /* User panel */
          {
            name: 'bookmarks',
            path: '/panel/:slug',
            component: PanelComponent,
            children: modalRoute,
          },
          /* Lists pages */
          {
            name: 'slug',
            path: '/:slug',
            component: PageComponent,
            children: modalRoute,
          },
          {
            name: 'post',
            path: '/:slug/:postSlug',
            component: PageComponent,
            children: modalRoute,
          },
          {
            name: 'page',
            path: '/:slug/page/:page',
            component: PageComponent,
            children: modalRoute,
          },
          {
            name: 'category',
            path: '/:slug/category/:catSlug',
            component: PageComponent,
            children: modalRoute,
          },
          {
            name: 'categoryPage',
            path: '/:slug/category/:catSlug/page/:page',
            component: PageComponent,
            children: modalRoute,
          },
          {
            name: 'tag',
            path: '/:slug/tag/:tagSlug',
            component: PageComponent,
            children: modalRoute,
          },
          {
            name: 'tagPage',
            path: '/:slug/tag/:tagSlug/page/:page',
            component: PageComponent,
            children: modalRoute,
          },
        ]
      );
    },
  },
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', '@nuxtjs/apollo'],
  apollo: {
    clientConfigs: {
      default: '@/plugins/init-apollo-state.js',
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      const { STYLE_BASE = 'zero' } = process.env;
      config.resolve.alias.styleBase = `/app/css/${STYLE_BASE}`;

      // config.module.rules.push({
      //   enforce: 'pre',
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   exclude: /(node_modules)/,
      // });
    },
  },
};
