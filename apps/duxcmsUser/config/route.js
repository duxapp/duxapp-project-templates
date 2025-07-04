/**
 * login:是否需要登录
 * platform:支持的平台(weapp, h5, rn)不配置支持所有
 * subPackage:是否将其设置为分包
 * home: 是否是主页 是主页的页面将会被排在前面
 */
const config = {
  path: 'pages',
  pages: {
    // 用户收藏
    'duxcmsUser/collect': {
      login: true,
      pages: {
        list: {},
      },
    },
    // 足迹
    'duxcmsUser/foot': {
      login: true,
      pages: {
        list: {},
      },
    },
    // 用户评价
    'duxcmsUser/comment': {
      login: true,
      pages: {
        list: {},
      },
    },
    // 用户评论
    'duxcmsUser/discuss': {
      login: true,
      pages: {
        list: {},
      },
    },
    // 用户信息
    'duxcmsUser/info': {
      login: true,
      pages: {
        setting: {},
        password: {},
        phone: {},
        avatar: {},
        logoff: {},
        forget: {
          login: false
        }
      },
    },
    // 用户信息
    'duxcmsUser/notice': {
      login: true,
      pages: {
        list: {},
      },
    },
    // 意见反馈
    'duxcmsUser/feedback': {
      login: true,
      pages: {
        index: {},
      },
    },
  }
}

export default config
