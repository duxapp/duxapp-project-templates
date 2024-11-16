import { Header, ScrollView, TopView, GroupList } from '@/duxuiExample'
import { px, Sign } from '@/duxui'

export default function SignStepExample() {
  return <TopView>
    <Header title='Sign' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='签名' desc='需要设置高度'>
          <Sign style={{ height: px(1200) }} className='bg-white' />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
