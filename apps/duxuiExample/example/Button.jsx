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
        <GroupList.Item title='柔和填充（soft）'>
          <Space row>
            <Button soft type='primary'>主色 soft</Button>
            <Button soft type='success'>成功 soft</Button>
            <Button soft type='warning'>警告 soft</Button>
          </Space>
        </GroupList.Item>
        <GroupList.Item title='柔和填充 + 自定义颜色'>
          <Space row>
            <Button soft color='#e91e63'>粉色 soft</Button>
            <Button soft color='#333'>深灰 soft</Button>
          </Space>
        </GroupList.Item>
        <GroupList.Item title='soft 与 plain 对比'>
          <Space row>
            <Button plain type='primary'>plain</Button>
            <Button soft type='primary'>soft</Button>
          </Space>
        </GroupList.Item>
        <GroupList.Item title='soft + plain 同时生效'>
          <Space row>
            <Button soft plain type='primary'>主色 soft+plain</Button>
            <Button soft plain color='#e91e63'>自定义色 soft+plain</Button>
          </Space>
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
