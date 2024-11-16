// eslint-disable-next-line import/no-commonjs
module.exports = {
  // 描点插入
  insert: {
    'android/app/proguard-rules.pro': {
      content: `# 云闪付
-dontwarn com.unionPay.**
-keep class com.unionPay.** {*;}
-keep class org.simalliance.openmobileapi.** {*;}`
    },
  },
  android: {
    xml: {
      'app/src/main/AndroidManifest.xml': {
        tag: {
          queries: {
            child: `<package android:name="com.unionpay" />
    <package android:name="com.unionpay.tsmservice" />
    <package android:name="com.unionpay.tsmservice.mi" />
    <package android:name="com.huawei.wallet" />
    <package android:name="com.cmbc.cc.mbank" />`
          }
        }
      }
    }
  },
  ios: {
    plist: {
      'duxapp/Info.plist': {
        LSApplicationQueriesSchemes: ['uppaysdk', 'uppaywallet', 'uppayx1', 'uppayx2', 'uppayx3']
      }
    }
  }
}
