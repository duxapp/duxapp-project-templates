import { GroupList } from '@/duxuiExample'
import { CardSelect, Grid, Header, ScrollView, TopView, Form, Text, CardSelectGroup, FormItem } from '@/duxui'

const list = [
  { value: 1, title: '标题1', desc: '简介1' },
  { value: 2, title: '标题2', desc: '简介2' },
  { value: 3, title: '禁用', desc: '简介3', disabled: true },
  { value: 4, title: '只禁用选择', desc: '简介4', disabledCheck: true },
  { value: 5, title: '颜色', desc: '简介5', color: '#54BD72' },
  { value: 6, title: '标颜色题6', desc: '简介6', color: '#FFC331' },
  { value: 7, title: '边框', desc: '简介7', border: true },
  { value: 8, title: '镂空', desc: '简介7', plain: true }
]

export default function CardSelectExample() {
  return <TopView>
    <Header title='CardSelect' />
    <ScrollView>
      <Form>
        <GroupList>
          <GroupList.Item title='基础用法'>
            <FormItem field='field1'>
              <CardSelectGroup>
                <Grid center={false} gap={24} column={3}>
                  {
                    list.map(({ title, desc, ...props }) => {
                      return <CardSelect key={props.value} {...props}>
                        <Text>{title}</Text>
                        <Text>{desc}</Text>
                      </CardSelect>
                    })
                  }
                </Grid>
              </CardSelectGroup>
            </FormItem>
          </GroupList.Item>
          <GroupList.Item title='圆角'>
            <FormItem field='field2'>
              <CardSelectGroup>
                <Grid center={false} gap={24} column={3}>
                  {
                    list.slice(0, 3).map(({ title, desc, value }, index) => {

                      return <CardSelect key={value} value={value} radiusType={['square', 'round-min', 'round'][index]}>
                        <Text>{title}</Text>
                        <Text>{desc}</Text>
                      </CardSelect>
                    })
                  }
                </Grid>
              </CardSelectGroup>
            </FormItem>
          </GroupList.Item>
          <GroupList.Item title='多选'>
            <FormItem field='field3'>
              <CardSelectGroup checkbox>
                <Grid center={false} gap={24} column={3}>
                  {
                    list.slice(0, 3).map(({ title, desc, value }) => {

                      return <CardSelect key={value} value={value}>
                        <Text>{title}</Text>
                        <Text>{desc}</Text>
                      </CardSelect>
                    })
                  }
                </Grid>
              </CardSelectGroup>
            </FormItem>
          </GroupList.Item>
          <GroupList.Item title='定制选中的样式'>
            <FormItem field='field4'>
              <CardSelectGroup checkedProps={{ plain: true, border: true, color: '#3162C9' }}>
                <Grid center={false} gap={24} column={3}>
                  {
                    list.slice(0, 3).map(({ title, desc, value }) => {
                      return <CardSelect key={value} value={value} color='#373D52'>
                        <Text>{title}</Text>
                        <Text>{desc}</Text>
                      </CardSelect>
                    })
                  }
                </Grid>
              </CardSelectGroup>
            </FormItem>
          </GroupList.Item>
          <GroupList.Item title='定制样式'>
            <FormItem field='field5'>
              <CardSelectGroup checkedProps={{ plain: true, border: true, color: '#3162C9' }}>
                <Grid center={false} gap={24} column={3}>
                  {
                    list.slice(0, 3).map(({ title, desc, value }) => {
                      return <CardSelect key={value} value={value} color='#373D52' border>
                        <Text>{title}</Text>
                        <Text>{desc}</Text>
                      </CardSelect>
                    })
                  }
                </Grid>
              </CardSelectGroup>
            </FormItem>
          </GroupList.Item>
        </GroupList>
      </Form>
    </ScrollView>
  </TopView>
}
