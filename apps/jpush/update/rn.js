// eslint-disable-next-line import/no-commonjs
export default ({ config }) => {
  const jpush = config.option?.jpush || {}
  return {
    insert: {
      'android/app/build.gradle': {
        'android.defaultConfig': `manifestPlaceholders = [
              JPUSH_APPKEY: "${jpush.key}",
              JPUSH_CHANNEL: "${jpush.channel || 'duxapp'}"
          ]`,
        dependencies: `implementation project(':jpush-react-native')
      implementation project(':jcore-react-native')`
      },
      'android/settings.gradle': {
        after: `include ':jpush-react-native'
project(':jpush-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/jpush-react-native/android')
include ':jcore-react-native'
project(':jcore-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/jcore-react-native/android')
`
      },
      'android/app/src/main/java/cn/duxapp/MainApplication.kt': {
        import: 'import cn.jiguang.plugins.push.JPushModule',
        onCreate: `    JPushModule.registerActivityLifecycle(this)`
      },
      'ios/duxapp/AppDelegate.h': {
        import: `#import <RCTJPushModule.h>`,
        'appDelegate.protocol': `  ,JPUSHRegisterDelegate`
      },
      'ios/duxapp/AppDelegate.mm': {
        import: `#import <RCTJPushModule.h>
#import "JPUSHService.h"`,
        'appDelegate.didFinishLaunchingWithOptions': `
// JPush初始化配置 可以延时初始化 不再强制在此初始化，在js里可以直接调用init
  [JPUSHService setupWithOption:launchOptions appKey:@"${jpush.key}"
                        channel:@"${jpush.channel || 'duxapp'}" apsForProduction:YES];
  // APNS
  JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
  if (@available(iOS 12.0, *)) {
    entity.types = JPAuthorizationOptionNone; //JPAuthorizationOptionAlert|JPAuthorizationOptionBadge|JPAuthorizationOptionSou//nd|JPAuthorizationOptionProvidesAppNotificationSettings;
  }
  [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];`,
        appDelegate: `
//************************************************JPush start************************************************

//注册 APNS 成功并上报 DeviceToken
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [JPUSHService registerDeviceToken:deviceToken];
}

//iOS 7 APNS
- (void)application:(UIApplication *)application didReceiveRemoteNotification:  (NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  // iOS 10 以下 Required
  NSLog(@"iOS 7 APNS");
  [JPUSHService handleRemoteNotification:userInfo];
  [[NSNotificationCenter defaultCenter] postNotificationName:J_APNS_NOTIFICATION_ARRIVED_EVENT object:userInfo];
  completionHandler(UIBackgroundFetchResultNewData);
}

//iOS 10 前台收到消息
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center  willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler {
  NSDictionary * userInfo = notification.request.content.userInfo;
  if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    // Apns
    NSLog(@"iOS 10 APNS 前台收到消息");
    [JPUSHService handleRemoteNotification:userInfo];
    [[NSNotificationCenter defaultCenter] postNotificationName:J_APNS_NOTIFICATION_ARRIVED_EVENT object:userInfo];
  }
  else {
    // 本地通知 todo
    NSLog(@"iOS 10 本地通知 前台收到消息");
    [[NSNotificationCenter defaultCenter] postNotificationName:J_LOCAL_NOTIFICATION_ARRIVED_EVENT object:userInfo];
  }
  //需要执行这个方法，选择是否提醒用户，有 Badge、Sound、Alert 三种类型可以选择设置
  completionHandler(UNNotificationPresentationOptionAlert);
}

//iOS 10 消息事件回调
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler: (void (^)(void))completionHandler {
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    // Apns
    NSLog(@"iOS 10 APNS 消息事件回调");
    [JPUSHService handleRemoteNotification:userInfo];
    // 保障应用被杀死状态下，用户点击推送消息，打开app后可以收到点击通知事件
    [[RCTJPushEventQueue sharedInstance]._notificationQueue insertObject:userInfo atIndex:0];
    [[NSNotificationCenter defaultCenter] postNotificationName:J_APNS_NOTIFICATION_OPENED_EVENT object:userInfo];
  }
  else {
    // 本地通知
    NSLog(@"iOS 10 本地通知 消息事件回调");
    // 保障应用被杀死状态下，用户点击推送消息，打开app后可以收到点击通知事件
    [[RCTJPushEventQueue sharedInstance]._localNotificationQueue insertObject:userInfo atIndex:0];
    [[NSNotificationCenter defaultCenter] postNotificationName:J_LOCAL_NOTIFICATION_OPENED_EVENT object:userInfo];
  }
  // 系统要求执行这个方法
  completionHandler();
}

//自定义消息
- (void)networkDidReceiveMessage:(NSNotification *)notification {
  NSDictionary * userInfo = [notification userInfo];
  [[NSNotificationCenter defaultCenter] postNotificationName:J_CUSTOM_NOTIFICATION_EVENT object:userInfo];
}

//************************************************JPush end************************************************
`
      }
    },
    android: {
      xml: {
        'app/src/main/AndroidManifest.xml': {
          attr: {
            'android:name=".MainApplication"': {
              child: `<meta-data
	android:name="JPUSH_CHANNEL"
	android:value="\${JPUSH_CHANNEL}" />
<meta-data
	android:name="JPUSH_APPKEY"
	android:value="\${JPUSH_APPKEY}" />`
            }
          }
        }
      }
    }
  }
}
