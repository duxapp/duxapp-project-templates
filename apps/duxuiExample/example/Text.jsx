import { Card, TestIcon, Text, Header, ScrollView, TopView, GroupList, Space } from '@/duxuiExample'

export default function TextExample() {
  return <TopView>
    <Header title='Text' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <Card>
            <Space>
              <Text type='primary'>primary</Text>
              <Text type='secondary'>secondary</Text>
              <Text type='success'>success</Text>
              <Text type='danger'>danger</Text>
              <Text type='warning'>warning</Text>
              <Text color={1}>color1</Text>
              <Text color={2}>color2</Text>
              <Text color={3}>color3</Text>
              <Text color={4} className='bg-primary'>color4</Text>
            </Space>
          </Card>
        </GroupList.Item>
        <GroupList.Item title='大小'>
          <Card>
            <Space>
              <Text size={1}>size1</Text>
              <Text size={2}>size2</Text>
              <Text size={3}>size3</Text>
              <Text size={4}>size4</Text>
              <Text size={5}>size5</Text>
              <Text size={6}>size6</Text>
              <Text size={7}>size7</Text>
            </Space>
          </Card>
        </GroupList.Item>
        <GroupList.Item title='样式'>
          <Card>
            <Space>
              <Text delete size={5}>删除线</Text>
              <Text underline size={5}>下划线</Text>
              <Text bold size={5}>加粗</Text>
            </Space>
          </Card>
        </GroupList.Item>
        <GroupList.Item title='省略'>
          <Card>
            <Space>
              <Text size={5} numberOfLines={1}>A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered to be a design activity</Text>
              <Text size={5} numberOfLines={2}>A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered to be a design activity</Text>
            </Space>
          </Card>
        </GroupList.Item>
        <GroupList.Item title='嵌套'>
          <Card>
            <Space>
              <Text delete size={5}>
                删除线
                <Text underline size={5}>下划线</Text>
                <Text color={3}>颜色1</Text>
                <Text type='primary'>颜色2</Text>
              </Text>
            </Space>
          </Card>
        </GroupList.Item>
        <GroupList.Item title='图标组合'>
          <Card>
            <Space>
              <Text size={5} onClick={e => console.log('文本点击')}>
                删除线
                <Text color={3}>颜色1</Text>
                <TestIcon name='weixinzhifu' />
                <Text type='primary'>颜色2<TestIcon name='buji' onClick={e => console.log('嵌套使用，里面的元素将失去点击事件')} /></Text>
              </Text>
            </Space>
          </Card>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
