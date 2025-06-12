// eslint-disable-next-line import/no-commonjs
export default ({ config }) => {
  const { android, option } = config
  return {
    // 描点插入
    insert: {
      'android/app/proguard-rules.pro': {
        'content': `
  ##### 微信 ######
  -keep class com.tencent.mm.opensdk.** { *; }
  -keep class com.tencent.wxop.** { *; }
  -keep class com.tencent.mm.sdk.** { *; }`
      },
      'ios/Podfile': {
        'podEnd': `  pod 'WechatOpenSDK'`
      },
      'ios/duxapp/BridgingHeader.h': {
        import: `#import "WXApi.h"
#import <React/RCTLinkingManager.h>
`
      },
      'ios/duxapp/AppDelegate.swift': {
        'app.delegate': ', WXApiDelegate',
        app: `  // react-native-wechat-lib start

  override func application(_ application: UIApplication,
                            open url: URL,
                            options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    RCTLinkingManager.application(application, open: url, options: options)
    return WXApi.handleOpen(url, delegate: self)
  }

  // MARK: - 微信回调（Universal Link）
  override func application(_ application: UIApplication,
                            continue userActivity: NSUserActivity,
                            restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    RCTLinkingManager.application(application, continue: userActivity, restorationHandler: restorationHandler)
    return WXApi.handleOpenUniversalLink(userActivity, delegate: self)
  }

  // MARK: - WXApiDelegate
  func onReq(_ req: BaseReq) {
    // 可选：处理微信请求
  }

  func onResp(_ resp: BaseResp) {
    // 可选：处理微信响应，如登录/支付结果
    // 你可以用 NotificationCenter 通知 JS 层
  }
  // react-native-wechat-lib end`
      }
    },
    create: {
      'android/app/src/main/java/cn/duxapp/wxapi/WXEntryActivity.java': `package ${android.appid}.wxapi;

import android.app.Activity;
import android.os.Bundle;
import com.wechatlib.WeChatLibModule;

public class WXEntryActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WeChatLibModule.handleIntent(getIntent());
    finish();
  }
}
`,
      'android/app/src/main/java/cn/duxapp/wxapi/WXPayEntryActivity.java': `package ${android.appid}.wxapi;

import android.app.Activity;
import android.os.Bundle;
import com.wechatlib.WeChatLibModule;

public class WXPayEntryActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WeChatLibModule.handleIntent(getIntent());
    finish();
  }
}
`
    },
    android: {
      xml: {
        'app/src/main/AndroidManifest.xml': {
          tag: {
            queries: {
              child: '<package android:name="com.tencent.mm" />'
            }
          },
          attr: {
            'android:name=".MainApplication"': {
              child: `<activity
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
              CFBundleURLName: 'weixin',
              CFBundleURLSchemes: [
                option?.wechat?.appid || 'wx'
              ]
            }
          ],
          LSApplicationQueriesSchemes: ['weixin', 'wechat', 'weixinULAPI']
        },
        'duxapp/duxapp.entitlements': {
          'com.apple.developer.associated-domains': [
            `applinks:${option?.wechat?.applinks || 'duxapp.com'}`
          ]
        }
      }
    }
  }
}

