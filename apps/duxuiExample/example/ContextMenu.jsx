import { Header, ScrollView, TopView, GroupList, showContextMenu, toast } from '@/duxuiExample'
import { View } from '@tarojs/components'

export default TopView.page(function ContextMenuExample() {
  return <>
    <Header title='ContextMenu' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法' desc='点击任意位置弹出菜单'>
          <View className='w-full square bg-white'
            onClick={async e => {
              const touch = e.changedTouches?.[0] || e
              const item = await showContextMenu({
                x: touch.pageX,
                y: touch.pageY,
                list: ['复制', '粘贴', '删除']
              })
              toast(`选择了：${item.item}`)
            }}
          >
          </View>
        </GroupList.Item>
        <GroupList.Item title='长按' desc='长按任意位置弹出菜单'>
          <View className='w-full square bg-white'
            onLongPress={async e => {
              const touch = e.changedTouches?.[0] || e
              const item = await showContextMenu({
                x: touch.pageX,
                y: touch.pageY,
                list: ['复制', '粘贴', '删除']
              })
              toast(`选择了：${item.item}`)
            }}
          >
          </View>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </>
})
