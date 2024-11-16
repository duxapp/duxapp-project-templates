import { Avatar, TestIcon, Header, ScrollView, TopView, GroupList, Space } from '@/duxuiExample'

export default function AvatarExample() {
  return <TopView>
    <Header title='Avatar' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='尺寸'>
          <Space row items='center'>
            <Avatar size='s' />
            <Avatar size='m' />
            <Avatar size='l' />
          </Space>
        </GroupList.Item>
        <GroupList.Item title='圆角类型'>
          <Space row>
            <Avatar size='m' radiusType='square' />
            <Avatar size='m' radiusType='round-min' />
            <Avatar size='m' radiusType='round' />
          </Space>
        </GroupList.Item>
        <GroupList.Item title='图标和图片'>
          <Space row>
            <Avatar size='m' icon={<TestIcon name='nav-mine-fill' />} />
            <Avatar size='m' url='https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png' />
          </Space>
        </GroupList.Item>
        <GroupList.Item title='头像组'>
          <Avatar.Group max={5} maxProps={{ color: '#666' }}>
            <Avatar>头像1</Avatar>
            <Avatar>头像2</Avatar>
            <Avatar>头像3</Avatar>
            <Avatar>头像4</Avatar>
            <Avatar>头像5</Avatar>
            <Avatar>头像6</Avatar>
            <Avatar>头像7</Avatar>
          </Avatar.Group>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
