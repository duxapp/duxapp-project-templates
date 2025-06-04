import {
  Header,
  ScrollView,
  TopView,
  Form,
  Card,
  Divider,
  Checkbox,
  Button,
  DividerGroup,
  CheckboxGroup,
  FormItem
} from '@/duxuiExample'

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
          <DividerGroup>
            <FormItem label='多选' field='checkbox1'>
              <CheckboxGroup>
                <Checkbox label='选项1' value={1} />
                <Checkbox label='选项2' value={2} />
                <Checkbox label='选项3' value={3} />
                <Checkbox label='选项4' value={4} />
              </CheckboxGroup>
            </FormItem>
            <FormItem label='竖向排列' field='checkbox2'>
              <CheckboxGroup direction='vertical'>
                <Checkbox label='选项1' value={1} />
                <Checkbox label='选项2' value={2} />
                <Checkbox label='选项3' value={3} />
                <Checkbox label='选项4' value={4} />
              </CheckboxGroup>
            </FormItem>
            <FormItem label='自定义样式' field='checkbox3'>
              <CheckboxGroup>
                <Checkbox label='选项1' value={1} >{UserButton}</Checkbox>
                <Checkbox label='选项2' value={2} >{UserButton}</Checkbox>
                <Checkbox label='选项3' value={3} >{UserButton}</Checkbox>
                <Checkbox label='选项4' value={4} >{UserButton}</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label='自定义控制' field='checkbox4'>
              <Checkbox label='选中' checked />
              <Checkbox label='部分选中' half />
              <Checkbox label='未选中' />
            </FormItem>
          </DividerGroup>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
