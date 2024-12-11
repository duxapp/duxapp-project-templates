import {
  Header, ScrollView, TopView, Form, Card, Divider,
  Cascade, ModalForm, ModalForms, DatePicker, Input, Text, CardSelect, duxappTheme, Space, Row, Column,
  px
} from '@/duxuiExample'
import { getSystemInfoSync } from '@tarojs/taro'

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
  cascade2: [22, 23],
  dateshow: '2011-03-30',
  pull1: '这是默认值'
}

const PullForm = () => <Card shadow={false}>
  <Column style={{ height: getSystemInfoSync().statusBarHeight + (process.env.TARO_ENV === 'weapp' ? 22 : 0) }} />
  <Form.Item label='输入框' field='pull1' direction='vertical'>
    <Input placeholder='请输入' />
  </Form.Item>
  <Form.Item label='cardSelect' field='pull2' direction='vertical'>
    <CardSelect.Group checkedProps={{ color: duxappTheme.primaryColor, border: true }}>
      <Space row wrap>
        <CardSelect color={duxappTheme.textColor1} value={1} plain border={false} radiusType='round'>
          <Text size={3}>选项1</Text>
        </CardSelect>
        <CardSelect color={duxappTheme.textColor1} value={2} plain border={false} radiusType='round'>
          <Text size={3}>选项2</Text>
        </CardSelect>
        <CardSelect color={duxappTheme.textColor1} value={3} plain border={false} radiusType='round'>
          <Text size={3}>选项3</Text>
        </CardSelect>
      </Space>
    </CardSelect.Group>
  </Form.Item>
</Card>

export default function ModalFormExample() {
  return <TopView>
    <Header title='ModalForm' />
    <Form onSubmit={console.log} defaultValues={defaultValues}>
      <ScrollView>
        <Card margin verticalPadding={false} className='self-stretch'>
          <Divider.Group>
            <Form.Item label='日期' field='date'>
              <ModalForm
                renderForm={<DatePicker />}
                placeholder='请选择日期'
                grow
                title='请选择日期'
              />
            </Form.Item>
            <Form.Item label='日期时间' field='datetime'>
              <ModalForm
                renderForm={<DatePicker mode='datetime' />}
                placeholder='请选择日期时间'
                grow
                title='请选择日期时间'
              />
            </Form.Item>
            <Form.Item label='弹出级联选择' field='cascade3'>
              <ModalForm
                renderForm={<Cascade data={cascadeData} level={2} mode='checkbox' theme='fill' anyLevel style={{ height: px(800) }} />}
                placeholder='请选择等级'
                grow
                title='级联选择'
              >

              </ModalForm>
            </Form.Item>
            <Form.Item label='非受控模式'>
              <ModalForm
                renderForm={<Cascade data={cascadeData} level={2} mode='checkbox' theme='fill' anyLevel style={{ height: px(800) }} />}
                placeholder='请选择等级'
                grow
                title='级联选择'
              >
              </ModalForm>
            </Form.Item>
            <ModalForms
              side='right'
              renderForm={<ScrollView>
                <PullForm />
              </ScrollView>}
            >
              <Text style={{ padding: 20 }}>弹出多个表单</Text>
            </ModalForms>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
