// eslint-disable-next-line import/no-commonjs
const commonjs = require('vite-plugin-commonjs').default

module.exports = {
  plugins: [
    '@tarojs/plugin-platform-harmony-ets'
  ],
  harmony: {
    compiler: {
      type: 'vite',
      vitePlugins: [
        commonjs()
      ]
    },
    projectPath: './dist/harmony'
  }
}
