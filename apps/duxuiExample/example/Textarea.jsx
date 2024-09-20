import { Header, ScrollView, TopView, Form, Card, Divider, Textarea } from '@/duxuiExample'

export default function TextareaExample() {
  return <TopView>
    <Header title='Textarea' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <Divider.Group>
            <Form.Item label='输入框' field='input1'>
              <Textarea placeholder='请输入' grow />
            </Form.Item>
            <Form.Item label='文本在右' field='input2' direction='vertical'>
              <Textarea placeholder='请输入' grow />
            </Form.Item>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
