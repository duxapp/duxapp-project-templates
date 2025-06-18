/* eslint-disable import/no-commonjs */
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const { getMetroConfig } = require('@tarojs/rn-supporter')

const configs = require('./metro.user.config.js')

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const config = {}

module.exports = (async function () {
  const taroConfig = await getMetroConfig()

  // RN 端单独使用react19
  const oldResolveRequest = taroConfig.resolver.resolveRequest

  taroConfig.resolver.resolveRequest = (context, moduleName, platform) => {
    const ret = oldResolveRequest(context, moduleName, platform)
    if (['react', 'react/jsx-runtime'].includes(moduleName)) {
      ret.filePath = require.resolve(moduleName.replace('react', 'react19'))
    }
    return ret
  }

  // 主题系统
  taroConfig.transformer.babelTransformerPath = require.resolve('./src/duxappReactNative/metro/transformer')

  return mergeConfig(getDefaultConfig(__dirname), taroConfig, config, ...configs)
})()
