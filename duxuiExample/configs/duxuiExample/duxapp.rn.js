
const config = {
  android: {
    appid: 'cn.duxapp.duxui',
    appName: 'duxUI库',
    versionCode: 2,
    versionName: '1.1.0',
    keystore: {
      storeFile: 'duxui.keystore',
      keyAlias: 'duxui',
      storePassword: 'TN62eyasJAKm2ksD',
      keyPassword: 'TN62eyasJAKm2ksD'
    }
  },
  ios: {
    BundleId: 'cn.duxapp.duxui',
    appName: 'duxUI库',
    versionCode: 1,
    versionName: '1.0.0',
    team: '',
    plist: {
      'duxapp/Info.plist': {
        NSCalendarsUsageDescription: 'Allow duxapp to access your calendar',
        NSCameraUsageDescription: 'duxUI库需要拍照用于APP内图片上传更换头像',
        NSContactsUsageDescription: 'duxapp需要访问你的通讯录，将客户信息保存到通讯录中',
        NSLocalNetworkUsageDescription: 'App需要访问你的本地网络，用于和服务器建立连接',
        NSLocationAlwaysAndWhenInUseUsageDescription: '使用你的位置信息用于地图定位和位置选择',
        NSLocationAlwaysUsageDescription: '使用你的位置信息用于地图定位和位置选择',
        NSLocationWhenInUseUsageDescription: '使用你的位置信息用于地图定位和位置选择',
        NSMicrophoneUsageDescription: 'Allow duxapp to access your microphone',
        NSMotionUsageDescription: 'Allow duxapp to access your devices accelerometer',
        NSPhotoLibraryAddUsageDescription: 'duxUI库需要保存宣传图到你的相册用于分享',
        NSPhotoLibraryUsageDescription: 'duxUI库需要访问相册用于APP内图片上传更换头像',
        NSRemindersUsageDescription: 'Allow duxapp to access your reminders',
      }
    }
  },
  qiniu: {
    accessKey: 'tddCAA-Vehph1waxeIZcMIqrFIVzghMBfjz9KGen',
    secretKey: '7LYQnMUUXahg90EvlB2UdNICUpjyqZu5odWbfokS',
    bucket: 'pict-cdn',
    cdn: 'https://pictcdn.client.jujiang.me'
  },
  // 模块选项
  option: {
    /**
     * 热更新上传控制
     * 安卓和ios独立控制 设置common为公共参数
     * {
     *  token：账户设置中心生成的token
     *  account：上传的账号
     *  version：当前代码需要的原生app版本
     *  name：appcenter上的应用名称 不填写默认为package.json的 name + '-' + (ios或者android)
     * }
     */
    codepush: {
      common: {
        token: '09a115a7a099eafe25f32fcf5281ac257aa25aff',
        account: 'xj908634674-live.com',
        version: '^1.0.0'
      },
      android: {
        name: 'duxui-android',
        version: '^1.1.0'
      },
      ios: {
        name: 'duxui-ios',
        version: '^1.1.0'
      }
    }
  }
}

module.exports = config
