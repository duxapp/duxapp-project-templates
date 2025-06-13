import { Header, ScrollView, TopView, GroupList, Text, Space, Layout } from '@/duxuiExample'
import { useState } from 'react'

export default function LayoutExample() {

  const [layout1, setLayout1] = useState({})

  return <TopView>
    <Header title='Layout' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='布局测量' desc='测量上面白色区域的位置信息 测量结果将永远是异步的，当你需要用测量结果来布局时，先考虑用css去实现，css无法实现的再使用测量'>
          <Layout onLayout={setLayout1}>
            <Space className='bg-white p-2'>
              <Text>width: {layout1.width}</Text>
              <Text>height: {layout1.height}</Text>
              <Text>left: {layout1.left}</Text>
              <Text>top: {layout1.top}</Text>
            </Space>
          </Layout>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
