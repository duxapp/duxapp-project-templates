import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { ScrollView, Image, Header, Row } from '@/duxui'
import { nav, usePageData, duxappTheme, userConfig } from '@/duxcmsMall/utils'
import { HeaderSearch } from '@/duxcmsOrder'
import './index.scss'
import classNames from 'classnames'

export const MallCate = ({ url = 'duxcmsMall/goods/list' }) => {

  const [data, dataAction] = usePageData('mall/class')

  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (refresh) {
      dataAction.reload().finally(() => setRefresh(false))
    }
  }, [dataAction, refresh])

  const [select, setSelect] = useState(0)


  const { level = 2 } = userConfig.option.duxcmsMall?.category || {}

  const children = level === 1 ? data : data[select] ? data[select].children : []

  const leftRenderData = level > 1 ? [...data, { disable: true }] : null

  return <>
    <Header
      renderHeader={<Row className='h-full'>
        <Header.Back />
        <HeaderSearch placeholder='搜索商品' className='m-1' disabled onClick={() => nav('duxcmsMall/goods/list', { search: 1 })} />
      </Row>}
    />
    <View className='GoodsCate'>
      <View className='GoodsCate-main'>
        {level > 1 && <View className='GoodsCate-left'>
          <ScrollView>
            {
              leftRenderData.map((item, index) => {
                const hover = select === index
                const top = select - 1 === index
                const bottom = select + 1 === index
                return <View key={item.id} style={{ backgroundColor: duxappTheme.pageColor }}>
                  <View
                    className={['GoodsCate-left__item', hover && 'GoodsCate-left__item--hover', top && 'GoodsCate-left__item--top', bottom && 'GoodsCate-left__item--bottom'].join(' ')}
                    onClick={() => !item.disable && setSelect(index)}
                    style={hover ? { backgroundColor: duxappTheme.pageColor } : {}}
                  >
                    <View className={classNames('GoodsCate-left__line', hover ? 'bg-primary' : 'bg-white')} />
                    <Text className={['GoodsCate-left__name', hover && 'GoodsCate-left__name--hover'].join(' ')} style={{ color: hover ? duxappTheme.primaryColor : '#5c5b5a' }}>{item.name}</Text>
                  </View>
                </View>
              })
            }
          </ScrollView>
        </View>}
        <View className='GoodsCate-right'>
          <ScrollView
            onRefresh={() => setRefresh(true)}
            refresh={refresh}
          >
            {
              level < 3
                ? <View className='GoodsCate-right__item' key={data[select]?.id}>
                  <ChildItem list={level === 1 ? data : data[select]?.children} url={url} />
                </View>
                : children.map(item => <View className='GoodsCate-right__item' key={item.id}>
                  <Text className='GoodsCate-right__name' onClick={() => nav(`${url}?id=` + item.id)}>{item.name}</Text>
                  <ChildItem list={item.children} />
                </View>)
            }
          </ScrollView>
        </View>
      </View>
    </View>
  </>
}

const ChildItem = ({ list, url }) => {
  return <View className='GoodsCate-right__childs'>
    {list?.map(item => <View className='GoodsCate-right__child' key={item.id} onClick={() => nav(`${url}?class=` + item.id)}>
      {!!item.image && <Image className='GoodsCate-right__child__image r-2' src={item.image} mode='aspectFit' />}
      <Text className='GoodsCate-right__child__name'>{item.name}</Text>
    </View>)}
    <View className='GoodsCate-right__child--empty' />
    <View className='GoodsCate-right__child--empty' />
  </View>
}
