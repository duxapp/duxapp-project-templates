import { Header, ScrollView, TopView, GroupList } from '@/duxuiExample'
import { duxappTheme, px, Sign } from '@/duxui'

export default function SignExample() {
  return <TopView>
    <Header title='Sign' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='签名' desc='需要设置高度'>
          <Sign style={{ height: px(1200) }} color={duxappTheme.primaryColor} className='bg-white' />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
