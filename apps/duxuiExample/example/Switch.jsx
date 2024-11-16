import { Header, ScrollView, TopView, Form, Card, Divider, Switch } from '@/duxuiExample'

export default function SwitchExample() {
  return <TopView>
    <Header title='Switch' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false} className='self-stretch'>
          <Divider.Group>
            <Form.Item label='开关' field='switch'>
              <Switch onChange={console.log} />
            </Form.Item>
            <Form.Item label='自定义选中值' field='custom'>
              <Switch values={[0, 1]} onChange={console.log} />
            </Form.Item>
            <Form.Item label='非受控模式'>
              <Switch onChange={console.log} />
            </Form.Item>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
