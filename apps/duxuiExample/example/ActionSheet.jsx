import { Header, ScrollView, TopView, GroupList, ActionSheet, Button, confirm } from '@/duxuiExample'

export default function ActionSheetExample() {

  return <TopView>
    <Header title='Absolute' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <Button
            onClick={async () => {
              const res = await ActionSheet.show({
                title: '请选择',
                list: ['选项1', '选项2', '选项3']
              })
              confirm({
                title: `index:${res.index} ${res.item}`
              })
            }}
          >弹出菜单</Button>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
