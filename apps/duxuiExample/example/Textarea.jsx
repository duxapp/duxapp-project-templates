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
            <Form.Item label='上下布局' field='input2' vertical>
              <Textarea placeholder='请输入' />
            </Form.Item>
            <Form.Item label='限制文本和高度' field='input3' vertical>
              <Textarea placeholder='请输入' maxlength={120} line={10} />
            </Form.Item>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
