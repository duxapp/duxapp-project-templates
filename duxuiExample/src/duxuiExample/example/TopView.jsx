import { Header, ScrollView, TopView, GroupList, Text, Button, Column, confirm, toast } from '@/duxuiExample'

export default function TopViewExample() {
  return <TopView>
    <Header title='TopView' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='顶层容器' desc='TopView组件需要放在每个页面的最外层，一些路由功能依赖于此组件，如果不放在页面上，某些路由功能会异常。PullView、Absolute、Modal等组件是使用此特性封装的'>
        </GroupList.Item>
        <GroupList.Item title='添加元素' desc='TopView提供了静态方法，可以将一下元素转发到TopView子下一级，利用此特性可以再元素内部做全局弹出之类的操作'>
          <Button type='primary'
            onClick={() => {
              const action = TopView.add(<Column>
                <Text type='success'>添加成功</Text>
                <Text>可以利用元素检查器，看看此元素的实际渲染位置</Text>
                <Button onClick={() => action.remove()} type='danger'>移除此元素</Button>
              </Column>)
            }}
          >点击在顶层弹出元素</Button>
        </GroupList.Item>
        <GroupList.Item title='添加浮层' desc='TopView增加绝对定位，使元素浮动'>
          <Button type='primary'
            onClick={() => {
              const action = TopView.add(<Column className='absolute inset-0' items='center' justify='center' style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <Column style={{ padding: 12, backgroundColor: '#fff' }}>
                  <Text type='success'>添加成功</Text>
                  <Text>可以利用元素检查器，看看此元素的实际渲染位置</Text>
                  <Button onClick={() => action.remove()} type='danger'>移除此元素</Button>
                </Column>
              </Column>)
            }}
          >点击在顶层弹出元素</Button>
        </GroupList.Item>
        <GroupList.Item title='添加浮层' desc='TopView.add方法可以在任意的地方使用，不局限于组件内，利用此特性，可以封装一些带界面的函数供调用'>
          <Button type='primary'
            onClick={async () => {
              const status = await confirm({
                content: 'confirm函数是一个用TopView.add方法封装的确认框'
              })
              toast(status ? '点击了确认' : '点击了取消')
            }}
          >点击测试</Button>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
