// import qiniu from './base/components/UploadFileManage/drive/qiniu'

const config = {
  // 覆盖app.config.js 配置
  appConfig: {
    // 使用小程序新的渲染引擎
    // renderer: 'skyline',
    // lazyCodeLoading: 'requiredComponents',
    // componentFramework: 'glass-easel',
    // rendererOptions: {
    //   skyline: {
    //     defaultDisplayBlock: false
    //   }
    // },
    requiredPrivateInfos: [
      'chooseLocation',
      'getLocation',
      'onLocationChange',
      'startLocationUpdateBackground',
      'chooseAddress'
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
      }
    },
    codepush: {
      androidKey: 'w7-YPbuRGUGEteGzH6t1q7qcY6Onx3AcJrwhf',
      iosKey: 'yZrqff5-q6NpJUknyiW-k4ILeeecPlJxGyLol',
    },
    // 用户模块
    user: {
      // 使用哪个模块注册的登录功能
      use: 'slim',
      // 是否禁用h5端微信登录
      disableH5Watch: false
    },
    duxui: {
      // 分享组件配置
      share: {
        open: true,
        // 开启未定义的页面分享
        pageSlef: {
          // 包含这些页面分享自身 页面路径关键词匹配 include 优先级比 exclude 高，
          // 可以配置exclude为空数组表示支持所有页面
          // pageSlef优先级高于pageHome
          // include: ['page/test'],
          // 排除这些页面 不进行分享
          exclude: []
        },
        // 开启未定义的页面分享到指定页面
        pageHome: {
          path: '',
          params: {},
          // 包含这些页面分享自身 页面路径关键词匹配
          // include: [],
          // 排除这些页面 不进行分享
          // exclude: []
        },
        // 公共分享参数
        common: {
          title: 'DUXUI',
          desc: '同时兼容小程序、H5、RN',
          image: 'https://img.zhenxinhuixuan.com/weiwait/cropper/2lVCofRIu6Jl3jNebxCA6VkEMUeaobvLWFYMTiaG.jpg'
        },
        platform: {
          app: {
            // 配置分享到小程序的原始id 同时相当于开关
            weappUserName: '',
            // 配置分享到h5的url 同时相当于开关
            h5Url: 'https://duxui.cn',
          }
        }
      }
    },
    // 新php模块化系统
    duxcms: {
      request: {
        origin: 'https://example.service.dux.cn',
        path: 'api', // 域名二级目录
        secretId: '69172925',
        secretKey: 'c8bcd59b5b3e43522b084e56db51f19a',
        devOpen: false,
        devToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZW1iZXIiLCJpYXQiOjE2ODc5Mzg3NDEsImV4cCI6MTY5MDUzMDc0MSwiaWQiOjZ9.kCb82Y3bgUJWUo_WYsUPO1cLYzF1OJdEWTKAj9iNlF0'
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
    }
  }
}

export default config
