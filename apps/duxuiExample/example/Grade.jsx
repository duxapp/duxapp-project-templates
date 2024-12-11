import { Header, ScrollView, TopView, Form, Card, Divider, Grade } from '@/duxuiExample'

export default function GradeExample() {
  return <TopView>
    <Header title='Grade' />
    <Form onSubmit={console.log}
      defaultValues={{
        grade1: 3,
        grade2: 3,
        grade3: 3,
        grade4: 3,
        grade5: 3
      }}
    >
      <ScrollView>
        <Card margin verticalPadding={false} className='self-stretch'>
          <Divider.Group>
            <Form.Item label='评分' field='grade1' >
              <Grade />
            </Form.Item>
            <Form.Item label='类型 secondary' field='grade2' >
              <Grade type='secondary' />
            </Form.Item>
            <Form.Item label='类型 success' field='grade3' >
              <Grade type='success' />
            </Form.Item>
            <Form.Item label='尺寸 s' field='grade4' >
              <Grade size='s' />
            </Form.Item>
            <Form.Item label='尺寸 l' field='grade5' >
              <Grade size='l' />
            </Form.Item>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
