import { TestIcon, TopView, Header, createTabBar, ScrollView, Text, duxappTheme, confirm } from '@/duxuiExample'
import { useEffect } from 'react'

const TabBar = createTabBar()

const Home = () => {

  TabBar.useShow(() => {
    console.log('Home显示')
  })

  TabBar.useHide(() => {
    console.log('Home隐藏')
  })

  /**
   * 返回一个是否显示的布尔值
   */
  const show = TabBar.useShowStatus()

  return <>
    <Header title='首页' />
    <ScrollView>
      <Text>首页内容</Text>
    </ScrollView>
  </>
}

const Category = () => {
  return <>
    <Header title='消息' />
    <ScrollView>
      <Text>消息内容</Text>
    </ScrollView>
  </>
}

const User = () => {
  return <>
    <Header title='个人中心' />
    <ScrollView>
      <Text>个人中心内容</Text>
    </ScrollView>
  </>
}

const tabbarList = [
  {
    text: '首页',
    icon: 'shuxing',
    iconHover: 'shuxing',
    comp: Home
  },
  {
    text: '消息',
    icon: 'biaoti',
    iconHover: 'biaoti',
    comp: Category
  },
  {
    text: '个人中心',
    icon: 'canshu',
    iconHover: 'canshu',
    comp: User
  }
]

const TabBarIcon = ({
  hover,
  index
}) => {

  return <TabBar.ItemIcon
    hover={hover}
    name={tabbarList[index].text}
    icon={<TestIcon size={40} color={hover ? duxappTheme.primaryColor : duxappTheme.textColor1} name={tabbarList[index][hover ? 'iconHover' : 'icon']} />}
  />
}

/**
 * Tabbar跳转拦截
 * @returns
 */

TabBar.onSwitchBefore(async ({ index }) => {

  if (index === 2) {
    const status = await confirm({
      title: '跳转拦截',
      content: '点击确定跳转到个人中心,点击取消将不会跳转'
    })
    if (!status) {
      throw '取消跳转'
    }
  }

})

export default function TabBarExample() {

  useEffect(() => {
    setTimeout(() => {
      TabBar.setNumber(1, 10)
      TabBar.setNumber(2, -1)
    }, 500)
  }, [])

  return (
    <TopView isSafe>
      <TabBar>
        {
          tabbarList.map(item => <TabBar.Item key={item.text} component={item.comp} icon={TabBarIcon} />)
        }
      </TabBar>
    </TopView>
  )
}
