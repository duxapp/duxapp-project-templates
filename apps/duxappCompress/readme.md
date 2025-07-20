# 开始

RN端 图片视频压缩工具，RN端默认不支持视频压缩，使用这个工具，通过中间件的形式给视频进行压缩

## 安装

```bash
yarn duxapp app add duxappCompress
```

## 使用

将此模块添加到你的你快依赖中，压缩功能会自动生效

:::info
- 需要使用duxapp模块的 upload 或者 chooseMedia 方法才会生效
- 传入的 sizeType 参数需要是 ['compressed']，传入其他选项不会生效
:::
