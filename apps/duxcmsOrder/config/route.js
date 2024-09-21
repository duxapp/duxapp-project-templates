/**
 * login:是否需要登录
 * platform:支持的平台(weapp, h5, rn)不配置支持所有
 * subPackage:是否将其设置为分包
 * home: 是否是主页 是主页的页面将会被排在前面
 */
const config = {
  path: 'pages',
  pages: {
    'duxcmsOrder/address': {
      login: true,
      pages: {
        list: {},
        edit: {}
      },
    },
    'duxcmsOrder/order': {
      login: true,
      pages: {
        cart: {},
        create: {},
        list: {},
        detail: {},
        evaluate: {},
        express: {}
      },
    },
    'duxcmsOrder/refund': {
      login: true,
      pages: {
        create: {},
        list: {},
        detail: {},
        express: {}
      },
    },
  }
}

module.exports = config
