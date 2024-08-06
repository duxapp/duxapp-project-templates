// import qiniu from './base/components/UploadFileManage/drive/qiniu'

const config = {
  // 对于默认不开启的页面 配置在此处将开启这些页面
  openPages: [
    // 'user/auth/start', // 需要登录才能访问的app 将此页面打开
    // 'base/location/index', // 需要选择位置信息的app 将此页面打开
  ],
  // 不需要的页面可以配置路径禁用
  disablePages: [

  ],
  // 覆盖app.config.js 配置
  appConfig: {
    // 使用小程序新的渲染引擎
    // renderer: 'skyline',
    // lazyCodeLoading: 'requiredComponents',
    requiredPrivateInfos: [
      'chooseLocation',
      'getLocation',
      'onLocationChange',
      'startLocationUpdateBackground',
      'chooseAddress'
    ],
    components: [
      'designExample/components/Design/index'
    ]
  },
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
      },
      /**
       * 如果某些字体放在本地，则配置此处，可以对不同系统配置，也可以统一配置
       */
      font: {
        local: {
          // SlimIcon: {
          //   ios: true
          //   adnroid: true
          // }
        }
      }
    },
    base: {
      fileUpload: {
        // 大文件上传驱动
        // drive: qiniu()
      },
      theme: {
        button: {
          color: ['#c0d930', '#f2d733'],
          textColor: '#fff',
          radiusType: 'round', // 按钮圆角类型 square直角 round圆角 round-min较小的圆角
          size: 'l', // 按按钮尺寸 s m l xl xxl xxxl
          plain: false, // 是否镂空
        },
        tabs: {
          lineWidth: 50,
          lineRadius: 5,
          lineHeight: 10,
        },
      }
    },
    // 用户模块
    user: {
      // 使用哪个模块注册的登录功能
      use: 'slim',
      // 是否禁用h5端微信登录
      disableH5Watch: false
    },
    // 老商城系统
    duxshop: {
      // 请求配置
      request: {
        origin: 'https://shop.tonglao.com.cn',
        path: 'a', // 域名二级目录
        secret: 'f34f01e53f0d21d9245c3f2771d1b183', // 站点token
        appid: '1651593048279300',
        devOpen: true,
        devToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zaG9wLnRvbmdsYW8uY29tLmNuIiwiYXVkIjoiaHR0cDpcL1wvc2hvcC50b25nbGFvLmNvbS5jbiIsImlhdCI6MTY3MTYwNzgyOSwibmJmIjoxNjcxNjA3ODI5LCJkYXRhIjoiMTA3In0.b5Gl_ijHfPQpaJ36OyVOACcJH0rbCBF5JXwjgOry6RM'
      }
    },
    // 新php系统
    duxravel: {
      request: {
        origin: 'https://service.tonglao.com.cn',
        path: 'api', // 域名二级目录
        accessKey: '26356048',
        sign: '958fdee7f4cc68f09d60c9c297995013',
        devOpen: false,
        devToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zaG9wLnRvbmdsYW8uY29tLmNuIiwiYXVkIjoiaHR0cDpcL1wvc2hvcC50b25nbGFvLmNvbS5jbiIsImlhdCI6MTY1MTYyNzk0MywibmJmIjoxNjUxNjI3OTQzLCJkYXRhIjoxMTN9.9RIvfur2va5Q-lew2rpSXStZQVErlagTMnLy7qVTI94'
      }
    },
    // 新php模块化系统
    duxslim: {
      request: {
        origin: 'https://a.douxcm.com',
        // origin: 'http://douxin_api.test',
        path: 'api', // 域名二级目录
        accessKey: '81506876',
        sign: 'cb6d343a133c359c451d68e37d0f7ecb',
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
        appName: 'DuxSlim'
      }
    },
    // 新商城系统配置
    shopv2: {
      theme: {
        goods: {
          // 价格颜色
          priceColor: '#ff442a',
          // 原价颜色
          marketPriceColor: '#999',
          // 购物车图标颜色
          cartColor: '#FF442A',
          // 详情购买颜色
          detailBuyColor: '#ff442a',
          // 详情添加购物车颜色
          detailCartColor: '#ff9324'
        },
        // 规格按钮样式
        spec: {
          color: '#888',
          selectColor: '#333',
          radiusType: 'round',
          size: 'm',
          plain: true,
        },
        // 分类页面
        category: {
          // 显示多少级菜单 1-3
          level: 3
        }
      }
    }
  }
}

export default config
