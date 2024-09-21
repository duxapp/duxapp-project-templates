import { Header, ScrollView, TopView, Form, Card, Divider, PickerDate } from '@/duxuiExample'

export default function DateExample() {
  return <TopView>
    <Header title='Date' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <Divider.Group>
            <Form.Item label='日期' field='date'>
              <PickerDate title='日期' placeholder='请选择日期' grow />
            </Form.Item>
            <Form.Item label='年' field='year'>
              <PickerDate title='年' placeholder='请选择年' grow mode='year' />
            </Form.Item>
            <Form.Item label='月' field='month'>
              <PickerDate title='月' placeholder='请选择月' grow mode='month' />
            </Form.Item>
            <Form.Item label='日期时间' field='datetime'>
              <PickerDate title='日期时间' placeholder='请选择日期时间' grow mode='datetime' />
            </Form.Item>
            <Form.Item label='时间' field='time'>
              <PickerDate title='时间' placeholder='请选择时间' grow mode='time' />
            </Form.Item>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}