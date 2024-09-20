/* eslint-disable import/no-commonjs */
const xcode = require('xcode')
const file = require('duxapp-cli/lib/file')

module.exports = {
  // 描点插入
  insert: {
    'android/app/src/main/java/cn/duxapp/MainActivity.kt': {
      import: 'import com.zoontek.rnbootsplash.RNBootSplash',
      'mainActivityDelegate.loadApp': '      RNBootSplash.init(activity, R.style.BootTheme)'
    },
    'ios/duxapp/AppDelegate.mm': {
      import: '#import "RNBootSplash.h"',
      appDelegate: `// react-native-bootsplash start
- (UIView *)createRootViewWithBridge:(RCTBridge *)bridge
                          moduleName:(NSString *)moduleName
                            initProps:(NSDictionary *)initProps {
  UIView *rootView = [super createRootViewWithBridge:bridge
                                          moduleName:moduleName
                                            initProps:initProps];

  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView];

  return rootView;
}
// react-native-bootsplash end`
    }
  },
  android: {
    xml: {
      'app/src/main/AndroidManifest.xml': {
        attr: {
          'android:name=".MainApplication"': {
            attr: {
              'android:theme': '@style/BootTheme'
            }
          }
        }
      },
      'app/src/main/res/values/styles.xml': {
        tag: {
          resources: {
            child: `<style name="BootTheme" parent="Theme.BootSplash">
  <item name="bootSplashBackground">@color/bootsplash_background</item>
  <item name="bootSplashLogo">@mipmap/bootsplash_logo</item>
  <item name="postBootSplashTheme">@style/AppTheme</item>
</style>`
          }
        }
      },
      'app/src/main/res/values/colors.xml': {
        tag: {
          resources: {
            child: '<color name="bootsplash_background">#FFFFFF</color>'
          }
        }
      }
    }
  },
  onStop() {
    // 添加依赖
    const pbxprojPath = 'ios/duxapp.xcodeproj/project.pbxproj'
    const proj = xcode.project(file.pathJoin(pbxprojPath))
    proj.parseSync()

    const addFile = proj.addFile('BootSplash.storyboard')
    addFile.uuid = proj.generateUuid()
    proj.addToPbxBuildFileSection(addFile)
    proj.addToPbxResourcesBuildPhase({ ...addFile, target: '13B07F861A680F5B00A75B9A' })
    proj.addToPbxGroup(addFile, '13B07FAE1A68108700A75B9A')

    file.writeFile(pbxprojPath, proj.writeSync())
  }
}
