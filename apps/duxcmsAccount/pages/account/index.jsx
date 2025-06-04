import { Card, Column, Divider, Header, Text, TopView, nav, Row, DividerGroup } from '@/duxui'
import { useRequest, CmsIcon, duxappTheme } from '@/duxcms'
import { Price, accountHook } from '@/duxcmsAccount'

export default function Account() {

  const [info] = useRequest('member/account', { reloadForShow: true })

  return <TopView isSafe>
    <Header title='钱包' />
    <Card margin style={{ backgroundColor: duxappTheme.primaryColor }}>
      <Column className='mv-3' items='center'>
        <Text color={4} style={{ opacity: 0.8 }}>总余额</Text>
        <Price bold size={52} unitSize={3} color={4}>{info.balance}</Price>
        <Row className='gap-4'>
          <Text className='mt-2' style={{ opacity: 0.8 }} color={4}>可提现:<Price color={4} className='mt-2'>{info.amount}</Price></Text>
          <Text className='mt-2' style={{ opacity: 0.8 }} color={4}>不可提现:<Price color={4} className='mt-2'>{info.freeze}</Price></Text>
        </Row>
      </Column>
      <accountHook.Render mark='account.buttons'>
        {/* <Row className='mv-3 gap-3' justify='between'>
          <Button type='secondary' className='flex-grow' onClick={() => nav()}>充值</Button>
          <Button type='secondary' className='flex-grow' onClick={() => nav('duxcmsAccount/cash/index')}>提现</Button>
        </Row> */}
      </accountHook.Render>
    </Card>

    <Card margin disableMarginTop shadow={false} className='gap-3'>
      <DividerGroup padding={0}>
        <ListItem title='银行卡' url='duxcmsAccount/card/list' />
        <ListItem title='交易记录' url='duxcmsAccount/account/log' />
        <ListItem title='支付密码' url='duxcmsAccount/account/password' />
        <ListItem title='去提现' url='duxcmsAccount/cash/index' />
      </DividerGroup>
    </Card>
  </TopView>
}

const ListItem = ({ title, url }) => {
  return <Row justify='between' className='pv-1' onClick={() => nav(url)}>
    <Text bold>{title}</Text>
    <CmsIcon
      color='#a9aebd'
      name='direction_right'
      size={32}
    />
  </Row>
}
