// eslint-disable-next-line import/no-commonjs
module.exports = {
  // 描点插入
  insert: {
    'android/app/proguard-rules.pro': {
      content: `# 支付宝
-keep class com.alipay.** { *; }`
    },
    'ios/duxapp/AppDelegate.mm': {
      appDelegate: (_config,apps) => {
        return `// react-native-alipay start

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
          annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}
${apps.includes('wechat')?'':`
- (BOOL)application:(UIApplication *)application
openURL:(NSURL *)url
options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
return [RCTLinkingManager application:application openURL:url options:options];
}`}

// react-native-alipay end`
      }
    }
  },
  // 锚点替换
  replace: {

  },
  // 对复制的文件进行处理
  copy: {},
  ios: {
    plist: {
      'duxapp/Info.plist': config => {
        const BundleId = config.ios?.BundleId || 'com.duxapp'
        return {
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
