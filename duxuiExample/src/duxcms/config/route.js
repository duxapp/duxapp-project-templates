/**
 * login:是否需要登录
 * platform:支持的平台(weapp, h5, rn)不配置支持所有
 * subPackage:是否将其设置为分包
 * home: 是否是主页 是主页的页面将会被排在前面 如果多个app都有配置注册，顺序将按照命令的 --apps= 参数进行排序 subPackage和home不可同时设置
 */
const config = {
  path: 'pages',
  pages: {
    'duxcms/common': {
      pages: {
        // 公共内容详情页面
        richtext: {}
      }
    }
  },
  disablePages: [
    'duxapp/pages/index/index'
  ],
  transfer: {

  }
}

module.exports = config
