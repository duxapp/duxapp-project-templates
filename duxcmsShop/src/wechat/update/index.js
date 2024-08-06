const replacePackageName = (content, { android }) => {
  return content.replaceAll('#packageName#', android.appid)
}

// eslint-disable-next-line import/no-commonjs
module.exports = {
  // 描点插入
  insert: {
    'android/app/src/main/AndroidManifest.xml': {
      'manifest.application': ({ android }) => {
        return `    <activity
      android:name=".wxapi.WXEntryActivity"
      android:label="@string/app_name"
      android:exported="true"
      android:taskAffinity="${android.appid}"
      android:launchMode="singleTask"
    />
    <activity
      android:name=".wxapi.WXPayEntryActivity"
      android:label="@string/app_name"
      android:exported="true"
    />`
      },
      'manifest.queries': `
    <!-- 微信 -->
    <package android:name="com.tencent.mm" />`
    },
    'ios/duxapp/AppDelegate.h': {
      import: '#import "WXApi.h"',
      'appDelegate.protocol': '  ,WXApiDelegate'
    },
    'ios/duxapp/AppDelegate.mm': {
      appDelegate: `// react-native-wechat-lib start

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url {
    return  [WXApi handleOpenURL:url delegate:self];
}

- (BOOL)application:(UIApplication *)application
  continueUserActivity:(NSUserActivity *)userActivity
  restorationHandler:(void(^)(NSArray<id<UIUserActivityRestoring>> * __nullable
  restorableObjects))restorationHandler {
  // 触发回调方法
  [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  return [WXApi handleOpenUniversalLink:userActivity
  delegate:self];
}

// Universal Links 配置文件, 没使用的话可以忽略。
// ios 9.0+
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
            options:(NSDictionary<NSString*, id> *)options
{
  // Triggers a callback event.
  // 触发回调事件
  [RCTLinkingManager application:application openURL:url options:options];
  return [WXApi handleOpenURL:url delegate:self];
}
// react-native-wechat-lib end`
    }
  },
  // 锚点替换
  replace: {

  },
  // 对复制的文件进行处理
  copy: {
    'android/app/src/main/java/com/duxapp/wxapi/WXEntryActivity.java': replacePackageName,
    'android/app/src/main/java/com/duxapp/wxapi/WXPayEntryActivity.java': replacePackageName
  },
  ios: {
    plist: {
      'duxapp/Info.plist': config => {
        return {
          CFBundleURLTypes: [
            {
              CFBundleTypeRole: 'Editor',
              CFBundleURLName: 'weixin',
              CFBundleURLSchemes: [
                `wx${config.option?.wechat?.appid || ''}`
              ]
            }
          ],
          LSApplicationQueriesSchemes: ['weixin', 'wechat', 'weixinULAPI']
        }
      }
    }
  }
}

