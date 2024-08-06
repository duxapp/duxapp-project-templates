import { Avatar, Badge, Card, Column, Grid, Header, LinearGradient, Row, ScrollView, ScrollViewManage, Text, colorLighten, duxappTheme, nav, px } from '@/duxui'
import { AppUpgrade, CmsIcon, TabBar, request, user, shopHook, contextState } from '@/duxcmsShop'
import { getSystemInfoSync } from '@tarojs/taro'
import { useEffect, useState } from 'react'

export function User() {

  const [, loginStatus] = user.useUserInfo()

  const [total, setTotal] = useState({})

  const show = TabBar.useShowStatus()

  useEffect(() => {
    if (show) {
      if (loginStatus && user.isLogin()) {
        request('member/stats').then(setTotal)
        request('member/info').then(user.setInfo)
      } else {
        setTotal({})
      }
    }
  }, [loginStatus, show])

  return <contextState.Provider value={{ total }}>
    <Header absolute style={{ backgroundColor: 'transparent' }}
      renderHeader={<shopHook.Render mark='user.header'>
        <Row className='h-full gap-3 ph-3' items='center' justify='end'>
          <Badge count={total.member?.notice}>
            <CmsIcon onClick={() => nav('duxcmsUser/notice/list')} size={48} color={duxappTheme.textColor1} name='remind' />
          </Badge>
          <CmsIcon onClick={() => nav('duxcmsShop/setting/index')} size={48} color={duxappTheme.textColor1} name='set' />
        </Row>
      </shopHook.Render>}
    />
    <shopHook.Render mark='user.bg'>
      <LinearGradient colors={[colorLighten(duxappTheme.primaryColor, 0.9), duxappTheme.pageColor]} className='absolute left-0 top-0 w-full' style={{ height: px(1000) }} />
    </shopHook.Render>
    <shopHook.Render mark='user.info'>{UserInfo}</shopHook.Render>
    <ScrollViewManage>
      <ScrollView>
        <shopHook.Render mark='user.total'>{Total}</shopHook.Render>
        <shopHook.Render mark='user.order'>{Order}</shopHook.Render>
        <shopHook.Render mark='user.other'>{Other}</shopHook.Render>
        <Column className='p-2' />
      </ScrollView>
    </ScrollViewManage>
  </contextState.Provider>
}

const UserInfo = () => {

  const [userInfo, loginStatus] = user.useUserInfo()

  const statusBarHeight = getSystemInfoSync().statusBarHeight || 0

  return loginStatus ?
    <Row className='gap-3 p-3' items='center' style={{ marginTop: statusBarHeight + 40 }} onClick={() => nav('duxcmsUser/info/setting')}>
      <Avatar size='l' url={userInfo.avatar}></Avatar>
      <Column className='gap-2'>
        <Row items='center' className='gap-2'>
          <Text size={6} bold>{userInfo.nickname}</Text>
        </Row>
      </Column>
    </Row> :
    <Row key='login' className='p-3 gap-2' items='center' style={{ marginTop: statusBarHeight + 40 }} onClick={user.login}>
      <Avatar />
      <Text>去登陆</Text>
    </Row>
}

const Total = () => {

  const [loginStatus] = user.useUserInfo()

  const [{ total: { member = {} } }] = contextState.useState()

  if (!loginStatus) {
    return
  }

  return <Row className='p-3'>
    <shopHook.Render mark='user.total.collect'>
      <Column className='gap-1' grow items='center' onClick={() => nav('duxcmsUser/collect/list')}>
        <Text size={40} bold>{+member.collect || 0}</Text>
        <Text size={2} color={2}>收藏</Text>
      </Column>
    </shopHook.Render>
    <shopHook.Render mark='user.total.account'>
      <Column className='gap-1' grow items='center' onClick={() => nav('duxcmsAccount/account/index')}>
        <Text size={40} bold>{+member.money || 0}</Text>
        <Text size={2} color={2}>钱包</Text>
      </Column>
    </shopHook.Render>
    <shopHook.Render mark='user.total.foot'>
      <Column className='gap-1' grow items='center' onClick={() => nav('duxcmsUser/foot/list')}>
        <Text size={40} bold>{+member.foot || 0}</Text>
        <Text size={2} color={2}>足迹</Text>
      </Column>
    </shopHook.Render>
  </Row>
}

