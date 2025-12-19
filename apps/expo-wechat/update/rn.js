// eslint-disable-next-line import/no-commonjs
export default ({ config }) => {
  const { android, option = {} } = config
  const wechat = option['expo-wechat'] || option['react-native-wechat-lib'] || option.wechat || {}
  return {
    // 描点插入
    insert: {
      'android/app/proguard-rules.pro': {
        'content': `
  ##### 微信 ######
  -keep class com.tencent.mm.opensdk.** { *; }
  -keep class com.tencent.wxop.** { *; }
  -keep class com.tencent.mm.sdk.** { *; }`
      }
    },
    ios: {
      plist: {
        'duxapp/Info.plist': {
          CFBundleURLTypes: [
            {
              CFBundleTypeRole: 'Editor',
              CFBundleURLName: 'weixin',
              CFBundleURLSchemes: [
                wechat.appid || 'wx'
              ]
            }
          ],
          // LSApplicationQueriesSchemes: ['weixin', 'wechat', 'weixinULAPI']
        },
        'duxapp/duxapp.entitlements': {
          'com.apple.developer.associated-domains': [
            `applinks:${wechat.applinks || 'duxapp.com'}`
          ]
        }
      }
    }
  }
}

