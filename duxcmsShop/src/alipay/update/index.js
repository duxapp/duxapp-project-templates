// eslint-disable-next-line import/no-commonjs
module.exports = ({ config, apps }) => {
  const BundleId = config.ios?.BundleId || 'com.duxapp'
  return {
    // 描点插入
    insert: {
      'android/app/proguard-rules.pro': {
        content: `# 支付宝
  -keep class com.alipay.** { *; }`
      },
      'ios/duxapp/AppDelegate.mm': {
        import: apps.includes('wechat') ? '' : '#import <React/RCTLinkingManager.h>',
        appDelegate: `// react-native-alipay start

  - (BOOL)application:(UIApplication *)application
              openURL:(NSURL *)url
    sourceApplication:(NSString *)sourceApplication
            annotation:(id)annotation
  {
    return [RCTLinkingManager application:application openURL:url
                        sourceApplication:sourceApplication annotation:annotation];
  }
  ${apps.includes('wechat') ? '' : `
  - (BOOL)application:(UIApplication *)application
  openURL:(NSURL *)url
  options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
  {
  return [RCTLinkingManager application:application openURL:url options:options];
  }`}

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
