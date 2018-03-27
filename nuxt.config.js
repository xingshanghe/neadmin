module.exports = {
  /*
  ** 页面头部信息
  */
  head: {
    titleTemplate: '%s - WEB-CONSOLE管理控制台',
    title: '欢迎',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'dop容器云管理系统，轻松构建属于你自己的容器云平台。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  isDev: (process.env.NODE_ENV !== 'production'),
  /*
  ** 自定义进度条颜色
  */
  loading: { color: '#3B8070' },
  /*
  ** 是否单页应用，开启服务端编译
  */
  mode: 'spa',
  /*
  ** 路由配置，中间件
  */
  router: {
    middleware: [
      'check-auth'
    ]
  },
  /*
  ** 公共样式
  */
  css: [
    'normalize.css/normalize.css',
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/icons/icomoon/styles.css',
    '~/assets/icons/iconfont/iconfont.css'
  ],
  /*
  ** 插件
  */
  plugins: [
    '~/plugins/element-ui.js',
    { src: '~/plugins/api', ssr: false },
    { src: '~/plugins/eventHub.js', ssr: false},
    { src: '~plugins/filters.js', ssr: false },
    { src: '~/plugins/viser-vue', ssr: false }
  ],
  /*
  ** 构建配置
  */
  build: {
    /*
    ** 保存时格式化代码
    */
    extend(config, ctx) {
      if (ctx.isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    },
    /*
    ** 自定义公共目录
    */
    publicPath: '/public/',
    /*
    ** 公共第三方库
    */
    vendor: [
      'axios',
      'element-ui',
      'viser-vue'
    ],
    extractCSS: true,
    /*
    ** 自定义文件名
    */
    filenames: {
      vendor: 'vendor.[id].[hash:12].js',
      app: 'ne.[id].[chunkhash:12].js',
      css: 'ne.[id].[contenthash:12].css'
    }
  }
};
