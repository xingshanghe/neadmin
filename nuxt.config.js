module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Neadmin',
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
  /*
  ** Build configuration
  */
  build: {
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
      'element-ui'
    ],
    extractCSS: true,
    filenames: {
      vendor: 'vendor.[hash:12].js',
      app: 'hare.[chunkhash:12].js',
      css: 'hare.[contenthash:12].css'
    }
  },
  css: [
    'normalize.css/normalize.css',
    'element-ui/lib/theme-chalk/index.css'
  ],
  plugins: [
    '~/plugins/element-ui'
  ]
};
