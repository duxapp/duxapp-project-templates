import { usePageData } from '@/duxcms'
import { CmsIcon } from '@/duxcms/components/CmsIcon'
import { Column, Grid, Image, LinearGradient, Row, ScrollViewManage, Text, duxappTheme, nav, px } from '@/duxui'
import { Swiper, SwiperItem } from '@tarojs/components'
import { useEffect, useMemo, useState } from 'react'

export const HomeBanner = ({ height = 360 }) => {
  const { onRefresh } = ScrollViewManage.useContext()

  const [data, dataAction] = usePageData('tools/magic/banner', { cache: true })

  useEffect(() => {
    const { remove } = onRefresh(dataAction.reload)
    return () => remove()
  }, [dataAction.reload, onRefresh])

  const [select, setSelect] = useState(0)

  return <Column>
    <Swiper style={{ height: px(height) }} onChange={e => setSelect(e.detail.current)}>
      {
        data.map(item => {
          return <SwiperItem key={item.id}>
            <Image src={item.image} className='w-full h-full' onClick={() => nav(item.url)} />
          </SwiperItem>
        })
      }
    </Swiper>
    <Row className='absolute left-0 right-0 gap-1 z-1 bottom-0 pv-3' justify='center'>
      {
        data.map((item, index) => <Column
          key={item.id}
          className='r-2'
          style={{
            backgroundColor: select === index ? '#fff' : 'rgba(255,255,255,0.5)',
            width: px(select === index ? 32 : 12),
            height: px(12)
          }}
        />)
      }
    </Row>
  </Column>
}

export const HomeMenu = () => {
  const { onRefresh } = ScrollViewManage.useContext()

  const [data, dataAction] = usePageData('tools/magic/menu', { cache: true })

  useEffect(() => {
    const { remove } = onRefresh(dataAction.reload)
    return () => remove()
  }, [dataAction.reload, onRefresh])

  const culum = useMemo(() => {
    if (!data.length) {
      return 1
    }
    if (data.length < 3) {
      return 3
    }
    return [5, 4, 3].find(v => data.length % v === 0) || 5
  }, [data.length])

  if (!data.length) {
    return
  }

  return <Grid column={culum} gap={24} className='p-3 bg-white r-2 mt-3 mh-3'>
    {
      data.map(item => <Column key={item.id}
        className='gap-1' items='center'
        onClick={() => nav(item.url)}
      >
        <Image src={item.image} style={{ width: px(72) }} square />
        <Text size={2}>{item.title}</Text>
      </Column>)
    }
  </Grid>
}

export const HomeAd = () => {
  const { onRefresh } = ScrollViewManage.useContext()

  const [data, dataAction] = usePageData('tools/magic/ad', { cache: true })

  useEffect(() => {
    const { remove } = onRefresh(dataAction.reload)
    return () => remove()
  }, [dataAction.reload, onRefresh])

  if (!data.length) {
    return
  }

  return <Column className='mt-3 mh-3'>
    {
      data.map(item => <Image
        key={item.id}
        className='w-full r-2'
        mode='widthFix'
        src={item.image}
        onClick={() => nav(item.url)}
      />)
    }
  </Column>
}

export const HomeNav = ({ title, url, ...props }) => {
  return <Row className='overflow-hidden mh-3 mt-3' items='center' justify='between' {...props}>
    <Row items='center' >
      <LinearGradient className='absolute bottom-0 left-0'
        style={{
          width: px(68),
          height: px(12)
        }}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[duxappTheme.primaryColor, duxappTheme.pageColor]}
      />
      <Text className='z-1' size={6} bold >{title}</Text>
    </Row>
    {!!url && <Row items='center' onClick={() => nav(url)}>
      <Text color={3}>查看更多</Text>
      <CmsIcon name='direction_right' color='#A1A6B6' size={32} />
    </Row>}
  </Row>
}
