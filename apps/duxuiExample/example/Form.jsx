import { Header, ScrollView, TopView, Form, Card, Divider, Input, PickerDate, PickerSelect, Textarea, Row, DividerGroup, FormItem, FormSubmit, FormReset } from '@/duxuiExample'

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
          <DividerGroup>
            <FormItem label='输入框' field='name' rules={rules.name}>
              <Input placeholder='请输入' align='right' grow />
            </FormItem>
            <FormItem label='介绍的输入' field='tel' desc='输入框介绍，这是输入框介绍' rules={rules.tel}>
              <Input placeholder='请输入' />
            </FormItem>
            <FormItem label='日期' field='date'>
              <PickerDate title='日期' placeholder='请选择日期' grow />
            </FormItem>
            <FormItem label='选择' field='sex'>
              <PickerSelect title='选择' placeholder='请选择性别' range={['男', '女']} grow />
            </FormItem>
            <FormItem label='介绍' field='desc' direction='vertical' >
              <Textarea placeholder='请输入介绍' maxlength={100} />
            </FormItem>
          </DividerGroup>
        </Card>
        <Row className='p-3 gap-3'>
          <FormReset className='flex-grow'>重置</FormReset>
          <FormSubmit className='flex-grow' type='primary'>提交</FormSubmit>
        </Row>
      </ScrollView>
    </Form>
  </TopView>
}
