export default {
  insert: {
    'android/app/proguard-rules.pro': {
      content: `# react-native-skia
-keep class com.shopify.reactnative.skia.** { *; }`
    },
  }
}
