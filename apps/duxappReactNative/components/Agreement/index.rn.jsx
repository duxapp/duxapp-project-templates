import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { getCurrentPages, getStorage, setStorage } from '@tarojs/taro'
import { ScrollView, Text, TouchableOpacity, View, BackHandler, Platform } from 'react-native'
import { Image } from '@tarojs/components'
import { nav, userConfig, toast, TopView } from '@/duxapp'
import './index.scss'

const Content = ({
  onSubmit,
  onClose,
  links,
  content: propsContent
}) => {

  const agreement = userConfig.option.duxappReactNative?.agreement

  const name = agreement?.name

  const content = agreement?.content || propsContent

  return <View className='Agreement'>
    {!!agreement?.logo && <Image className='Agreement__logo' src={agreement.logo} />}
    <View className='Agreement__main' style={!!content ? { paddingBottom: 0 } : {}}>
      <Text className='Agreement__title'>欢迎使用{name ? ' ' + name : ''}</Text>
      <Text className='Agreement__desc'>
        感谢您对于{name ?? '我们'}的信赖，在使用前，请您阅读并同意
        {
          (agreement?.links || links)?.map((item, index) => <Fragment key={item.name}>
            {!!index && '和'}
            <Text className='Agreement__desc__link' onPress={() => nav(item.url)}>{item.name}</Text>
          </Fragment>)
        }
        。我们将按照政策和协议为您提供服务，APP获取的授权信息请查看详情。
        {content ? '特向您说明如下：' : ''}
      </Text>
      {!!content && <ScrollView className='Agreement__content'>
        <Text className='Agreement__content__text'>{content}</Text>
        <View className='Agreement__content__height' />
      </ScrollView>}
    </View>
    <TouchableOpacity className='Agreement__submit' onPress={onSubmit} activeOpacity={1}>
      <Text className='Agreement__submit__text'>同意并继续</Text>
    </TouchableOpacity>
    <Text className='Agreement__close' onPress={onClose}>不同意</Text>
  </View>
}

export const Agreement = (() => {
  let _status = 0 // 0读取中 1未授权 2已授权
  const key = 'agreement-status'
  return function AgreementContent({
    children,
    ...props
  }) {

    const pageLength = useMemo(() => getCurrentPages().length, [])

    const [status, setStatus] = useState(_status)

    useEffect(() => {
      if (_status === 0) {
        getStorage({ key }).then(res => {
          if (res.data) {
            _status = 2
            setStatus(2)
            // 同意用户协议回调
            config.callbacks.forEach(([callback]) => callback())
            config.callbacks = []
            config.complete = true
          } else {
            _status = 1
            setStatus(1)
          }
        }).catch(() => {
          _status = 1
          setStatus(1)
        })
      }
    }, [])

    const submit = useCallback(() => {
      setStorage({ key, data: '1' })
      _status = 2
      setStatus(2)
      // 同意用户协议回调
      config.callbacks.forEach(([callback]) => callback())
      config.callbacks = []
      config.complete = true
    }, [])

    const close = useCallback(() => {
      if (Platform.OS === 'android') {
        BackHandler.exitApp()
      } else {
        toast('请手动退出APP')
      }
    }, [])

    if (status === 2 || pageLength > 1) {
      return children
    }
    if (status === 0) {
      return null
    }
    return <Content {...props} onSubmit={submit} onClose={close} />
  }
})()

const config = {
  reg: false,
  complete: false,
  callbacks: []
}

Agreement.init = props => {
  TopView.addContainer(Agreement, props)
  config.reg = true
}

// 某些操作需要在用户同意用户协议之后进行，使用此方法进行判断
Agreement.isComplete = () => {
  return new Promise((resolve, reject) => {
    if (config.reg && config.complete) {
      return resolve()
    }
    setTimeout(() => {
      if (!config.reg) {
        // 未注册用户协议
        resolve()
      } else if (config.complete) {
        // 已经同意
        resolve()
      } else {
        // 等待用户同意
        config.callbacks.push([resolve, reject])
      }
    }, 100)
  })
}
