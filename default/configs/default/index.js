const config = {
  // 调试配置
  debug: {
    // 在h5端开启vconsole调试功能
    vconsole: false
  },
  // 模块配置 将会调用模块生命周期的option，将对应模块的参数传入
  option: {
    // 基础模块
    duxapp: {
      theme: {
        primaryColor: '#CDDE00',
        secondaryColor: '#FDD000',
        successColor: '#34a853',
        warningColor: '#fbbc05',
        dangerColor: '#ea4335',
        pageColor: '#fafbf8',
        mutedColor: '#666',
        header: {
          color: '#fff', // 仅支持rgb hex值，请勿使用纯单词 设置为数组将显示一个渐变按钮
          textColor: '#000', // 文本颜色
          showWechat: false, // 微信公众号是否显示header
          showWap: true, // h5是否显示header
        }
      }
    },
    // 用户模块
    user: {
      // 使用哪个模块注册的登录功能
      use: 'duxcms',
      // 是否禁用h5端微信登录
      disableH5Watch: false,
      // 开启微信小程序手机号快捷登录
      weappTelLogin: false
    },
    // cms框架
    duxcms: {
      request: {
        origin: "https://shujumatou.2c99.com",
        // origin: 'http://192.168.2.24:8090',
        path: "api", // 域名二级目录
        accessKey: "60461702",
        sign: "25359648c9fedc90b32359e9ed3ceefe",
        devOpen: false,
        devToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZW1iZXIiLCJpYXQiOjE2NzU2NjA2MzUsImV4cCI6MTY3NTc0NzAzNSwiaWQiOjF9._kX-uT-hUEbo_J3fN5F0HHs0ee01TPNQHrDiH3SHQlc'
      },
      // 登录相关配置
      loginConfig: {
        // 手机号登录
        phone: true,
        // 邮箱登录
        email: false,
        // app微信登录
        appWatch: true,
        // 小程序微信登录
        weappWatch: true,
        // 名称
        appName: 'duxcms'
      }
    }
  }
}

export default config
