import { HomeBanner, MallList, shopHook, HomeMenu, HomeAd, HomeNav } from '@/duxcmsShop'
import { ScrollView, ScrollViewManage, Header, userConfig } from '@/duxui'

export const Home = () => {

  const config = userConfig.option.duxcmsShop?.home || {}

  return <shopHook.Render mark='home'>
    <shopHook.Render mark='home.header'>
      <Header title={config.title || '首页'} titleCenter />
    </shopHook.Render>
    <ScrollViewManage>
      <ScrollView>
        <shopHook.Render mark='home.banner'>{HomeBanner}</shopHook.Render>
        <shopHook.Render mark='home.menu'>{HomeMenu}</shopHook.Render>
        <shopHook.Render mark='home.ad'>{HomeAd}</shopHook.Render>
        <shopHook.Render mark='home.mall-nav'>
          <HomeNav title='商品推荐' url='duxcmsMall/goods/list' />
        </shopHook.Render>
        <shopHook.Render mark='home.mall'>
          <MallList paging />
        </shopHook.Render>
      </ScrollView>
    </ScrollViewManage>
  </shopHook.Render>
}
