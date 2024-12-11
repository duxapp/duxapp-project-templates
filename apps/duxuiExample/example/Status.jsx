import { Status, Header, ScrollView, TopView, GroupList, px } from '@/duxuiExample'
import { Text, View } from '@tarojs/components'

export default function StatusExample() {
  return <TopView>
    <Header title='Status' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法' desc='外层元素需要有 overflow-hidden 将内容进行裁剪'>
          <View className='bg-white items-center justify-center overflow-hidden' style={{ height: px(300) }}>
            <Text>这是内容</Text>
            <Status status={<Status.Incline>状态1</Status.Incline>} />
            <Status horizontal='right' status={<Status.Incline>状态2</Status.Incline>} />
            <Status horizontal='right' vertical='bottom' status={<Status.Incline>状态3</Status.Incline>} />
            <Status vertical='bottom' status={<Status.Incline>状态4</Status.Incline>} />
          </View>
        </GroupList.Item>
        <GroupList.Item title='类型'>
          <View className='bg-white items-center justify-center overflow-hidden' style={{ height: px(150) }}>
            <Text>default</Text>
            <Status status={<Status.Incline type='default'>状态</Status.Incline>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden' style={{ height: px(150) }}>
            <Text>primary</Text>
            <Status status={<Status.Incline type='primary'>状态</Status.Incline>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden' style={{ height: px(150) }}>
            <Text>secondary</Text>
            <Status status={<Status.Incline type='secondary'>状态</Status.Incline>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden' style={{ height: px(150) }}>
            <Text>success</Text>
            <Status status={<Status.Incline type='success'>状态</Status.Incline>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden' style={{ height: px(150) }}>
            <Text>danger</Text>
            <Status status={<Status.Incline type='danger'>状态</Status.Incline>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden' style={{ height: px(150) }}>
            <Text>warning</Text>
            <Status status={<Status.Incline type='warning'>状态</Status.Incline>} />
          </View>
        </GroupList.Item>
        <GroupList.Item title='作为父元素容器并组合使用'>
          <Status status={<Status.Incline>状态2</Status.Incline>}>
            <View className='bg-white items-center justify-center' style={{ height: px(150) }}>
              <Text>这是内容</Text>
              <Status horizontal='right' status={<Status.Incline>状态2</Status.Incline>} />
            </View>
          </Status>
        </GroupList.Item>
        <GroupList.Item title='Common组件'>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>default</Text>
            <Status status={<Status.Common type='default'>状态</Status.Common>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>primary</Text>
            <Status status={<Status.Common type='primary'>状态</Status.Common>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>secondary</Text>
            <Status status={<Status.Common type='secondary'>状态</Status.Common>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>success</Text>
            <Status status={<Status.Common type='success'>状态</Status.Common>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>danger</Text>
            <Status status={<Status.Common type='danger'>状态</Status.Common>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>warning</Text>
            <Status status={<Status.Common type='warning'>状态</Status.Common>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>内测圆角</Text>
            <Status status={<Status.Common type='primary' radius>状态</Status.Common>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>尺寸s</Text>
            <Status status={<Status.Common size='s'>状态</Status.Common>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>尺寸m</Text>
            <Status status={<Status.Common size='m'>状态</Status.Common>} />
          </View>
          <View className='bg-white items-center justify-center overflow-hidden r-2' style={{ height: px(150) }}>
            <Text>尺寸l</Text>
            <Status status={<Status.Common size='l'>状态</Status.Common>} />
          </View>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
