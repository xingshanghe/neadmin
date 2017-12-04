module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - CMOP管理控制台',
    title: 'Welcome',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt + Element Admin System.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  mode: 'spa',
  /*
  ** Build configuration
  */
  build: {
    // ssr: false,
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    },
    publicPath: '/public/',
    vendor: [
      'axios',
      'element-ui',
      'viser-vue'
    ],
    extractCSS: true,
    filenames: {
      vendor: 'vendor.[hash:12].js',
      app: 'ne.[chunkhash:12].js',
      css: 'ne.[contenthash:12].css'
    }
  },
  render: {
    // ssr: false
  },
  router: {
    middleware: ['check-auth', 'menus']
  },
  css: [
    'normalize.css/normalize.css',
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/icons/icomoon/styles.css',
    '~/assets/css/icons/iconfont/iconfont.css'
  ],
  plugins: [
    '~/plugins/element-ui',
    '~/plugins/api',
    { src: '~/plugins/viser-vue', ssr: false }
  ]
};
