import { Header, ScrollView, TopView, Form, Card, Divider, Recorder, Button, Text, Column } from '@/duxuiExample'

export default function RecorderExample() {
  return <TopView>
    <Header title='Radio' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <Divider.Group>
            <Form.Item label='录音' field='recorder1' vertical desc='单个录音类型为字符串'>
              <Recorder />
            </Form.Item>
            <Form.Item label='多个录音' field='recorder2' vertical desc='多个录音类型为数组'>
              <Recorder max={9} />
            </Form.Item>
            <Column className='gap-2 pv-3'>
              <Button size='l' type='primary'
                onClick={async () => {
                  const res = await Recorder.start()
                  console.log('本地录音结果', res)
                }}
              >弹出录音</Button>
              <Text size={1} color={2}>直接通过静态方法调用录音接口，并返回录音结果</Text>
            </Column>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
