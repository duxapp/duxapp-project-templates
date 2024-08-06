import { Header, ScrollView, TopView, Form, Card, Divider, Grade } from '@/duxuiExample'

export default function GradeExample() {
  return <TopView>
    <Header title='Grade' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <Divider.Group>
            <Form.Item label='评分' field='grade' >
              <Grade />
            </Form.Item>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
