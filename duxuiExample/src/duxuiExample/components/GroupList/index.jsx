import { View } from '@tarojs/components'
import { Space } from '@/duxui'
import './index.scss'

const GroupListItem = ({
  title,
  desc,
  children
}) => {
  return <>
    <View className='GroupList__title'>{title}</View>
    {children}
    <View className='GroupList__desc'>{desc}</View>
  </>
}

export const GroupList = ({
  children
}) => {
  return <Space className='GroupList'>
    {children}
  </Space>
}

GroupList.Item = GroupListItem
