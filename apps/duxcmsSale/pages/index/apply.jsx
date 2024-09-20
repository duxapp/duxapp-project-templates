/* eslint-disable import/no-commonjs */
import { Row, Text, Column, Image, Card, nav, TopView, Header, ScrollView, Button, loading, Avatar } from '@/duxui'
import { Qrcode, request, useRequest, user, saleHook } from '@/duxcmsSale'
import { Fragment, useCallback, useMemo } from 'react'
import { pxTransform } from '@tarojs/taro'

const images = {
  header: require('./images/header.png'),
  info: require('./images/info.png'),
  levelbg: require('./images/levelbg.png'),
}

export default function SaleApply() {

  const [{ level = {}, upgrade = {} }, action] = useRequest('sale/level/equity')

  const [userInfo] = user.useUserInfo()

  const group = useMemo(() => {
    if (!upgrade.rule) {
      return [[], []]
    }
    const _list = upgrade.rule.reduce((prev, current) => {
      prev[current.operator ? 1 : 0].push(current)
      return prev
    }, [[], []])
    if (_list[1].length === 1) {
      _list[0].push(_list[1][0])
      _list[1] = []
    }
    return _list
  }, [upgrade.rule])

  const apply = useCallback(async () => {
    if ([-1, 0].includes(upgrade.apply_status)) {
      await request({
        url: 'sale/apply',
        method: 'POST',
        data: {
          tel: userInfo.tel
        },
        loading,
        toast: true
      })
      action.reload()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upgrade.apply_status, userInfo.tel])

  return <TopView>
    <Header absolute style={{ backgroundColor: 'transparent' }} color='#fff' />
    <ScrollView>
      <Image src={images.header} className='w-full' style={{ height: pxTransform(340) }} />
      <Column style={{ height: pxTransform(160), marginTop: pxTransform(-64) }} className='overflow-hidden m-3 r-2'>
        <Image src={images.info} className='absolute w-full h-full left-0 top-0' />
        <Row className='gap-3 p-3' items='center'>
          <Avatar size='l' url={userInfo.avatar}></Avatar>
          <Column className='gap-2'>
            <Text size={6} bold>{userInfo.nickname}</Text>
            <Text size={1} color={2}>
              电话号码：{userInfo.tel}
            </Text>
          </Column>
        </Row>
      </Column>
      <Column className='m-3 r-2 bg-white'>
        <Column style={{ height: pxTransform(240) }} className='m-1 r-2 overflow-hidden self-stretch'>
          <Image src={level.background || images.levelbg} className='absolute w-full h-full left-0 top-0' />
          <Column grow justify='center' className='gap-4 p-3' items='start'>
            <Column className='p-1 r-1' style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <Text color={4} size={2}>商家名称</Text>
            </Column>
            <Text color={4} size={54} bold>{level.name}</Text>
          </Column>
        </Column>
        {!!upgrade.next_level && <Column className='gap-4 p-3'>
          <Text size={5} bold>升级为{upgrade.next_level}</Text>
          {
            group.map((g, gi) => <Fragment key={gi}>
              {
                g.map((item, index) => <Row key={index} items='center' justify='between'>
                  <Text>{item.desc}</Text>
                  {
                    item.type === 1 ?
                      <Button size='s' type='primary' plain onClick={() => Qrcode.show(true)}>去邀请</Button> :
                      <saleHook.Render mark='apply.rule.buy'>
                        <Button size='s' type='primary' plain onClick={() => nav('duxcmsMall/goods/list')}>去购买</Button>
                      </saleHook.Render>
                  }
                </Row>)
              }
            </Fragment>)
          }
          {/* {!level?.id && <Row items='center' justify='between'>
            <Text>购买指定商品</Text>
            <Button size='s' type='primary' plain onClick={() => nav('duxcmsMall/goods/list?sale_mall=1')}>去购买</Button>
          </Row>} */}
        </Column>}
      </Column>
      <Card margin disableMarginTop className='gap-3'>
        <Card.Title>商家权益</Card.Title>
        <Text>{level.content}</Text>
      </Card>
    </ScrollView>
    {upgrade.apply && <Column className='p-3 bg-white'>
      <Button size='l' type={[-1, 0].includes(upgrade.apply_status) ? 'primary' : 'secondary'} onClick={apply}>{status[upgrade.apply_status + 1]}</Button>
    </Column>}
  </TopView>
}

const status = ['发起申请', '重新申请', '审批中', '已通过']
