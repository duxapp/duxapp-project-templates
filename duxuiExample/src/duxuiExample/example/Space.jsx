import { Space, Header, ScrollView, TopView, GroupList } from '@/duxuiExample'
import { View, Text } from '@tarojs/components'
import './Space.scss'

export default function SpaceExample() {
  return <TopView>
    <Header title='Space' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <Space>
            <View className='speac-item'>内容1</View>
            <View className='speac-item'>内容2</View>
            <View className='speac-item'>内容3</View>
          </Space>
        </GroupList.Item>
        <GroupList.Item title='横向'>
          <Space row>
            <Text className='speac-item'>1</Text>
            <Text className='speac-item'>2</Text>
            <Text className='speac-item'>3</Text>
            <Text className='speac-item'>4</Text>
          </Space>
        </GroupList.Item>
        <GroupList.Item title='尺寸'>
          <Space size={64}>
            <View className='speac-item'>内容1</View>
            <View className='speac-item'>内容2</View>
            <View className='speac-item'>内容3</View>
          </Space>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
