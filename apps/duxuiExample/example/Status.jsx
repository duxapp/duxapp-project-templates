import { Status, Header, ScrollView, TopView, GroupList, px, StatusCommon, StatusIncline } from '@/duxuiExample'
import { Text, View } from '@tarojs/components'

export default function StatusExample() {
  return <TopView>
    <Header title='Status' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法' desc='外层元素需要有 overflow-hidden 将内容进行裁剪'>
          <View className='bg-white items-center justify-center overflow-hidden' style={{ height: px(300) }}>
            <Text>这是内容</Text>
            <Status status={<StatusIncline>状态1</StatusIncline>} />
            <Status horizontal='right' status={<StatusIncline>状态2</StatusIncline>} />
            <Status horizontal='right' vertical='bottom' status={<StatusIncline>状态3</StatusIncline>} />
            <Status vertical='bottom' status={<StatusIncline>状态4</StatusIncline>} />
          </View>
        </GroupList.Item>
        <GroupList.Item title='类型'>
          <View className='bg-white items-center justify-center overflow-hidden' style={{ height: px(150) }}>
            <Text>default</Text>
            <Status status={<StatusIncline type='default'>状态</StatusIncline>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden' style={{ height: px(150) }}>
            <Text>primary</Text>
            <Status status={<StatusIncline type='primary'>状态</StatusIncline>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden' style={{ height: px(150) }}>
            <Text>secondary</Text>
            <Status status={<StatusIncline type='secondary'>状态</StatusIncline>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden' style={{ height: px(150) }}>
            <Text>success</Text>
            <Status status={<StatusIncline type='success'>状态</StatusIncline>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden' style={{ height: px(150) }}>
            <Text>danger</Text>
            <Status status={<StatusIncline type='danger'>状态</StatusIncline>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden' style={{ height: px(150) }}>
            <Text>warning</Text>
            <Status status={<StatusIncline type='warning'>状态</StatusIncline>} />
          </View>
        </GroupList.Item>
        <GroupList.Item title='作为父元素容器并组合使用'>
          <Status status={<StatusIncline>状态2</StatusIncline>}>
            <View className='bg-white items-center justify-center' style={{ height: px(150) }}>
              <Text>这是内容</Text>
              <Status horizontal='right' status={<StatusIncline>状态2</StatusIncline>} />
            </View>
          </Status>
        </GroupList.Item>
        <GroupList.Item title='Common组件'>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>default</Text>
            <Status status={<StatusCommon type='default'>状态</StatusCommon>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>primary</Text>
            <Status status={<StatusCommon type='primary'>状态</StatusCommon>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>secondary</Text>
            <Status status={<StatusCommon type='secondary'>状态</StatusCommon>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>success</Text>
            <Status status={<StatusCommon type='success'>状态</StatusCommon>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>danger</Text>
            <Status status={<StatusCommon type='danger'>状态</StatusCommon>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>warning</Text>
            <Status status={<StatusCommon type='warning'>状态</StatusCommon>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>内测圆角</Text>
            <Status status={<StatusCommon type='primary' radius>状态</StatusCommon>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>尺寸s</Text>
            <Status status={<StatusCommon size='s'>状态</StatusCommon>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>尺寸m</Text>
            <Status status={<StatusCommon size='m'>状态</StatusCommon>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>尺寸l</Text>
            <Status status={<StatusCommon size='l'>状态</StatusCommon>} />
          </View>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
