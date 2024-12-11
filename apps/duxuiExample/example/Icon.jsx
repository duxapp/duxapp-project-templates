import { TestIcon, Space, Header, ScrollView, TopView, GroupList } from '@/duxuiExample'

export default function IconExample() {
  return <TopView>
    <Header title='Icon' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <TestIcon name='tuangouyanquan' />
        </GroupList.Item>
        <GroupList.Item title='大小'>
          <TestIcon name='navigation_fill' size={72} />
        </GroupList.Item>
        <GroupList.Item title='颜色' desc=''>
          <Space row>
            <TestIcon name='publish_add_fill' color='red' className='text-s7' />
            <TestIcon name='icon_24_brush' color='blue' className='text-s7' />
            <TestIcon name='copy' color='green' className='text-s7' />
            <TestIcon name='shafa' className='text-primary text-s7' />
            <TestIcon name='calendar' color='orange' className='text-s7' />
          </Space>
        </GroupList.Item>
        <GroupList.Item title='说明' desc='Icon并不是一个具体的组件，而是通过 `yarn duxapp icon TestIcon duxuiExample css地址 1` 命令创建，创建后就是一个可以使用的Icon组件(这个命令是将 iconfont 上的图标库创建为组件)'>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
