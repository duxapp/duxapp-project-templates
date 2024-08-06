# wechat
提供app端微信插件、h5段jssdk插件。继承了微信分享组件，同时支持小程序、h5、APP
## 安装

```bash
yarn duxapp app add wechat
```

## RN端微信组件

集成的是 `react-native-wechat-lib` 当你需要支付、分享、登录时，可导入使用，具体使用方法查看官方文档

## 分享组件使用

### 添加配置位于
`index.js` 的 `option.wechat.share`

```js
{
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
    title: '公共分享标题',
    desc: '功能分享描述',
    image: 'https://shujumatou.2c99.com/uploads/2023-11-05/e8d3249afb4e0a55df34.png'
  },
  platform: {
    app: {
      // 配置分享到小程序的原始id 同时相当于开关
      weappUserName: '',
      // 配置分享到h5的url 同时相当于开关
      h5Url: '',
    }
  }
}
```

h5 端要启用分享需要设置参数

```jsx
WechatShare.h5ConfigPromise(async () => {
  // 接口返回的参数和jssdk config接口一致
  const res = await request({
    url: 'wechat/sdk',
    method: 'POST',
    data: {
      url: window.location.href,
      api: [
        'updateAppMessageShareData', 'updateTimelineShareData',
        'showAllNonBaseMenuItem', 'hideAllNonBaseMenuItem'
      ]
    }
  })
  return res
})
```

### 在页面调用

```jsx
import { Header, TopView } from '@/duxapp'
import { WechatShare } from '@/wechat'

export default TopView.HOC(function Page() {

  WechatShare.useSharePage({
    title: '分享标题',
    // 参数为可选 不设置 默认读取当前页面路径和参数
    path: '',
    // 参数为可选
    image: '',
    // 可选
    params: {}
  })

  // 点击弹出分享 在h5端和app端生效 在小程序端需要使用 Button 按钮调起分享界面
  const share = useCallback(() => {
    WechatShare.openShare()
  }, [])

  return <>
    <Header title='页面标题' />
    <View onCLick={share}></View>
  </>
})
```

### 设置全局分享参数

```jsx
// 设置全局分销参数
WechatShare.setGlobalParams(old => ({ ...old, sale_user_code: info.code }))
```
### 禁用全局分享参数

```jsx
// 次方法主要用于 h5 端，避免url上的敏感参数被分享出去
WechatShare.setDisableGlobalParams('sale_user_code', 'sale_user_id', 'wechat_code', 'toPage')
```
