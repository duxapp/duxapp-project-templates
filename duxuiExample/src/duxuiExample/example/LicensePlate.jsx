import { Header, ScrollView, TopView, Form, LicensePlate, GroupList } from '@/duxuiExample'

export default function LicensePlateExample() {
  return <TopView>
    <Header title='LicensePlate' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <GroupList>
          <GroupList.Item title='基础用法'>
            <LicensePlate length={7} onChange={console.log} />
          </GroupList.Item>
        </GroupList>
      </ScrollView>
    </Form>
  </TopView>
}
