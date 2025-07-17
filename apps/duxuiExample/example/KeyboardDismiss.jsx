import { Header, KeyboardDismiss, TopView, Form, Card, Input, PickerDate, Row, DividerGroup, FormItem, FormSubmit } from '@/duxuiExample'

export default function KeyboardDismissExample() {

  const submit = async data => {
    console.log(data)
  }

  return <TopView>
    <Header title='KeyboardDismiss' />
    <Form onSubmit={submit}>
      <KeyboardDismiss>
        <Card margin verticalPadding={false}>
          <DividerGroup>
            <FormItem label='输入框' name='text' desc='这个组件仅针对RN端生效，其他端默认如此'>
              <Input placeholder='请输入' align='right' grow />
            </FormItem>
            <FormItem label='介绍的输入' name='desc' desc='输入框介绍，这是输入框介绍'>
              <Input placeholder='请输入' />
            </FormItem>
            <FormItem label='日期' name='date' desc='当键盘弹出时，点击选择日期，可以收起键盘并弹出日期'>
              <PickerDate title='日期' placeholder='请选择日期' grow />
            </FormItem>
          </DividerGroup>
        </Card>
        <Row className='p-3 gap-3'>
          <FormSubmit className='flex-grow' type='primary'>提交</FormSubmit>
        </Row>
      </KeyboardDismiss>
    </Form>
  </TopView>
}
