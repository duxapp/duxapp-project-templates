/* eslint-disable import/no-commonjs */
const taroTransformer = require('@tarojs/rn-supporter/dist/taroTransformer')
const rnStyleTransformer = require('@tarojs/rn-style-transformer')
const utils = require('@tarojs/rn-supporter/dist/utils')
const lodash = require('lodash')
const themeLoader = require('../../duxapp/theme-loader')

const transform = async ({ src, filename, options }) => {
  if (/\.(scss|sass)/.test(filename)) {
    const config = await utils.getProjectConfig()
    return rnStyleTransformer.transform(themeLoader(src, filename), filename, lodash.merge({}, options, { config }))
  } else {
    return taroTransformer.transform({ src, filename, options })
  }
}

module.exports.transform = transform