const Order = () => {


  const [{ total: { order = {} } }] = contextState.useState()

  return <Card className='m-3 flex-row justify-between'>
    <Badge className='mv-2' count={order.pay}>
      <Column items='center' className='gap-2' onClick={() => nav('duxcmsOrder/order/list?type=1')}>
        <CmsIcon name='package_box_fill' size={72} color={duxappTheme.primaryColor} />
        <Text size={1}>待付款</Text>
      </Column>
    </Badge>
    <Badge className='mv-2' count={order.receive}>
      <Column items='center' className='gap-2' onClick={() => nav('duxcmsOrder/order/list?type=4')}>
        <CmsIcon name='package_transportation_fill' size={72} color={duxappTheme.primaryColor} />
        <Text size={1}>待收货</Text>
      </Column>
    </Badge>
    <Badge className='mv-2' count={order.comment}>
      <Column items='center' className='gap-2' onClick={() => nav('duxcmsOrder/order/list?type=6')}>
        <CmsIcon name='comments-fill' size={72} color={duxappTheme.primaryColor} />
        <Text size={1}>待评价</Text>
      </Column>
    </Badge>
    <Badge className='mv-2'>
      <Column items='center' className='gap-2' onClick={() => nav('duxcmsOrder/refund/list')}>
        <CmsIcon name='CurrencyConverter-fill' size={72} color={duxappTheme.primaryColor} />
        <Text size={1}>售后</Text>
      </Column>
    </Badge>
    <Badge className='mv-2'>
      <Column items='center' className='gap-2' onClick={() => nav('duxcmsOrder/order/list')}>
        <CmsIcon name='order_def_fill' size={72} color={duxappTheme.primaryColor} />
        <Text size={1}>我的订单</Text>
      </Column>
    </Badge>
  </Card>
}

const Other = () => {
  return <Card className='gap-3' margin disableMarginTop>
    <Text bold>其他功能</Text>
    <Grid column={4}>
      {shopHook.Render({ mark: 'user.other.before' })}
      <Column grow items='center' className='gap-2 pv-2' onClick={() => nav('duxcms/common/richtext?url=member/about&title=关于我们')}>
        <CmsIcon name='promot_tips' size={64} color={duxappTheme.textColor1} />
        <Text size={1}>关于我们</Text>
      </Column>
      <Column grow items='center' className='gap-2 pv-2' onClick={() => nav('duxcmsOrder/address/list')}>
        <CmsIcon name='map' size={64} color={duxappTheme.textColor1} />
        <Text size={1}>地址管理</Text>
      </Column>
      <Column grow items='center' className='gap-2 pv-2' onClick={() => nav('duxcmsShop/help/list')}>
        <CmsIcon name='help_FAQ' size={64} color={duxappTheme.textColor1} />
        <Text size={1}>帮助中心</Text>
      </Column>
      {/* <Column grow items='center' className='gap-2 pv-2' onClick={platformCustom}>
        <CmsIcon name='service' size={64} color={duxappTheme.textColor1} />
        <Text size={1}>平台客服</Text>
      </Column> */}
      <Column grow items='center' className='gap-2 pv-2' onClick={() => nav('duxcmsUser/feedback/index')}>
        <CmsIcon name='editor' size={64} color={duxappTheme.textColor1} />
        <Text size={1}>意见反馈</Text>
      </Column>
      {shopHook.Render({ mark: 'user.other.after' })}
      <AppUpgrade>
        <Column grow items='center' className='gap-2 pv-2'>
          <CmsIcon name='tongguan' size={64} color={duxappTheme.textColor1} />
          <Text size={1}>版本更新</Text>
        </Column>
      </AppUpgrade>
    </Grid>
  </Card>
}
