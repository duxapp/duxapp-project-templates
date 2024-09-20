import { Layout, loading, useDeepObject, useRoute } from '@/duxui'
import { Swiper, SwiperItem } from '@tarojs/components'
import { useCallback, useEffect, useRef, useState } from 'react'
import { request } from '@/duxcmsShortVideo'
import { WechatShare } from '@/wechat'
import { ShortVideoItem } from './Video'
import { ShortVideoItemCustom } from './VideoCustom'

export const ShortVideoList = ({
  pause,
  ...props
}) => {

  const { params } = useRoute()

  const allParams = useDeepObject({
    ...params,
    ...props
  })

  const page = useRef({
    page: allParams.page || 0,
    complete: false
  })

  const [layout, setLayout] = useState({})

  const [list, setList] = useState(allParams.list || [])

  const [select, setSelect] = useState(allParams.select || 0)

  const getList = useCallback(async init => {
    if (allParams.url === 'none') {
      return console.log('不获取视频')
    }
    const data = {
      ...allParams.params
    }
    if (page.current.page) {
      page.current.page += 1
      data.page = page.current.page
    }
    const res = await request({
      url: allParams.url || 'short/video',
      loading: init ? loading : false,
      toast: true,
      data
    })
    if (!res.length) {
      page.current.complete = true
      return
    }
    setList(old => {
      return [
        ...old,
        ...res,
      ]
    })
  }, [allParams.params, allParams.url])

  useEffect(() => {
    if (!allParams.list || allParams.list.length === allParams.select + 1) {
      getList(!allParams.list?.length)
    }
  }, [allParams.list, allParams.select, getList])

  const swiper = useCallback(e => {
    const i = e.detail.current
    setSelect(i)
    if (i >= list.length - 2 && !page.current.complete) {
      getList()
    }
  }, [getList, list.length])

  const selectItem = list[select] || {}

  WechatShare.useSharePage({
    title: selectItem.title,
    image: selectItem.cover,
    path: '/duxcmsShortVideo/pages/video/detail',
    params: {
      share: 1,
      id: selectItem.id
    }
  })

  return <Layout className='flex-grow' onLayout={setLayout}>
    {layout.height > 0 && !!list.length && (
      <Swiper
        style={{ height: layout.height, width: layout.width }}
        vertical
        current={select}
        onChange={swiper}
      >
        {list.map((item, index) => {
          const Item = item.userCustom ? ShortVideoItemCustom : ShortVideoItem
          return (
            <SwiperItem key={index}>
              <Item
                index={index}
                item={item}
                pause={pause}
                isSelect={index === select}
                params={allParams}
                isShow={
                  index >= select - 1 &&
                  index <= select + 1
                }
              />
            </SwiperItem>
          )
        })}
      </Swiper>
    )}
  </Layout>
}
