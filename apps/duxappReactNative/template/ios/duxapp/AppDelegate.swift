import UIKit
import Expo
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
{#duxapp-insert import}

@main
class AppDelegate: ExpoAppDelegate
{#duxapp-insert app.delegate}
{
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    {#duxapp-insert app.application.start}

    let delegate = DuxappReactNativeDelegate()
    let factory = ExpoReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory
    bindReactNativeFactory(factory)

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "duxapp",
      in: window,
      launchOptions: launchOptions
    )

    {#duxapp-insert app.application.end}

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  {#duxapp-insert app}
}

class ReactNativeDelegate: ExpoReactNativeFactoryDelegate{
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    // needed to return the correct URL for expo-dev-client.
    bridge.bundleURL ?? bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}

// 用于插入自定义方法
class DuxappReactNativeDelegate: ReactNativeDelegate {
  {#duxapp-insert duxappReactNative}
}

{#duxapp-insert content}
