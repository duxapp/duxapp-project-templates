import { Header, ScrollView, TopView, GroupList, Column } from '@/duxuiExample'
import { Sign } from '@/duxui'

export default function SignStepExample() {
  return <TopView>
    <Header title='Sign' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='签名' desc='签名组件需要放在一个具有高度和宽度的容器中才能正常展示'>
          <Column style={{ height: 600, backgroundColor: '#fff' }}>
            <Sign />
          </Column>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
