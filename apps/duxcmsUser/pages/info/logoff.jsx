import { request, user } from '@/duxcmsUser'
import { Button, Header, TopView, Column, Text, Row, colorLighten, duxappTheme, confirm, loading, toast, route } from '@/duxui'

export default function Logoff() {

  const logoff = async () => {
    if (await confirm({
      title: '注销账户',
      content: '警告，您正在执行危险操作，注销账户后，您的数据将会被删除，且无法撤销，请谨慎选择！',
      confirmText: '确认注销'
    })) {
      await request({
        url: 'member/setting/disable',
        loading,
        toast: true,
        method: 'POST'
      })
      toast('注销成功')
      user.logout()
    }
  }

  return <TopView>
    <Header title='注销账户' />
    <Column className='r-3 bg-white m-3 p-3 gap-4'>
      <Text size={5} bold align='center' type='danger'>如果您是误操作，请点[暂不注销]</Text>
      <Column className='p-3 gap-1 r-3'
        style={{
          backgroundColor: colorLighten(duxappTheme.dangerColor, 0.9)
        }}
      >
        <Text size={5}>注销提示</Text>
        <Text size={1} color={2}>一旦注销成功{'\n'}
          你的账号将无法登录和使用。{'\n'}
          你的账号信息和会员权益将永久清除且无法恢复。</Text>
        <Column className='p-2' />
        <Row className='ph-3 gap-4'>
          <Button size='l' type='danger' className='flex-grow' onClick={logoff}>确认注销</Button>
          <Button size='l' type='primary' className='flex-grow' onClick={() => route.back()}>暂不注销</Button>
        </Row>
      </Column>
    </Column>
  </TopView>
}


