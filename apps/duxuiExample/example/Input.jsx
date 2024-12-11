import { Header, ScrollView, TopView, Form, Card, Divider, Input, toast } from '@/duxuiExample'

export default function InputExample() {
  return <TopView>
    <Header title='Input' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <Divider.Group>
            <Form.Item label='输入框' field='input1'>
              <Input placeholder='请输入' grow />
            </Form.Item>
            <Form.Item label='文本在右' field='input2'>
              <Input placeholder='请输入' align='right' grow />
            </Form.Item>
            <Form.Item label='搜索输入' field='input3'
              desc='使用防抖处理的输入框'
            >
              <Input.Search placeholder='请输入关键词' align='right' grow
                onChange={e => toast('触发输入:' + e)}
              />
            </Form.Item>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
