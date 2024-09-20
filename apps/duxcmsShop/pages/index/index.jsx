import { Column, TopView } from '@/duxui'
import { TabBar, tabbar, Cart, cart, MallCateQuick } from '@/duxcmsShop'
import { useEffect } from 'react'

import { Home, User } from './pages'

const defaultComps = {
  home: Home,
  user: User,
  cart: Cart,
  category: MallCateQuick
}

export default function Index() {

  const pages = tabbar.pages.sort((a, b) => a.sort - b.sort).map(item => {
    if (!item.comp && defaultComps[item.type]) {
      item.comp = defaultComps[item.type]
    }
    if (!item.comp) {
      item.comp = Column
    }
    return item
  })

  const data = cart.useCart()

  useEffect(() => {
    const index = pages.findIndex(v => v.type === 'cart')
    if (~index) {
      TabBar.setNumber(index, +data.num)
    }
  }, [data.num, pages])

  const TabBarIcon = ({
    hover,
    index
  }) => {
    const item = pages[index]
    return <TabBar.ItemIcon
      hover={hover}
      name={item.name}
      image={item.image}
      imageHover={item.imageHover}
      icon={hover ? item.iconHover : item.icon}
    />
  }

  return (
    <TopView isSafe>
      <TabBar>
        {
          pages.map(item => <TabBar.Item key={item.type} itemKey={item.type} component={item.comp} icon={TabBarIcon} />)
        }
      </TabBar>
    </TopView>
  )
}
