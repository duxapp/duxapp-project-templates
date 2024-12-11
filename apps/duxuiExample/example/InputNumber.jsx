import { Header, ScrollView, TopView, Form, Card, Divider, InputNumber, px } from '@/duxuiExample'

export default function InputNumberExample() {
  return <TopView>
    <Header title='InputNumber' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <Divider.Group>
            <Form.Item label='基本用法' field='input1'>
              <InputNumber />
            </Form.Item>
            <Form.Item label='允许输入' field='input2' desc='使用输入属性后，最好手动指定一个宽度，否则 input 会将宽度撑开'>
              <InputNumber input
                style={{ width: px(200) }}
              />
            </Form.Item>
            <Form.Item label='步长' field='input3'>
              <InputNumber step={2} />
            </Form.Item>
            <Form.Item label='小数' field='input4'>
              <InputNumber defaultValue={0.3} step={0.5} />
            </Form.Item>
            <Form.Item label='最大最小值' field='input5'>
              <InputNumber max={5} min={1} defaultValue={1} />
            </Form.Item>
            <Form.Item label='主题' field='input6'>
              <InputNumber type='success' />
            </Form.Item>
            <Form.Item label='禁用' field='input7' disabled>
              <InputNumber />
            </Form.Item>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
