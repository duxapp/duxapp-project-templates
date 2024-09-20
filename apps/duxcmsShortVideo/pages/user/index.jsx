import { CmsIcon, List, request, useRequest } from '@/duxcms'
import { Avatar, Button, Column, Empty, Header, Image, Row, Switch, Tab, Text, TopView, loading, px, toast, useRoute } from '@/duxui'
import { VideoIcon, previewVideos, user } from '@/duxcmsShortVideo'
import { useCallback, useState } from 'react'
import bg from './images/index-bg.png'

export default function User() {

  const { params } = useRoute()

  const [, loginStatus] = user.useUserInfo()

  const [data, { reload }] = useRequest(`short/user/${params.id}`)

  const [count, setCount] = useState(0)

  const fans = useCallback(async () => {
    if (!user.isLogin()) {
      await user.login()
    }
    data.my.fans = !data.my.fans
    await request({
      url: `member/fans/${params.id}`,
      method: 'POST',
      loading,
      toast: true
    })
    reload()
  }, [data.my, params.id, reload])

  const listCallback = useCallback((list, res) => {
    setCount(res._meta.total)
    return list
  }, [])

  const blacklist = useCallback(async () => {
    if (!user.isLogin()) {
      await user.login()
    }

    data.my.blacklist = !data.my.blacklist
    await request({
      url: `member/blacklist/${params.id}`,
      method: 'POST',
      loading,
      toast: true
    })
    reload()
  }, [data.my, params.id, reload])

  return <TopView>
    <Image src={bg} style={{ height: px(380) }} className='absolute w-full left-0 top-0' />
    <Header style={{ backgroundColor: 'transparent' }} title='TA的主页' />
    <List
      url={`short/user/${params.id}/videos`}
      renderEmpty={<Empty title='暂无作品' />}
      renderItem={Item}
      columns={3}
      listClassName='flex-row flex-wrap'
      listStyle={{ gap: px(4) }}
      listCallback={listCallback}
      renderHeader={<>
        <Row className='mt-3 mh-3 pv-3 gap-3' items='center'>
          <Avatar size='l' url={data.avatar} />
          <Column grow className='gap-1'>
            <Text bold>{data.nickname}</Text>
            <Text size={1} color={3}>ID：{params.id}</Text>
          </Column>
          {
            data.my?.fans ?
              <Button radiusType='round-min' className='bg-white' onClick={fans}>已关注</Button> :
              <Button type='primary' radiusType='round-min' onClick={fans}><CmsIcon name='add-select' /> 关注</Button>
          }
        </Row>
        <Column className='mt-2 rt-3 bg-white p-3 gap-3'>
          {!!data.info && <Text size={2}>{data.info}</Text>}
          {(!!data.sex || (!!data.age && data.age !== '未知') || !!data.province) && <Row className='gap-3'>
            {(!!data.sex || (!!data.age && data.age !== '未知')) && <Column className='r-1 p-1 bg-page'>
              <Text size={1}>{!!data.sex && <VideoIcon name={data.sex === 1 ? 'man-male' : 'woman-female'} size={30} />} {data.age}岁</Text>
            </Column>}
            {!!data.province && <Column className='r-1 p-1 bg-page'>
              <Text size={1}>{data.province}</Text>
            </Column>}
          </Row>}
          <Row className='mt-1 gap-4'>
            <Text size={5} bold>{data.stats?.concern || 0}<Text color={3} size={1} bold={false}> 关注</Text></Text>
            <Text size={5} bold>{data.stats?.fans || 0}<Text color={3} size={1} bold={false}> 粉丝</Text></Text>
            <Text size={5} bold>{data.stats?.praise || 0}<Text color={3} size={1} bold={false}> 获赞</Text></Text>
          </Row>
          <Row className='mt-1 gap-3' items='center'>
            <Text>黑名单</Text>
            <Switch onChange={blacklist}
              disabled={!loginStatus}
              value={data.my?.blacklist}
              onClick={() => {
                if (!loginStatus) {
                  toast('请登录后重试')
                }
              }}
            />
          </Row>
        </Column>
        <Tab defaultValue={0} className='mt-3'>
          <Tab.Item title={`作品${count}`} />
        </Tab>
        <Column className='mt-1' />
      </>}
    />
  </TopView>
}

const Item = ({ item, list, index, action }) => {

  const { params } = useRoute()

  return <Column
    onClick={async () => {
      const adLength = Math.ceil((list.length - index - 1) / 5)
      const _list = [...list]
      if (adLength && user.isLogin()) {
        try {
          const ads = await request({
            url: 'advert/advert',
            data: {
              area: 'video_star',
              limit: adLength
            },
            loading
          })
          ads.map((v, i) => {
            _list.splice((index + 1) + i * 6, 0, v)
          })
        } catch (error) {

        }
      }
      previewVideos({
        list: _list,
        select: index,
        url: `short/user/${params.id}/videos`,
        params: { advert: 1 },
        page: action.currentData.page,
        endData: {
          star_user_id: params.id
        }
      })
    }}
  >
    <Image src={item.cover} style={{ width: px(246), height: px(328) }} />
    <Column className='absolute left-0 bottom-0 right-0 p-2'>
      <Row items='center'>
        <VideoIcon name='xihuan' size={28} color='#fff' />
        <Text color={4} size={20}>{item.like}</Text>
      </Row>
    </Column>
  </Column>
}
