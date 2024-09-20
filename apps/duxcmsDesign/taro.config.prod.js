module.exports = {
  designWidth: 375,
  deviceRatio: {
    375: 1.25,
    640: 2.34 / 2,
    750: 0.5,
    828: 1.81 / 2
  },
  // framework: 'react',
  // h5: {
  //   output: {
  //     filename: 'js/[name].js',
  //     chunkFilename: 'js/[name].js',
  //     library: {
  //       type: 'commonjs-static'
  //     },
  //     asyncChunks: false
  //   },
  //   webpackChain(chain) {
  //     chain.merge({
  //       externals: {
  //         react: 'react'
  //       },
  //       optimization: {
  //         minimize: false
  //       }
  //     })
  //   },
  //   miniCssExtractPluginOption: {
  //     filename: 'css/[name].css',
  //     chunkFilename: 'css/[id].css'
  //   },
  // }
}
