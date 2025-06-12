// eslint-disable-next-line import/no-commonjs
export default ({ config, apps }) => {
  const BundleId = config.ios?.BundleId || 'com.duxapp'
  return {
    // 描点插入
    insert: {
      'android/app/proguard-rules.pro': {
        content: `# 支付宝
  -keep class com.alipay.** { *; }`
      },
      'ios/duxapp/BridgingHeader.h': {
        import: apps.includes('wechat') ? '' : '#import <React/RCTLinkingManager.h>'
      },
      'ios/duxapp/AppDelegate.swift': {
        app: `  // react-native-alipay start
  func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return RCTLinkingManager.application(app, open: url, options: options)
  }
  // react-native-alipay end`
      }
    },
    abdroid: {
      xml: {
        'app/src/main/AndroidManifest.xml': {
          tag: {
            queries: {
              child: '<package android:name="com.eg.android.AlipayGphone" />'
            }
          }
        }
      }
    },
    ios: {
      plist: {
        'duxapp/Info.plist': {
          CFBundleURLTypes: [
            {
              CFBundleTypeRole: 'Editor',
              CFBundleURLName: 'alipay',
              CFBundleURLSchemes: [
                `${BundleId.replace(/\./g, '')}`
              ]
            }
          ],
          LSApplicationQueriesSchemes: ['alipay', 'alipays']
        }
      }
    }
  }
}
