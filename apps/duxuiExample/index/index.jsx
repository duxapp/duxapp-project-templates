import { useMemo } from 'react'
import { TopView, TabBar, TestIcon, duxuiExampleLang } from '@/duxuiExample'
import { Home, User } from './pages'

export default function Index() {
  const t = duxuiExampleLang.useT()

  const tabbarList = useMemo(() => ([
    {
      text: t('tabBar.home'),
      icon: 'nav-home-line',
      iconHover: 'nav-home-fill',
      comp: Home
    },
    {
      text: t('tabBar.user'),
      icon: 'nav-mine-line',
      iconHover: 'nav-mine-fill',
      comp: User
    }
  ]), [t])

  const TabBarIcon = useMemo(() => ({
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
  }, [tabbarList])

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
