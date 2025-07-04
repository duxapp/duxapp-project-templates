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
      themeConfig: {
        themes: {
          light: {
            name: '默认主题',
            color: '#fff'
          },
          dark: {
            name: '夜间模式',
            color: '#333'
          }
        }
      },
      themes: {
        light: {
          primaryColor: '#7DBE27',
          secondaryColor: '#F58E18',
          successColor: '#34a853',
          warningColor: '#fbbc05',
          dangerColor: '#ea4335',
          pageColor: '#F2F2F2',

          textColor1: '#373D52',
          textColor2: '#73778E',
          textColor3: '#A1A6B6',
          textColor4: '#FFF',

          header: {
            color: '#fff', // 仅支持rgb hex值，请勿使用纯单词 设置为数组将显示一个渐变按钮
            textColor: '#373D52', // 文本颜色
            showWechat: true, // 微信公众号是否显示header
            showWap: true, // h5是否显示header
          }
        },
        dark: {
          pageColor: '#1E1E1E',

          whiteColor: '#181818',
          blackColor: '#fff',
          lineColor: '#1F1F1F',

          textColor1: '#FFF',
          textColor2: '#A1A6B6',
          textColor3: '#73778E',
          textColor4: '#373D52',
          header: {
            color: '#121212',
            textColor: '#fff'
          },
          loading: {
            dark: '#fff',
            blank: '#7a7a7a'
          }
        }
      }
    },
    wechat: {
      // 分享组件配置
      share: {
        open: true,
        // 开启未定义的页面分享
        pageSlef: {
          // 包含这些页面分享自身 页面路径关键词匹配 include 优先级比 exclude 高，
          // 可以配置exclude为空数组表示支持所有页面
          // pageSlef优先级高于pageHome
          include: [],
          // 排除这些页面 不进行分享
          // exclude: []
        },
        // 开启未定义的页面分享到指定页面
        pageHome: {
          path: '',
          params: {},
          // 包含这些页面分享自身 页面路径关键词匹配
          // include: [],
          // 排除这些页面 不进行分享
          exclude: []
        },
        // 公共分享参数
        common: {
          title: 'DUX商城',
          desc: '商品优选',
          image: 'https://shujumatou.2c99.com/uploads/2023-11-05/e8d3249afb4e0a55df34.png'
        },
        platform: {
          app: {
            // 配置分享到小程序的原始id 同时相当于开关
            weappUserName: 'gh_841b4b16b215',
            // 配置分享到h5的url 同时相当于开关
            h5Url: '',
          }
        }
      }
    },
    // 用户模块
    user: {
      // 使用哪个模块注册的登录功能
      use: 'duxcms',
      // 是否禁用h5端微信登录
      disableH5Watch: true,
      // 开启微信小程序手机号快捷登录
      weappTelLogin: true
    },
    duxui: {
      themes: {
        light: {
          card: {
            shadow: false
          },
          button: {
            radiusType: 'round'
          },
          tabBar: {
            nameColor: '#373D52',
            nameHoverColor: '#7DBE27'
          }
        },
        dark: {
          tabBar: {
            nameColor: '#888',
            nameHoverColor: '#fff'
          }
        }
      }
    },
    // cms框架
    duxcms: {
      request: {
        // 测试
        origin: 'https://a.hhsd.net',
        path: 'api', // 域名二级目录
        secretId: '53368068',
        secretKey: '6c278fbf1791fbed3ae79197de03f65f',

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
        appName: 'DUX商城'
      }
    },
  }
}

export default config
