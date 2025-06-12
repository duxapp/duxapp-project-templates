// eslint-disable-next-line import/no-commonjs
export default {
  // 描点插入
  insert: {
    'android/settings.gradle': {
      before: `include ':app', ':react-native-code-push'
project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')`
    },
    'android/app/build.gradle': {
      'android.defaultConfig': `        // vectorDrawables.useSupportLibrary true codePush
        resValue 'string', "CODE_PUSH_APK_BUILD_TIME", String.format("\\"%d\\"", System.currentTimeMillis())`,
      content: `apply from: "../../node_modules/react-native-code-push/android/codepush.gradle"`
    },
    'android/app/src/main/java/cn/duxapp/MainApplication.kt': {
      import: 'import com.microsoft.codepush.react.CodePush',
      reactNativeHost: `        override fun getJSBundleFile(): String {
            return CodePush.getJSBundleFile()
        }`
    },
    'ios/duxapp/AppDelegate.mm': {
      import: '#import <CodePush/CodePush.h>'
    }
  },
  // 锚点替换
  replace: {
    'ios/duxapp/AppDelegate.mm': {
      'appDelegate.sourceURLForBridge': 'return [CodePush bundleURL];'
    }
  },
  android: {
    xml: {
      'app/src/main/res/values/styles.xml': {
        tag: {
          resources: {
            child: `<string moduleConfig="true" name="CodePushDeploymentKey"></string>`
          }
        }
      }
    }
  },
  ios: {
    plist: {
      'duxapp/Info.plist': {
        CodePushDeploymentKey: ''
      }
    }
  }
}
