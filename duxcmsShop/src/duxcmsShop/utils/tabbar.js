import { CmsIcon, duxappTheme, px } from '@/duxcms'
import { createTabBar } from '@/duxui'

export const TabBar = createTabBar()

const lineHeight = process.env.TARO_ENV === 'rn' ? { lineHeight: px(52) } : {}

export const tabbar = {
  pages: [
    { type: 'home', name: '首页', sort: 10, icon: 'tabbar_home_nor', iconHover: 'tabbar_home_fill' },
    { type: 'category', name: '分类', sort: 20, icon: 'tabbar_sort_nor', iconHover: 'tabbar_sort_fill' },
    { type: 'cart', name: '购物车', sort: 30, icon: 'tabBar_car_nor', iconHover: 'tabBar_car_fill' },
    { type: 'user', name: '我的', sort: 40, icon: 'tabBar_mine_nor', iconHover: 'tabBar_mine_fill' }
  ].map(item => {
    return {
      ...item,
      icon: <CmsIcon key={1} name={item.icon} color={duxappTheme.textColor1} size={52} style={lineHeight} />,
      iconHover: <CmsIcon key={2} name={item.iconHover} color={duxappTheme.primaryColor} size={52} style={lineHeight} />
    }
  }),
  /** 新增页面 */
  addPage: (...items) => {
    tabbar.pages.push(...items.map(item => {
      if (!item.sort) {
        item.sort = 15
      }
    }))
  },
  /** 移除默认页面 */
  removePage: type => {
    const index = tabbar.pages.findIndex(v => v.type === type)
    if (~index) {
      tabbar.pages.splice(index + 1, 1)
    }
  }
}
