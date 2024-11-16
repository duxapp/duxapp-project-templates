import { Header, ScrollView, TopView, Form, Card, Divider, Radio, Button } from '@/duxuiExample'

const UserButton = ({
  label,
  checked,
  onCheck
}) => {
  return <Button onClick={onCheck} type='primary' plain={!checked}>{label}</Button>
}

export default function RadioExample() {
  return <TopView>
    <Header title='Radio' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false} className='self-stretch'>
          <Divider.Group>
            <Form.Item label='单选' field='radio1'>
              <Radio.Group>
                <Radio label='选项1' value={1} />
                <Radio label='选项2' value={2} />
                <Radio label='选项3' value={3} />
                <Radio label='选项4' value={4} />
              </Radio.Group>
            </Form.Item>
            {/* <Form.Item label='竖向排列' field='radio2'>
              <Radio.Group direction='vertical'>
                <Radio label='选项1' value={1} />
                <Radio label='选项2' value={2} />
                <Radio label='选项3' value={3} />
                <Radio label='选项4' value={4} />
              </Radio.Group>
            </Form.Item>
            <Form.Item label='自定义样式' field='radio3'>
              <Radio.Group>
                <Radio label='选项1' value={1} >{UserButton}</Radio>
                <Radio label='选项2' value={2} >{UserButton}</Radio>
                <Radio label='选项3' value={3} >{UserButton}</Radio>
                <Radio label='选项4' value={4} >{UserButton}</Radio>
              </Radio.Group>
            </Form.Item> */}
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
