import { Header, ScrollView, TopView, Form, Card, Divider, Radio, Button, DividerGroup, FormItem, RadioGroup } from '@/duxuiExample'

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
        <Card margin verticalPadding={false}>
          <DividerGroup>
            <FormItem label='单选' field='radio1'>
              <RadioGroup>
                <Radio label='选项1' value={1} />
                <Radio label='选项2' value={2} />
                <Radio label='选项3' value={3} />
                <Radio label='选项4' value={4} />
              </RadioGroup>
            </FormItem>
            <FormItem label='竖向排列' field='radio2'>
              <RadioGroup vertical>
                <Radio label='选项1' value={1} />
                <Radio label='选项2' value={2} />
                <Radio label='选项3' value={3} />
                <Radio label='选项4' value={4} />
              </RadioGroup>
            </FormItem>
            <FormItem label='自定义样式' field='radio3'>
              <RadioGroup>
                <Radio label='选项1' value={1} >{UserButton}</Radio>
                <Radio label='选项2' value={2} >{UserButton}</Radio>
                <Radio label='选项3' value={3} >{UserButton}</Radio>
                <Radio label='选项4' value={4} >{UserButton}</Radio>
              </RadioGroup>
            </FormItem>
          </DividerGroup>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
