import { Button, Header, ScrollView, TopView, GroupList, Space, duxappTheme } from '@/duxuiExample'


export default function ButtonExample() {

  return <TopView>
    <Header title='Button' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础按钮'>
          <Button type='primary'>按钮</Button>
        </GroupList.Item>
        <GroupList.Item title='镂空按钮'>
          <Button plain type='primary'>按钮</Button>
        </GroupList.Item>
        <GroupList.Item title='使用渐变'>
          <Space>
            <Button color={[duxappTheme.primaryColor, duxappTheme.secondaryColor]}>默认从左到右</Button>
            <Button color={[duxappTheme.primaryColor, duxappTheme.secondaryColor]} colorAngle={180}>指定角度从上到下</Button>
          </Space>
        </GroupList.Item>
        <GroupList.Item title='圆角类型'>
          <Space row>
            <Button type='primary' radiusType='round'>按钮</Button>
            <Button type='primary' radiusType='round-min'>按钮</Button>
            <Button type='primary' radiusType='square'>按钮</Button>
          </Space>
        </GroupList.Item>
        <GroupList.Item title='颜色'>
          <Space>
            <Button>默认</Button>
            <Button type='primary'>主色</Button>
            <Button type='secondary'>辅色</Button>
            <Button type='success'>成功</Button>
            <Button type='warning'>警告</Button>
            <Button type='danger'>失败</Button>
          </Space>
        </GroupList.Item>
        <GroupList.Item title='禁用'>
          <Button type='primary' disabled >按钮</Button>
        </GroupList.Item>
        <GroupList.Item title='加载中'>
          <Button type='primary' loading>按钮</Button>
        </GroupList.Item>
        <GroupList.Item title='按钮尺寸'>
          <Space>
            <Button type='primary' size='s'>按钮 s</Button>
            <Button type='primary' size='m'>按钮 m</Button>
            <Button type='primary' size='l'>按钮 l</Button>
          </Space>
        </GroupList.Item>
      </GroupList>

    </ScrollView>
  </TopView>
}
