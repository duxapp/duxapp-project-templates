/* eslint-disable import/no-commonjs */

const plugins = []
if (process.env.TARO_ENV === 'rn') {
  plugins.push('react-native-worklets/plugin')
}

module.exports = {
  plugins
}
