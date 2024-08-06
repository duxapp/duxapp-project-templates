import Taro from '@tarojs/taro'
import { toast, loading } from '@/duxui'
import { requestPermissionMessage } from '@/duxappReactNative'


/**
 * 将图片或视频保存到相册
 * @param {*} url 或者多个url组成的数组
 */
export const saveToPhoto = async (url) => {
  if (process.env.TARO_ENV === 'h5') {
    toast('请长按图片保存')
    throw {
      message: '暂不支持h5保存到相册',
    }
  }
  if (typeof url === 'string') {
    url = [url]
  }
  let stop
  try {
    if (process.env.TARO_ENV === 'weapp') {
      try {
        if (process.env.TARO_ENV === 'weapp') {
          await Taro.authorize({ scope: 'scope.writePhotosAlbum' })
        }
      } catch (error) {
        console.log('保存授权失败', error)
        await Taro.showModal({
          title: '授权提示',
          content: '请手动打开设置开启保存到相册权限后重试',
          showCancel: false,
        })
        throw '未授权'
      }
    }
    stop = loading('图片加载中')
    const promisArr = []
    for (let i = 0; i < url.length; i++) {
      promisArr.push(Taro.downloadFile({ url: url[i] }))
    }
    const localList = await Promise.all(promisArr)
    loading('正在保存')
    await requestPermissionMessage(requestPermissionMessage.types.saveMedia)
    for (let i = 0; i < localList.length; i++) {
      await Taro.saveImageToPhotosAlbum({
        filePath: localList[i].tempFilePath,
      })
    }
    stop()
    // toast('保存成功')
    Taro.showToast({
      title: '保存成功',
    })
  } catch (err) {
    stop?.()
    toast(err.errMsg || err)
    throw {
      message: err.errMsg || err,
    }
  }
}
