import { Detail } from '@/duxcmsAccount'
import { TopView, Header, Divider, Card, Empty, Button, nav, Text, Image, Row, px, DividerGroup } from '@/duxui'

export default function UserReal() {
  return <TopView>
    <Header title='实名认证' />
    <Detail
      url='member/real'
      reloadForShow
    >
      {Content}
    </Detail>
  </TopView>
}


const Content = ({ data, action }) => {
  if (action.status) {
    return
  }
  if (!data.no) {
    return <Card margin>
      <Empty
        title='未实名认证'
        renderFooter={<Button type='primary' size='l' onClick={() => nav('duxcmsAccount/real/form')}>去认证</Button>}
      />
    </Card>
  }
  return <>
    <Card margin className='gap-3'>
      <DividerGroup padding={0}>
        <Row items='center' justify='between'>
          <Text color={2}>状态</Text>
          <Text bold>{data.status ? '已实名认证' : '认证被驳回'}</Text>
        </Row>
        <Row items='center' justify='between'>
          <Text color={2}>姓名</Text>
          <Text bold>{data.name}</Text>
        </Row>
        <Row items='center' justify='between'>
          <Text color={2}>身份证号</Text>
          <Text bold>{data.no}</Text>
        </Row>
        <Row items='center' justify='between'>
          <Text color={2}>身份证正面</Text>
          <Image src={data.card_front} preview style={{ width: px(400), height: px(280) }} />
        </Row>
        <Row items='center' justify='between'>
          <Text color={2}>身份证反面</Text>
          <Image src={data.card_back} preview style={{ width: px(400), height: px(280) }} />
        </Row>
      </DividerGroup>
      {data.status === 0 && <Button type='primary' size='l' className='self-center' style={{ width: px(320) }}>重新认证</Button>}
    </Card>
  </>
}
