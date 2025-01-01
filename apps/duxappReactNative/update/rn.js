// eslint-disable-next-line import/no-commonjs
module.exports = {
  insert: {
    'android/build.gradle': {
      'allprojects.repositories': `        maven {
            // expo-camera bundles a custom com.google.android:cameraview
            url "$rootDir/../node_modules/expo-camera/android/maven"
        }`
    },
    'android/gradle.properties': {
      // Duplicate class android.support.v4.app.INotificationSideChannel
      content: 'android.enableJetifier=true'
    },
    'android/app/proguard-rules.pro': {
      'content': `
##### @react-native-community/geolocation #####
-keep class com.android.installreferrer.api.** {*;}
-keep class com.google.android.gms.common.** {*;}

##### Expo Universal Modules #####

-keepclassmembers class * {
  @**.expo.core.interfaces.ExpoProp *;
}
-keepclassmembers class * {
  @**.expo.core.interfaces.ExpoMethod *;
}

-keep @**.expo.core.interfaces.DoNotStrip class *
-keepclassmembers class * {
  @**.expo.core.interfaces.DoNotStrip *;
}

##### React Native #####
-keep,allowobfuscation @interface **.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface **.facebook.proguard.annotations.KeepGettersAndSetters
-keep,allowobfuscation @interface **.facebook.react.bridge.ReadableType

# Do not strip any method/class that is annotated with @DoNotStrip
-keep @**.facebook.proguard.annotations.DoNotStrip class *
-keepclassmembers class * {
  @**.facebook.proguard.annotations.DoNotStrip *;
}

-keepclassmembers @**.facebook.proguard.annotations.KeepGettersAndSetters class * {
  void set*(***);
  *** get*();
}

-keep class * extends **.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends **.facebook.react.bridge.NativeModule { *; }
-keepclassmembers class *  { @**.facebook.react.uimanager.UIProp <fields>; }
-keepclassmembers class *  { @**.facebook.react.uimanager.ReactProp <methods>; }
-keepclassmembers class *  { @**.facebook.react.uimanager.ReactPropGroup <methods>; }

# TODO: shouldn't need these two rules
-keep interface **.facebook.react.bridge.** { *; }
-keep enum **.facebook.react.bridge.** { *; }

##### Versioned React Native #####
-keep class **.facebook.** { *; }
-keep class abi** { *; }
-keep class versioned** { *; }
-keep class expo.modules** { *; }
`
    },
    'android/app/build.gradle': {
      // 打包压缩
      android: `    packagingOptions {
        jniLibs {
            useLegacyPackaging true
        }
    }`
    },
    // 临时解决m系列模拟器上无法编译的问题
    'ios/Podfile': {
      postInstallEnd: `    installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings["ONLY_ACTIVE_ARCH"] = "NO"
    end
  end`
    }
  },
  android: {
    xml: {
      'app/src/main/AndroidManifest.xml': {
        tag: {
          queries: {
            child: `<package android:name="com.baidu.BaiduMap" />
    <package android:name="com.autonavi.minimap" />`
          },
          'intent-filter': {
            child: '<action android:name="android.intent.action.DOWNLOAD_COMPLETE"/>'
          },
          manifest: {
            child: `  <uses-permission android:name="android.permission.CAMERA" />
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
  <uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
  <uses-permission android:name="android.permission.READ_MEDIA_AUDIO" />
  <uses-permission android:name="android.permission.VIBRATE" />
  <uses-permission android:name="android.permission.DOWNLOAD_WITHOUT_NOTIFICATION" />

  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

  <!-- 定位 -->
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

  <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
  <uses-permission android:name="android.permission.FOREGROUND_SERVICE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />

  <!-- 华为保存图片权限 -->
  <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS" />
  <uses-permission android:name="android.permission.MOUNT_FORMAT_FILESYSTEMS" />

  <!-- 安装应用 -->
  <uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />`
          }
        },
        attr: {
          'android:name=".MainApplication"': {
            attr: {
              'android:largeHeap': 'true'
            }
          },
          'android:name=".MainActivity"': {
            attr: {
              'android:screenOrientation': 'portrait'
            }
          }
        }
      },
      'app/src/main/res/values/styles.xml': {
        attr: {
          'name="AppTheme"': {
            child: `        <item name="android:textColor">#000000</item>
        <!--设置透明背景-->
        <item name="android:windowIsTranslucent">true</item>`
          }
        }
      },
      'app/src/main/res/values/colors.xml': {
        tag: {
          resources: {
            child: `<color name="primary_dark">#000000</color>`
          }
        }
      }
    }
  },
  ios: {
    plist: {
      'duxapp/Info.plist': {
        NSAppTransportSecurity: {
          NSExceptionDomains: {
            localhost: {
              NSExceptionAllowsInsecureHTTPLoads: true
            }
          }
        },
        LSApplicationQueriesSchemes: ['iosamap', 'baidumap', 'qqmap']
      }
    }
  }
}
