import { Header, ScrollView, TopView, Form, Card, Divider, Switch } from '@/duxuiExample'

export default function SwitchExample() {
  return <TopView>
    <Header title='Switch' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <Divider.Group>

            <Form.Item label='开关' field='switch'>
              <Switch />
            </Form.Item>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
