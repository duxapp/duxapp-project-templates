import { Skia } from '@shopify/react-native-skia'
import { Asset } from 'expo-asset'

export class CanvasImage {

  data = {
    src: null,
    image: null,
    width: 0,
    height: 0
  }

  onload = null
  onerror = null

  get src() {
    return this.data.src
  }

  set src(value) {
    this.data.src = value
    if (typeof value === 'number') {
      // 处理本地资源（require 返回的数字）
      const asset = Asset.fromModule(value) // 使用 expo-asset 获取资源路径
      asset.downloadAsync().then(() => {
        const uri = asset.localUri || asset.uri
        return Skia.Data.fromURI(uri)
      }).then(data => {
          const image = Skia.Image.MakeImageFromEncoded(data)
          if (!image) throw new Error('Failed to decode image')
          this.data.image = image
          this.data.width = image.width()
          this.data.height = image.height()
          this.onload?.()
        }).catch(err => {
          this.onerror?.(err)
        })
    } else if (typeof value === 'string') {
      // 处理网络 URL 或 Base64
      if (value.startsWith('data:')) {
        // Base64 图片
        const base64Data = value.split(',')[1]
        const bytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))
        const data = Skia.Data.fromBytes(bytes)
        const image = Skia.Image.MakeImageFromEncoded(data)
        if (!image) throw new Error('Failed to decode image')
        this.data.image = image
        this.data.width = image.width()
        this.data.height = image.height()
        this.onload?.()
      } else {
        // 网络图片
        Skia.Data.fromURI(value)
          .then(data => {
            const image = Skia.Image.MakeImageFromEncoded(data)
            if (!image) throw new Error('Failed to decode image')
            this.data.image = image
            this.data.width = image.width()
            this.data.height = image.height()
            this.onload?.()
          })
          .catch(err => this.onerror?.(err))
      }
    }
  }

  get image() {
    return this.data.image
  }

  get width() {
    return this.data.width
  }

  get height() {
    return this.data.height
  }
}
