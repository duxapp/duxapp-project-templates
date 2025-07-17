# 开始

RN端 视频压缩工具，RN端默认不支持视频压缩，使用这个工具，通过中间件的形式给视频进行压缩

## 安装

```bash
yarn duxapp app add duxappCompress
```

## 使用

```js
import { uploadMiddleCompressor } from '@/duxappCompress'

if (process.env.TARO_ENV === 'rn') {
  // 给上传添加中间件 让中间件的顺序尽量靠前
  uploadMiddle.before(uploadMiddleCompressor, 0)
}
```
