import { Header, ScrollView, TopView, GroupList } from '@/duxuiExample'
import { Sign } from '@/duxui'

export default function SignStepExample() {
  return <TopView>
    <Header title='Sign' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='签名' desc='需要设置高度'>
          <Sign style={{ height: 600, backgroundColor: '#fff' }} />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
