import { Loading, Header, ScrollView, TopView, GroupList } from '@/duxuiExample'
import { View } from '@tarojs/components'

export default function LoadingExample() {
  return <TopView>
    <Header title='Loading' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <Loading />
        </GroupList.Item>
        <GroupList.Item title='尺寸'>
          <Loading size={72} />
        </GroupList.Item>
        <GroupList.Item title='白色模式'>
          <View style={{ padding: 12, backgroundColor: '#333'}}>
            <Loading color='blank' />
          </View>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
