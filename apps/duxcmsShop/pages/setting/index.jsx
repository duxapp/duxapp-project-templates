import { Avatar, Button, Card, Column, Divider, Header, Row, ScrollView, Text, TopView, nav, DividerGroup } from '@/duxui'
import { CmsIcon, cmsUser, duxappTheme, user, AppUpgrade } from '@/duxcmsUser'

export default function UserSetting() {

  const [userInfo, loginStatus] = cmsUser.useUserInfo()

  return <TopView>
    <Header title='设置' />
    <ScrollView>
      {loginStatus && <Card margin verticalPadding={false} disableMarginBottom>
        <Row items='center' justify='between' className='pv-3 gap-3' onClick={() => nav('duxcmsUser/info/setting')}>
          <Avatar size='m' url={userInfo.avatar} />
          <Column grow className='gap-2'>
            <Text bold >{userInfo.nickname}</Text>
            <Text size={2}>{userInfo.tel}</Text>
          </Column>
          <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
        </Row>
      </Card>}
      <Card margin disableMarginBottom verticalPadding={false}>
        <DividerGroup padding={0}>
          {loginStatus && <Row items='center' justify='between' className='pv-3' onClick={() => nav('duxcmsAccount/account/password')}>
            <Text bold grow>支付密码</Text>
            <Text color={3}>去设置</Text>
            <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
          </Row>}
          {loginStatus && <Row items='center' justify='between' className='pv-3' onClick={() => nav('duxcmsOrder/address/list')}>
            <Text bold grow>收货地址</Text>
            <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
          </Row>}
          <Row items='center' justify='between' className='pv-3' onClick={() => nav('duxcms/common/richtext?url=member/about&title=关于我们')}>
            <Text bold grow>关于我们</Text>
            <Text color={3}>去查看</Text>
            <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
          </Row>
          <Row items='center' justify='between' className='pv-3' onClick={() => nav('duxcms/common/richtext?url=member/agreement&title=用户协议')}>
            <Text bold grow>用户协议</Text>
            <Text color={3}>去查看</Text>
            <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
          </Row>
          <Row items='center' justify='between' className='pv-3' onClick={() => nav('duxcms/common/richtext?url=member/privacy&title=隐私政策')}>
            <Text bold grow>隐私政策</Text>
            <Text color={3}>去查看</Text>
            <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
          </Row>
          <AppUpgrade>
            <Row items='center' justify='between' className='pv-3'>
              <Text bold grow>版本更新</Text>
              <Text color={3}><AppUpgrade.Version /></Text>
              <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
            </Row>
          </AppUpgrade>
        </DividerGroup>
      </Card>
      {loginStatus && <Column className='p-2 mt-3'>
        <Button onClick={user.logout} type='primary' radiusType='round' size='l'>退出登录</Button>
      </Column>}
    </ScrollView>
  </TopView>
}
