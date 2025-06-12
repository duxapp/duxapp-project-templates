import commonjs from 'vite-plugin-commonjs'

export default {
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
