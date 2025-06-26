import { Header, ScrollView, TopView, Form, Card, Input, PickerDate, PickerSelect, Textarea, Row, DividerGroup, FormItem, FormSubmit, FormReset, confirm, route } from '@/duxuiExample'

// 默认值支持多种形式 会直接定义值 函数返回值 异步函数返回值
const defaultValues = async () => {
  return {
    text: '这是默认值'
  }
}

const rules = {
  text: [
    {
      required: true,
      type: 'string',
      message: '输入框为必填字段'
    }
  ],
  desc: [
    {
      required: true,
      type: 'string',
      message: '介绍为必填字段'
    }
  ]
}

export default function FormExample() {

  const submit = async data => {
    console.log(data)
    await confirm({
      title: '提交成功',
      content: '表单缓存将被清除，再次进入表单需要重新填写'
    })
    route.back()
    return true
  }

  return <TopView>
    <Header title='Form' />
    <Form cache='duxui-form' onSubmit={submit} defaultValues={defaultValues}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <DividerGroup>
            <FormItem label='输入框' name='text' rules={rules.text}>
              <Input placeholder='请输入' align='right' grow />
            </FormItem>
            <FormItem label='介绍的输入' name='desc' desc='输入框介绍，这是输入框介绍' rules={rules.desc}>
              <Input placeholder='请输入' />
            </FormItem>
            <FormItem label='日期' name='date'>
              <PickerDate title='日期' placeholder='请选择日期' grow />
            </FormItem>
            <FormItem label='选择' name='sex'>
              <PickerSelect title='选择' placeholder='请选择性别' range={['男', '女']} grow />
            </FormItem>
            <FormItem label='介绍' name='info' direction='vertical' >
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
