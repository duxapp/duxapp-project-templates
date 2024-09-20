import { Badge, Card, Avatar, Header, ScrollView, TopView, GroupList, Space } from '@/duxuiExample'

export default function BadgeExample() {
  return <TopView>
    <Header title='Badge' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <Card>
            <Space row>
              <Badge count={5}>
                <Avatar radiusType='round-min'>头像</Avatar>
              </Badge>
              <Badge count={100}>
                <Avatar radiusType='round-min'>头像</Avatar>
              </Badge>
              <Badge count={20} color='blue'>
                <Avatar radiusType='round-min'>头像</Avatar>
              </Badge>
              <Badge color='orange' text='自定义'>
                <Avatar radiusType='round-min'>头像</Avatar>
              </Badge>
            </Space>
          </Card>
        </GroupList.Item>
        <GroupList.Item title='最大数量10'>
          <Card>
            <Space row>
              <Badge count={15} maxCount={10}>
                <Avatar radiusType='round-min'>头像</Avatar>
              </Badge>
              <Badge count={9} maxCount={10}>
                <Avatar radiusType='round-min'>头像</Avatar>
              </Badge>
              <Badge count={10} maxCount={10} color='blue'>
                <Avatar radiusType='round-min'>头像</Avatar>
              </Badge>
            </Space>
          </Card>
        </GroupList.Item>
        <GroupList.Item title='点状'>
          <Card>
            <Space row>
              <Badge dot>
                <Avatar radiusType='round-min'>头像</Avatar>
              </Badge>
              <Badge dot color='#666'>
                <Avatar radiusType='round-min'>头像</Avatar>
              </Badge>
              <Badge dot color='blue'>
                <Avatar radiusType='round-min'>头像</Avatar>
              </Badge>
            </Space>
          </Card>
        </GroupList.Item>
        <GroupList.Item title='单独使用红点'>
          <Card>
            <Space row>
              <Badge count={20} />
              <Badge count={20} color='#666' />
              <Badge count={20} color='blue' />
              <Badge count={20} color='green' />
              <Badge count={20} text='自定义' color='orange' />
            </Space>
          </Card>
        </GroupList.Item>
        <GroupList.Item title='单独使用点状'>
          <Card>
            <Space row>
              <Badge dot />
              <Badge dot color='#666' />
              <Badge dot color='blue' />
              <Badge dot color='green' />
              <Badge dot color='orange' />
            </Space>
          </Card>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
