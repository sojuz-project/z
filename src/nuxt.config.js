/**
 * TODO - change SOJUZ_PROJECT from import module to enviromental var.
 * (now node manager don't have access to docker containers)
 * const SOJUZ_PROJECT = process.env.SOJUZ_PROJECT || 'zero';
 * */
const { SOJUZ_PROJECT } = require('/project/projects_archive/nuxt.project.js');
const { css } = require(`/project/projects_archive/${SOJUZ_PROJECT}/nuxt.css.js`);
export default {
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
  pwa: {
    manifest: {
      name: process.env.npm_package_name || '',
    },
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#000' },
  css: css,

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/init-gutenberg-blocks-parser',
    },
    {
      src: '~/plugins/lazysizes',
      ssr: false,
    },
    {
      src: '~/modules/toast/updateToastMessage',
    },
    {
      src: '~/modules/login/loginHelpers',
    },
    {
      src: '~/plugins/mobile-detect-mixin',
    },
  ],
  /*
   *  WordPress friendly routing
   */
  router: {
    extendRoutes(routes, resolve) {
      /*
       *  always app init from components/Page.vue
       */
      const PageComponent = resolve(__dirname, 'components/Page.vue');
      const Profile = resolve(__dirname, 'components/Profile.vue');
      /*
       *  to show any routing content with popup
       */
      const modalRoute = [
        {
          path: 'modal/:modalSlug',
          component: resolve(__dirname, 'components/Modal.vue'),
        },
      ];
      routes.push(
        ...[
          /*
           *  custom routes
           *  TODO - rename 'profile' route as 'panel'
           */
          {
            name: 'profile',
            path: '/profile/:slug',
            component: Profile,
            children: modalRoute,
          },
          {
            name: 'home',
            path: '/',
            component: PageComponent,
            children: modalRoute,
          },
          /*
           *  show any post by slug
           */
          {
            name: 'page',
            path: '/:slug',
            component: PageComponent,
            children: modalRoute,
          },
          /*
           *  to display posts with page template
           */
          {
            name: 'template',
            path: '/:slug/:post_name',
            component: PageComponent,
            children: modalRoute,
          },
          /*
           *  filters
           */
          {
            name: 'query_paginate',
            path: '/:slug/page/:page',
            component: PageComponent,
            children: modalRoute,
          },
          {
            name: 'query_filter',
            path: '/:slug/filter/:term_slug',
            component: PageComponent,
            children: modalRoute,
          },
          {
            name: 'query_filter_paginate',
            path: '/:slug/filter/:term_slug/page/:page',
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
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias.sojuzProject = `/project/projects_archive/${SOJUZ_PROJECT}`;
      /*
       *  Better debug:
       *  config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
       */
    },
    watch: ['../project/projects_archive'],
  },
};
