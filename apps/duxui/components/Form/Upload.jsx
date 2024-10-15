import { View, Image, Video } from '@tarojs/components'
import { previewMedia } from '@tarojs/taro'
import { useCallback, useState } from 'react'
import { ActionSheet, Loading } from '@/duxapp/components'
import classNames from 'classnames'
import { formConfig } from './config'
import { DuxuiIcon } from '../DuxuiIcon'
import { Text } from '../Text'
import { Grid } from '../Grid'
import { Column } from '../Flex'
import './Upload.scss'

let requestPermissionMessage
if (process.env.TARO_ENV === 'rn') {
  requestPermissionMessage = require('@/duxappReactNative/utils/rn/index.rn').requestPermissionMessage
}

export const UploadImages = ({
  value = [],
  column = 4,
  addText = '上传',
  onChange,
  type = 'image',
  max = 9,
  disabled,
  _designKey,
  option,
  ...props
}) => {

  if (!value) {
    value = []
  }

  const del = useCallback((index) => {
    value.splice(index, 1)
    onChange?.([...value])
  }, [onChange, value])

  const [progress, setProgress] = useState(-1)

  const add = useCallback(async () => {
    const upload = formConfig.getUpload()
    try {
      if (requestPermissionMessage) {
        await requestPermissionMessage(requestPermissionMessage.types.image)
      }
      let _type = type
      if (type === 'all') {
        const { index } = await ActionSheet.show({
          title: '请选择',
          list: ['图片', '视频']
        })
        _type = index ? 'video' : 'image'
      }
      const urls = await upload(_type, { count: max - (value?.length || 0), ...option, sizeType: ['compressed'] })
        .start(() => {
          setProgress(0)
        })
        .progress(setProgress)
      setProgress(-1)
      onChange?.([...value || [], ...urls])
    } catch (error) {
      setProgress(-1)
    }
  }, [max, onChange, option, type, value])

  const isOne = max === 1

  const content = [
    ...value?.map((item, index) => {
      return <View
        className={classNames('UIUplod__item', isOne && 'UIUplod__item--one')}
        key={item}
        {...isOne ? { _designKey } : {}}
      >
        <ItemView src={item} value={value} />
        {!disabled && <Column className='UIUplod__item__icon'>
          <DuxuiIcon name='close' color='red' size={36} onClick={() => del(index)} />
        </Column>}
      </View>
    }),
    (value?.length || 0) < max && !disabled &&
    <Column
      grow={!isOne}
      className={classNames('UIUplod__item', isOne && 'UIUplod__item--one')}
      justify='center'
      items='center'
      onClick={!~progress && add}
      {...isOne ? { _designKey } : {}}
    >
      {
        ~progress ?
          <>
            <Loading />
            <Text color={2} size={2}>{(progress * 100).toFixed(1)}%</Text>
          </> :
          <>
            <Text color={2} size={48}><DuxuiIcon name='add-select' /></Text>
            <Text color={2} size={2}>{addText}</Text>
          </>
      }
    </Column>
  ]

  if (isOne) {
    return content
  }

  return <Grid column={column} square gap={24} _designKey={_designKey} {...props}>
    {content}
  </Grid>
}

const ItemView = ({
  src,
  value
}) => {

  const preview = useCallback(() => {
    let current = 0
    const sources = value.map((item, i) => {
      if (item === src) {
        current = i
      }
      if (mediaImage.some(end => src.endsWith(end))) {
        return {
          url: item
        }
      }
      return {
        url: item,
        type: 'video'
      }
    })
    previewMedia({
      sources,
      current
    })
  }, [src, value])

  if (mediaImage.some(end => src.endsWith(end))) {
    return <Image className='UIUplod__item__image w-full h-full'
      onClick={preview}
      src={src}
      mode='aspectFit'
    />
  } else {
    return <Video className='UIUplod__item__image w-full h-full' onClick={preview} src={src} />
  }
}

const mediaImage = ['.jpg', '.png', '.gif', '.jpeg']

export const UploadImage = ({ onChange, value, ...props }) => {

  return <UploadImages max={1} onChange={val => onChange(val[0])} value={value ? [value] : []}  {...props} />
}

export const Upload = ({
  max = 1,
  ...props
}) => {
  if (max === 1) {
    return <UploadImage {...props} />
  }
  return <UploadImages max={max} {...props} />
}
