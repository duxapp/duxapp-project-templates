import { Space, Header, ScrollView, TopView, Form, Card, Divider, Input, PickerDate, Text, Row } from '@/duxuiExample'

const ArrayItem = ({ value, index, values }) => {
  return <>
    <Card margin verticalPadding={false}>
      <Form.Item field={index}>
        <Form.Object>
          <Divider.Group>
            <Form.Item label='项目' field='name'>
              <Row grow justify='end'>
                <Form.ArrayAction
                  action={list => {
                    list.splice(index, 1)
                    return list
                  }}
                >
                  <Text>删除</Text>
                </Form.ArrayAction>
              </Row>
            </Form.Item>
            <Form.Item label='名称' field='name'>
              <Input placeholder='名称' align='right' grow />
            </Form.Item>
            <Form.Item label='内容' field='tel'>
              <Input placeholder='内容' align='right' grow />
            </Form.Item>
            <Form.Item label='生产日期' field='date'>
              <PickerDate placeholder='请选择日期' />
            </Form.Item>
          </Divider.Group>
        </Form.Object>
      </Form.Item>
    </Card>
    {
      index === values?.length - 1 && <Form.ArrayAction action={list => [...list, {}]}>
        <Card margin>
          <Space row>
            <Text>添加</Text>
          </Space>
        </Card>
      </Form.ArrayAction>
    }
  </>
}

const defaultValues = {
  array: [{}]
}

export default function FormComplexExample() {
  return <TopView>
    <Header title='FormComplex' />
    <Form onSubmit={console.log} defaultValues={defaultValues}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <Divider.Group>
            <Form.Item label='标题' field='name'>
              <Input placeholder='标题' align='right' grow />
            </Form.Item>
            <Form.Item label='介绍' field='tel' desc='输入框介绍，这是输入框介绍'>
              <Input placeholder='介绍' />
            </Form.Item>
          </Divider.Group>
        </Card>
        <Form.Item field='array'>
          <Form.Array renderItem={ArrayItem} />
        </Form.Item>
        <Form.Submit>提交</Form.Submit>
      </ScrollView>
    </Form>
  </TopView>
}
