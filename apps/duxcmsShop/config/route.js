/**
 * login:是否需要登录
 * platform:支持的平台(weapp, h5, rn)不配置支持所有
 * subPackage:是否将其设置为分包
 * home: 是否是主页 是主页的页面将会被排在前面
 */
const config = {
  path: 'pages',
  pages: {
    'duxcmsShop/index': {
      pages: {
        index: {
          home: true
        },
      },
    },
    'duxcmsShop/help': {
      pages: {
        list: {},
        detail: {}
      },
    },
    'duxcmsShop/setting': {
      pages: {
        index: {}
      },
    },
  }
}

export default config
