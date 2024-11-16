import { Header, ScrollView, TopView, GroupList, DropDown, Button, toast, Text, Space } from '@/duxuiExample'

const menus1 = [
  { text: '菜单1' },
  { text: '菜单2' },
  { text: '菜单3' },
  { text: '菜单4' }
]

const menus2 = [
  { text: '菜单1' },
  { type: 'line' },
  { text: '菜单2' },
  { text: '菜单3' },
  { type: 'line' },
  { text: '菜单4' }
]

export default function DropDownExample() {

  return <TopView>
    <Header title='DropDown' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='下拉菜单' desc=''>
          <DropDown
            menuList={menus1}
            onSelect={({ item }) => toast(item.text)}
          >
            <Button type='primary'>点击弹出</Button>
          </DropDown>
        </GroupList.Item>
        <GroupList.Item title='分割线' desc=''>
          <DropDown
            menuList={menus2}
            onSelect={({ item }) => toast(item.text)}
          >
            <Button type='primary'>点击弹出</Button>
          </DropDown>
        </GroupList.Item>
        <GroupList.Item title='弹出自定义内容' desc=''>
          <DropDown
            renderContent={<Space className='p-3 bg-white' items='center'>
              <Text>菜单1</Text>
              <Text>菜单2</Text>
              <Text>菜单3</Text>
              <Text>自定义内容</Text>
            </Space>}
          >
            <Button type='primary'>点击弹出</Button>
          </DropDown>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
