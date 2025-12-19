// eslint-disable-next-line import/no-commonjs
export default ({ config, apps }) => {
  const BundleId = config.ios?.BundleId || 'com.duxapp'
  const alipay = config.option?.['expo-alipay'] || {}

  return {
    ios: {
      plist: {
        'duxapp/Info.plist': {
          CFBundleURLTypes: [
            {
              CFBundleTypeRole: 'Editor',
              CFBundleURLName: 'alipay',
              CFBundleURLSchemes: [
                `${BundleId.replace(/\./g, '')}`
              ]
            }
          ]
        },
        'duxapp/duxapp.entitlements': {
          'com.apple.developer.associated-domains': [
            `applinks:${alipay.applinks || 'duxapp.com'}`
          ]
        }
      }
    }
  }
}
