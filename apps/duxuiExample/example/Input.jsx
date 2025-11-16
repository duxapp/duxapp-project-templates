import { Header, ScrollView, TopView, Form, Card, Input, toast, DividerGroup, FormItem, InputSearch } from '@/duxuiExample'

export default function InputExample() {
  return <TopView>
    <Header title='Input' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <DividerGroup>
            <FormItem label='输入框' name='input1'>
              <Input placeholder='请输入' grow />
            </FormItem>
            <FormItem label='文本在右' name='input2'>
              <Input placeholder='请输入' align='right' grow />
            </FormItem>
            <FormItem label='搜索输入' name='input3'
              desc='使用防抖处理的输入框'
            >
              <InputSearch placeholder='请输入关键词' align='right' grow
                onChange={e => toast('触发输入:' + e)}
              />
            </FormItem>
          </DividerGroup>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
