import { Space, Header, ScrollView, TopView, Form, Card, Divider, Input, PickerDate, Text, Row, DividerGroup, FormItem, FormSubmit, FormObject, FormArray, FormArrayAction } from '@/duxuiExample'

const ArrayItem = ({ value, index, values }) => {
  return <>
    <Card margin verticalPadding={false}>
      <FormItem field={index}>
        <FormObject>
          <DividerGroup>
            <FormItem label='项目' field='name'>
              <Row grow justify='end'>
                <FormArrayAction
                  action={list => {
                    list.splice(index, 1)
                    return list
                  }}
                >
                  <Text>删除</Text>
                </FormArrayAction>
              </Row>
            </FormItem>
            <FormItem label='名称' field='name'>
              <Input placeholder='名称' align='right' grow />
            </FormItem>
            <FormItem label='内容' field='tel'>
              <Input placeholder='内容' align='right' grow />
            </FormItem>
            <FormItem label='生产日期' field='date'>
              <PickerDate placeholder='请选择日期' />
            </FormItem>
          </DividerGroup>
        </FormObject>
      </FormItem>
    </Card>
    {
      index === values?.length - 1 && <FormArrayAction action={list => [...list, {}]}>
        <Card margin>
          <Space row>
            <Text>添加</Text>
          </Space>
        </Card>
      </FormArrayAction>
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
          <DividerGroup>
            <FormItem label='标题' field='name'>
              <Input placeholder='标题' align='right' grow />
            </FormItem>
            <FormItem label='介绍' field='tel' desc='输入框介绍，这是输入框介绍'>
              <Input placeholder='介绍' />
            </FormItem>
          </DividerGroup>
        </Card>
        <FormItem field='array'>
          <FormArray renderItem={ArrayItem} />
        </FormItem>
        <FormSubmit className='m-3' type='primary' size='l'>提交</FormSubmit>
      </ScrollView>
    </Form>
  </TopView>
}
