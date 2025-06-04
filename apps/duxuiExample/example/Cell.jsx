import { Cell, Header, ScrollView, TopView, GroupList, CellGroup } from '@/duxuiExample'

export default function CellExample() {
  return <TopView>
    <Header title='Cell' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <Cell title='菜单' />
        </GroupList.Item>
        <GroupList.Item title='右侧简介'>
          <Cell title='菜单' desc='简介' />
        </GroupList.Item>
        <GroupList.Item title='副标题'>
          <Cell title='菜单' subTitle='这是副标题' desc='简介' />
        </GroupList.Item>
        <GroupList.Item title='组'>
          <CellGroup>
            <Cell title='菜单1' />
            <Cell title='菜单2' />
            <Cell title='菜单3' />
            <Cell title='菜单4' />
          </CellGroup>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
