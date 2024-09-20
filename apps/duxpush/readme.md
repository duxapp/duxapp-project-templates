# duxpush
集成小米 华为 vivo oppo 苹果各个厂商通道的推送模块
## 安装

```bash
yarn duxapp app add duxpush
```

## 使用

需要申请各个厂商的消息通知参数进行配置

- 需要在 `duxapp.js` 的 `option.duxpush` 配置文件中添加推送相关参数如下

```js
{
  xm: {
    appid: '',
    appkey: ''
  },
  hms: {
    appid: ''
  },
  vivo: {
    appid: '',
    apikey: ''
  },
  oppo: {
    appSecret: ''
  }
}
```

- 需要在 `index.js` 的 `option.duxpush` 配置如下

```js
{
  // 友盟 用于ios推送
  umAppKey: ''
}
```
