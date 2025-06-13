import { Header, ScrollView, TopView, Form, Card, Cascade, DividerGroup, FormItem } from '@/duxuiExample'

const cascadeData = [
  {
    name: '分类1', value: 1, children: [
      { name: '分类1-1', value: 11 },
      { name: '分类1-2', value: 12 },
      { name: '分类1-3', value: 13 },
    ]
  },
  {
    name: '分类2', value: 2, children: [
      { name: '分类2-1', value: 21 },
      { name: '分类2-2', value: 22 },
      { name: '分类2-3', value: 23 },
    ]
  },
  {
    name: '分类3', value: 3, children: [
      { name: '分类3-1', value: 31 },
      { name: '分类3-2', value: 32 },
      { name: '分类3-3', value: 33 },
    ]
  }
]

const defaultValues = {
  cascade1: 32,
  cascade2: [22, 23]
}

export default function CascadeExample() {
  return <TopView>
    <Header title='Cascade' />
    <Form onSubmit={console.log} defaultValues={defaultValues}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <DividerGroup>
            <FormItem label='级联选择单选' field='cascade1' direction='vertical' >
              <Cascade data={cascadeData} level={2} mode='radio' theme='fill' anyLevel />
            </FormItem>
            <FormItem label='级联选择多选' field='cascade2' direction='vertical' >
              <Cascade data={cascadeData} level={2} mode='checkbox' theme='fill' anyLevel />
            </FormItem>
            <FormItem label='默认样式' field='cascade3' direction='vertical' >
              <Cascade data={cascadeData} level={2} mode='checkbox' anyLevel />
            </FormItem>
            <FormItem label='只允许最后一级选中' field='cascade4' direction='vertical' >
              <Cascade data={cascadeData} level={2} mode='checkbox' />
            </FormItem>
            <FormItem label='非受控模式' direction='vertical' >
              <Cascade data={cascadeData} level={2} mode='checkbox' />
            </FormItem>
          </DividerGroup>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
