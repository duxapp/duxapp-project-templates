import { Header, ScrollView, TopView, Form, Card, Textarea, DividerGroup, FormItem } from '@/duxuiExample'

export default function TextareaExample() {
  return <TopView>
    <Header title='Textarea' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <DividerGroup>
            <FormItem label='输入框' field='input1'>
              <Textarea placeholder='请输入' grow />
            </FormItem>
            <FormItem label='上下布局' field='input2' vertical>
              <Textarea placeholder='请输入' />
            </FormItem>
            <FormItem label='限制文本和高度' field='input3' vertical>
              <Textarea placeholder='请输入' maxlength={120} line={10} />
            </FormItem>
          </DividerGroup>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
