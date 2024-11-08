import { Header, ScrollView, TopView, Form, Card, Divider, PickerSelect, PickerMultiSelect } from '@/duxuiExample'

const selectorData = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const selectorObjectData = [
  { name: '选项0', value: 0 },
  { name: '选项1', value: 1 },
  { name: '选项2', value: 2 },
  { name: '选项3', value: 3 },
  { name: '选项4', value: 4 },
  { name: '选项5', value: 5 },
  { name: '选项6', value: 6 },
  { name: '选项7', value: 7 }
]

const multiSelectorData = [selectorObjectData, selectorObjectData, selectorObjectData]

export default function PickerExample() {
  return <TopView>
    <Header title='Picker' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <Divider.Group>

            <Form.Item label='单列选择' field='picker1'>
              <PickerSelect placeholder='请选择' range={selectorData} grow title='请选择' />
            </Form.Item>

            <Form.Item label='单列选择启用搜索' field='pickerSearch'>
              <PickerSelect placeholder='请选择' search range={selectorData} grow title='请选择' />
            </Form.Item>

            <Form.Item label='多列选择' field='picker2'>
              <PickerMultiSelect placeholder='请选择' range={multiSelectorData} grow title='请选择' />
            </Form.Item>

            <Form.Item label='单列选择对象数据' field='picker3'>
              <PickerSelect placeholder='请选择' range={selectorObjectData} grow title='请选择' />
            </Form.Item>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
