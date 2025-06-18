import { TopView, TabBar, TestIcon } from '@/duxuiExample'
import { Home, User } from './pages'

const tabbarList = [
  {
    text: '首页',
    icon: 'nav-home-line',
    iconHover: 'nav-home-fill',
    comp: Home
  },
  {
    text: '个人中心',
    icon: 'nav-mine-line',
    iconHover: 'nav-mine-fill',
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
    icon={<TestIcon size={40}
      className={hover ? 'text-primary' : ' text-c1'}
      name={tabbarList[index][hover ? 'iconHover' : 'icon']}
    />}
  />
}

export default function Index() {

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
