/* eslint-disable import/no-commonjs */
const commonjs = require('vite-plugin-commonjs').default

module.exports = {
  plugins: [
    '@tarojs/plugin-platform-harmony-cpp'
  ],
  harmony: {
    compiler: {
      type: 'vite',
      vitePlugins: [
        commonjs()
      ]
    },
    projectPath: './dist/harmony',
    hapName: 'entry',
    ohPackage: {
      dependencies: {
        '@taro-oh/library': 'file:../../../src/duxappHarmony/library.har'
      }
    }
  }
}
