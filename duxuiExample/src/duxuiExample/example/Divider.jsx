import { Divider, Header, ScrollView, TopView, GroupList } from '@/duxuiExample'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './Divider.scss'

export default function DividerExample() {
  return <TopView>
    <Header title='Divider' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <View className='divider-item'>
            <Divider />
          </View>
        </GroupList.Item>
        <GroupList.Item title='竖向'>
          <View className='divider-item' style={{ height: Taro.pxTransform(200), flexDirection: 'row' }}>
            <Divider vertical />
          </View>
        </GroupList.Item>
        <GroupList.Item title='类型'>
          <View className='divider-item gap-3'>
            <Divider type='solid' size={10} />
            <Divider type='dashed' size={10} />
            <Divider type='dotted' size={10} />
          </View>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
