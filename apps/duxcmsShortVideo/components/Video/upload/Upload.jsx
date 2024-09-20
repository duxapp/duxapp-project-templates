import qiniu from '@/duxui/components/UploadManage/drive/qiniu'
import { Loading, Button, Absolute, Text, Video, Image } from '@/duxui'
import { CmsIcon, request, toast, asyncTimeOut, uploadTempFile } from '@/duxcms'
import { View } from '@tarojs/components'
import { getMedia } from '@/duxapp/utils/net/util'
import { useCallback, useEffect, useState } from 'react'
import md5 from 'crypto-js/md5'
import './Upload.scss'


let getThumbnailAsync
if (process.env.TARO_ENV === 'rn') {
  getThumbnailAsync = require('expo-video-thumbnails').getThumbnailAsync
}

const upload = qiniu()

let qiniuConfig

upload.configSync(async () => {
  const res = await request({
    method: 'POST',
    url: 'member/qiniu'
  })
  qiniuConfig = {
    bucket: res.bucket,
    token: res.token,
    host: res.public_url,
    endpoint: res.domain,
  }
  return qiniuConfig
})

export const VideoUpload = ({
  value,
  onChange,
  tip
}) => {

  // 0 未选择 1上传中 2处理中 3上传完成
  const [uploadStatus, setUploadStatus] = useState(0)

  const [progress, setProgress] = useState(0)

  const [previewData, setPreviewData] = useState({
    image: '',
    video: ''
  })

  const [preview, setPreview] = useState(false)

  const uploadVideo = useCallback(async () => {
    const res = await getMedia('video', {
      maxDuration: process.env.TARO_ENV === 'weapp' ? 60 : 300,
      compressed: true
    })
    const [{ path, thumb, duration }] = res
    setUploadStatus(1)
    setProgress(0)
    const fileName = md5(new Date().getTime() + '')

    const ext = path.split('.').reverse()[0]
    const key = `short-video/${fileName}.${ext}`
    const result = await upload.upload({
      filePath: path,
      getKey: () => key,
      progress: e => {
        setProgress(e.progress)
      }
    }).catch(err => {
      toast(err.message || err)
      setUploadStatus(0)
      throw err
    })
    let uri = thumb
    if (process.env.TARO_ENV === 'rn') {
      uri = await getThumbnailAsync(path, { quality: 0.5 })
    }
    setPreviewData({
      image: uri,
      video: path
    })
    // setUploadStatus(2)
    const [image] = await uploadTempFile([{ path: uri?.uri || uri }])
    // 验证视频是否压缩成功
    // const newKey = await verifyVideo(key)
    // if (!newKey) {
    //   toast('视频处理失败 请重新上传')
    //   setUploadStatus(0)
    //   return
    // } else {
    //   setUploadStatus(3)
    // }
    setUploadStatus(3)
    // const [url] = result.url.split('/short-video')
    const _value = {
      url: key,
      cover: image,
      duration
    }
    onChange?.(_value)
    // 获取数据
  }, [onChange])

  useEffect(() => {
    return () => {
      // 取消检查任务
      verifyVideo.timer?.clear()
    }
  }, [])

  return <>
    {
      uploadStatus === 0 && <View className='VideoUpload__upload' onClick={uploadVideo}>
        <CmsIcon name='add-select' size={48} color='#a3a5b6' />
        {tip && <Text color={3} size={1} align='center' className='mt-3'>{tip}</Text>}
      </View>
    }
    {
      uploadStatus === 1 && <View className='VideoUpload__upload'>
        <Text className='VideoUpload__upload__progress'>{progress.toFixed(2)}%</Text>
      </View>
    }
    {
      uploadStatus === 2 && <View className='VideoUpload__upload'>
        <Loading size={64} />
        <Text className='VideoUpload__upload__exec mt-3'>视频转码中</Text>
      </View>
    }
    {
      uploadStatus === 3 && <View className='VideoUpload__upload' onClick={() => setPreview(!preview)}>
        <Image src={previewData.image} mode='aspectFill' className='VideoUpload__upload__preview' />
      </View>
    }

    {preview && (
      <Absolute>
        <View className='VideoUpload__preview'>
          <Video
            className='VideoUpload__preview__video'
            src={previewData.video}
            controls={false}
            loop
            autoplay
          />
          <View className='VideoUpload__preview__btns'>
            <Text
              className='VideoUpload__preview__btns__cancel'
              onClick={() => {
                setPreview(!preview)
                uploadVideo()
              }}
            >
              重新选择
            </Text>
            <Button
              size='l'
              type='primary'
              onClick={() => setPreview(!preview)}
            >确定</Button>
          </View>
        </View>
      </Absolute>
    )}
  </>
}

const verifyVideo = async (key, level = 0) => {
  if (level > 60) {
    return false
  }
  const res = await request({
    url: 'short/push/code',
    method: 'POST',
    data: {
      key
    }
  })
  if (!res.dist) {
    verifyVideo.timer = asyncTimeOut(3000)
    await verifyVideo.timer
    return await verifyVideo(key, level + 1)
  }
  return res.dist
}
