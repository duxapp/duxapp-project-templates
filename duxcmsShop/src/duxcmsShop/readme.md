# duxcmsShop

单用户商城模块

## 安装

```bash
yarn duxapp app add duxcmsShop
```

此模块需要在 [duxapp 框架](https://app.docs.dux.plus) 中运行

## 配置

此模块为后端商城模块的配套前端，需要接入后端接口才能正常使用，你可以接入官方示例商城接口，查看效果  

在配置文件中修改 `option.duxcms.request` 对应的参数为下列参数
```js
{
  origin: 'https://example.service.dux.cn',
  secretId: '69172925',
  secretKey: 'c8bcd59b5b3e43522b084e56db51f19a',
}
```
## 运行

```bash
yarn dev:weapp --app=duxcmsShop
```
