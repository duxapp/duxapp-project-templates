// eslint-disable-next-line import/no-commonjs
export default ({ config }) => {
  const { duxpush = {} } = config.option
  return {
    // 描点插入
    insert: {
      'android/app/build.gradle': {
        dependencies: `
      // duxpush
      implementation files("libs/vivo_pushSDK_v3.0.0.4_484.aar")
      implementation files("libs/push-3.0.0.aar")`
      },
      'android/build.gradle': {
        'allprojects.repositories': `
        // 配置HMS Core SDK的Maven仓地址。
        maven { url 'https://developer.huawei.com/repo/' }`
      },
      'ios/duxapp/AppDelegate.h': {
        import: `#import <UserNotifications/UserNotifications.h>`,
        'appDelegate.protocol': `  ,UNUserNotificationCenterDelegate`
      },
      'ios/duxapp/AppDelegate.mm': {
        import: '#import <RNDuxPush.h>',
        'appDelegate.didFinishLaunchingWithOptions': `[UNUserNotificationCenter currentNotificationCenter].delegate = self;
    [RNDuxPush application:application didFinishLaunchingWithOptions:launchOptions];`,
        appDelegate: `// react-native-dux-push start
  - (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
  {

    [RNDuxPush application:application didRegisterUserNotificationSettings:notificationSettings];

  }

  - (void)application:(UIApplication *)app
  didFailToRegisterForRemoteNotificationsWithError:(NSError *)err
  {
    NSLog(@"推送注册失败：%@", err);
  }

  - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
  {
    [RNDuxPush application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];

  }

  - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification
  {
    [RNDuxPush application:application didReceiveRemoteNotification:notification];

  }

  - (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
    [RNDuxPush application:application didReceiveLocalNotification:notification];

  }

  // ios 10
  // 应用在前台收到通知
  - (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
    [RNDuxPush userNotificationCenter:center willPresentNotification:notification withCompletionHandler:completionHandler];
  }

  // 点击通知进入应用
  - (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
    [RNDuxPush userNotificationCenter:center didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
    completionHandler();
  }

  // react-native-dux-push end`
      }
    },
    android: {
      xml: {
        'app/src/main/AndroidManifest.xml': {
          tag: {
            manifest: {
              child: `<permission android:name="com.duxapp.permission.MIPUSH_RECEIVE" android:protectionLevel="signature" />
    <uses-permission android:name="com.duxapp.permission.MIPUSH_RECEIVE" />`
            }
          },
          attr: {
            'android:name=".MainApplication"': {
              child: `<!-- 小米推送 -->
    <meta-data
      android:name="com.xm.push.appid"
      android:value="\\${duxpush?.xm?.appid || ''}" />
    <meta-data
      android:name="com.xm.push.appkey"
      android:value="\\${duxpush?.xm?.appkey || ''}" />

    <!-- 华为推送 -->
    <meta-data
      android:name="com.huawei.hms.client.appid"
      android:value="${duxpush?.hms?.appid || ''}" />

    <!-- vivo推送 -->
    <meta-data
      android:name="com.vivo.push.app_id"
      android:value="${duxpush?.vivo?.appid || ''}" />
    <meta-data
      android:name="com.vivo.push.api_key"
      android:value="${duxpush?.vivo?.apikey || ''}" />
    <!-- oppo -->
    <meta-data
      android:name="com.oppo.push.app_key"
      android:value="${duxpush?.oppo?.appid || ''}"/>
    <meta-data
      android:name="com.oppo.push.app_secret"
      android:value="${duxpush?.oppo?.appSecret || ''}"/>`
            }
          }
        }
      }
    },
    ios: {
      plist: {
        'duxapp/duxapp.entitlements': {
          'aps-environment': 'development'
        }
      }
    }
  }
}


