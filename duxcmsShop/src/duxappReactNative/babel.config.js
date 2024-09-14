/* eslint-disable import/no-commonjs */

const config = process.env.TARO_ENV === 'rn' ?
  {
    presets: [
      // [
      //   'module:@react-native/babel-preset',
      //   {
      //     useTransformReactJSXExperimental: true
      //   }
      // ],
      // 'babel-preset-expo'
    ]
  } :
  {}

module.exports = config
