import { Header, ScrollView, TopView, Form, Card, Divider, Switch, DividerGroup, FormItem } from '@/duxuiExample'

export default function SwitchExample() {
  return <TopView>
    <Header title='Switch' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <DividerGroup>
            <FormItem label='开关' field='switch'>
              <Switch onChange={console.log} />
            </FormItem>
            <FormItem label='自定义选中值' field='custom'>
              <Switch values={[0, 1]} onChange={console.log} />
            </FormItem>
            <FormItem label='非受控模式'>
              <Switch onChange={console.log} />
            </FormItem>
          </DividerGroup>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
