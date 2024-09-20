import { Header, ScrollView, TopView, Form, Card, Divider, Input, PickerDate, PickerSelect, Textarea, Row } from '@/duxuiExample'

const defaultValues = {

}

const rules = {
  name: [
    {
      required: true,
      type: 'string',
      message: '输入框为必填字段'
    }
  ],
  tel: [
    {
      required: true,
      type: 'string',
      message: '介绍为必填字段'
    }
  ]
}

export default function FormExample() {
  return <TopView>
    <Header title='Form' />
    <Form onSubmit={console.log} defaultValues={defaultValues}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <Divider.Group>
            <Form.Item label='输入框' field='name' rules={rules.name}>
              <Input placeholder='请输入' align='right' grow />
            </Form.Item>
            <Form.Item label='介绍的输入' field='tel' desc='输入框介绍，这是输入框介绍' rules={rules.tel}>
              <Input placeholder='请输入' />
            </Form.Item>
            <Form.Item label='日期' field='date'>
              <PickerDate title='日期' placeholder='请选择日期' grow />
            </Form.Item>
            <Form.Item label='选择' field='sex'>
              <PickerSelect title='选择' placeholder='请选择性别' range={['男', '女']} grow />
            </Form.Item>
            <Form.Item label='介绍' field='desc' direction='vertical' >
              <Textarea placeholder='请输入介绍' maxlength={100} />
            </Form.Item>
          </Divider.Group>
        </Card>
        <Row className='p-3 gap-3'>
          <Form.Reset className='flex-grow'>重置</Form.Reset>
          <Form.Submit className='flex-grow' type='primary'>提交</Form.Submit>
        </Row>
      </ScrollView>
    </Form>
  </TopView>
}
