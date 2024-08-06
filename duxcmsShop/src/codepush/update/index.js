// eslint-disable-next-line import/no-commonjs
module.exports = {
  // 描点插入
  insert: {
    'android/app/src/main/res/values/strings.xml': {
      resources: '<string moduleConfig="true" name="CodePushDeploymentKey"></string>'
    },
    'android/settings.gradle': {
      before: `include ':app', ':react-native-code-push'
project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')`
    },
    'android/app/src/main/java/com/duxapp/MainApplication.java': {
      import: 'import com.microsoft.codepush.react.CodePush;',
      nativeHost: `@Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
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
  // 对复制的文件进行处理
  copy: {},
  ios: {
    plist: {
      'duxapp/Info.plist': {
        CodePushDeploymentKey: ''
      }
    }
  }
}
