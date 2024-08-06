import { View, Text, Input, Image } from '@tarojs/components'
import {
  Header, Loading, ScrollView, KeyboardAvoiding, TopView,
  nav, toast, getLocationBase, useRoute,
  duxappTheme, colorLighten
} from '@/duxapp'
import { Map, mapApi } from '@/amap'
import { useState, useCallback, useEffect } from 'react'
import Taro from '@tarojs/taro'
import pointBlue from './images/point-blue.png'
import dingweiIcon from './images/dingwei.png'
import duihaoIcon from './images/duihao.png'
import sousuoIcon from './images/sousuo.png'

import './index.scss'

export default function Location() {

  const { params } = useRoute()

  const [list, setList] = useState([])

  const [showList, setShowList] = useState(false)

  const [center, setCenter] = useState(void 0)

  const [load, setLoad] = useState(false)

  const [info, setInfo] = useState([])

  const [select, setSelect] = useState({})

  const [location] = useState({
    city: '',
    longitude: 0,
    latitude: 0
  })

  useEffect(() => {
    if (params.lat && params.lng) {
      setCenter([+params.lng, +params.lat])
    } else {
      // 定位获取当前位置
      getLocationBase().then(res => {
        setCenter([res.longitude, res.latitude])
      }).catch(err => {
        console.log(err)
      })
    }
  }, [params.lat, params.lng])

  useEffect(() => {
    if (!center) return
    setLoad(true)
    setSelect({})
    mapApi.getAround(center[0], center[1]).then(res => {
      setInfo(res)
      setLoad(false)
    }).catch(err => {
      console.log('err', err)
      setLoad(false)
      toast(err.message || '信息获取失败')
    })
  }, [center])

  const search = useCallback(e => {
    const types = (() => {
      const typesArr = []
      for (let i = 1; i <= 19; i++) {
        typesArr.push((i < 10 ? '0' + i : i) + '0000')
      }
      return typesArr.join('|')
    })()
    setShowList(true)
    mapApi.request('place/text', {
      keywords: e.target.value,
      city: location.city,
      location: `${location.longitude},${location.latitude}`,
      // radius: 10000,
      extensions: 'all',
      offset: 25,
      types,
      citylimit: true
    }).then(res => {
      if (res.status == 1) {
        setList(res.pois.map(item => {
          item.distance = Number(item.distance)
          return item
        }))
      } else {
        setList([])
        toast(res.info || '信息获取失败')
      }
    })
  }, [location.city, location.latitude, location.longitude])

  const mapChange = useCallback(({ center: _center }) => {

    setSelect({})
    setLoad(true)
    mapApi.getAround(_center[0], _center[1]).then(res => {
      setInfo(res)
      setLoad(false)
    }).catch(err => {
      console.log('err', err)
      setLoad(false)
      toast(err.message || '信息获取失败')
    })
  }, [])

  const getCurrentPosition = useCallback(() => {
    getLocationBase().then(res => {
      setCenter([res.longitude, res.latitude])
    }).catch(err => {
      console.log('错误信息', err)
      toast('获取位置失败')
    })
  }, [])

  const submit = useCallback(() => {
    // console.log(select)
    // return
    select.status = true
    nav('back:', select)
  }, [select])


  const selectItem = useCallback((item, type) => {
    if (type === 'around') {
      setSelect({ select: true, ...item })
    } else {
      setShowList(false)
      setList([])
      const _location = item.location.split(',').map(e => Number(e))
      setCenter(_location)
    }
  }, [])

  return <TopView>
    <Header
      renderHeader={<View className='get-location__header'>
        <Header.Back />
        <View className='get-location__header__input'>
          <Image className='get-location__header__search' src={sousuoIcon} onClick={() => nav('back:')} />
          <Input className='get-location__header__inputs' focus={params.disableAutoLocation} type='text' onInput={search} placeholder='请输入关键词 搜索地址' />
        </View>
      </View>}
    />
    <KeyboardAvoiding>
      <View className='get-location__main'>
        <Map
          center={center}
          onMoveEnd={mapChange}
        />
        <Image className='get-location__point' src={pointBlue} />
      </View>
      <View className='get-location'>
        <View className='get-location__my-position' onClick={getCurrentPosition}>
          <Image className='get-location__my-position__img' src={dingweiIcon} />
        </View>
        <ScrollView style={{ width: Taro.pxTransform(750) }}>
          <View className='get-location__top'>
            {
              load
                ? <View className='get-location__top__loading'><Loading size={46} /></View>
                :
                info.map((item, index) => (
                  <View className='get-location__top__rig' key={index} onClick={() => selectItem({ index, ...item }, 'around')}>
                    <View>
                      <Text className='get-location__top__rig__big' numberOfLine={2}>{item.addname}</Text>
                      <Text className='get-location__top__rig__adres' numberOfLine={1}>{item.province}{item.city}{item.district}{item.township}{item.address}</Text>
                    </View>
                    {index === select.index && <Image className='get-location__top__rig__select' src={duihaoIcon} />}
                  </View>
                ))
            }
          </View>
        </ScrollView>
        <View className='get-location__bottom'>
          <View className='get-location__bottom__btn'
            style={{
              backgroundColor: select.select ? duxappTheme.primaryColor : colorLighten(duxappTheme.primaryColor, 0.5)
            }}
            onClick={() => select.select ? submit() : toast('请选择地址')}
          ><Text style={{color: '#fff'}}>确定</Text></View>
        </View>
      </View>
      {(showList && list.length > 0) && <View className='get-location__mapList'>
        <ScrollView>
          {
            list.map((item, index) => <View key={'item' + index} className='get-location__mapList__item' onClick={() => selectItem(item)}>
              <View className='get-location__mapList__main'>
                <Text className='get-location__mapList__title' numberOfLines={1}>{item.name}</Text>
                <Text className='get-location__mapList__address' numberOfLines={2}>{item.address}</Text>
              </View>
            </View>)
          }
        </ScrollView>
      </View>
      }
    </KeyboardAvoiding>
  </TopView>
}
