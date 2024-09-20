import { Header, ScrollView, TopView, Form, Card, Divider, Checkbox, Button } from '@/duxuiExample'

const UserButton = ({
  label,
  checked,
  onCheck
}) => {
  return <Button onClick={onCheck} type='primary' plain={!checked}>{label}</Button>
}

export default function CheckboxExample() {
  return <TopView>
    <Header title='Checkbox' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <Divider.Group>
            <Form.Item label='多选' field='radio1'>
              <Checkbox.Group>
                <Checkbox label='选项1' value={1} />
                <Checkbox label='选项2' value={2} />
                <Checkbox label='选项3' value={3} />
                <Checkbox label='选项4' value={4} />
              </Checkbox.Group>
            </Form.Item>
            <Form.Item label='竖向排列' field='radio2'>
              <Checkbox.Group direction='vertical'>
                <Checkbox label='选项1' value={1} />
                <Checkbox label='选项2' value={2} />
                <Checkbox label='选项3' value={3} />
                <Checkbox label='选项4' value={4} />
              </Checkbox.Group>
            </Form.Item>
            <Form.Item label='自定义样式' field='radio3'>
              <Checkbox.Group>
                <Checkbox label='选项1' value={1} >{UserButton}</Checkbox>
                <Checkbox label='选项2' value={2} >{UserButton}</Checkbox>
                <Checkbox label='选项3' value={3} >{UserButton}</Checkbox>
                <Checkbox label='选项4' value={4} >{UserButton}</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
