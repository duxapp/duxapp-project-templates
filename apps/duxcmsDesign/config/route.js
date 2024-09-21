/**
 * login:是否需要登录
 * platform:支持的平台(weapp, h5, rn)不配置支持所有
 * subPackage:是否将其设置为分包
 * home: 是否是主页 是主页的页面将会被排在前面
 */
const config = {
  pages: {
    'duxcmsDesign/index': {
      pages: {
        index: {
          home: true,
        }
      }
    }
  },
  disablePages: [
    'user/',
    'duxcmsContent/',
    'duxcmsShop/',
    'duxcmsUser/',
    'duxcmsOrder/',
    'duxcmsAccount/',
    'duxcmsMall/',
    'duxcmsPay/'
  ]
}

module.exports = config
