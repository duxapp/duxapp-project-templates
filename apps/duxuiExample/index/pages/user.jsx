import { Header, ScrollView, Cell, GroupList, confirm, CellGroup, duxuiExampleLang } from '@/duxuiExample'
import { setClipboardData } from '@tarojs/taro'


export const User = () => {
  const t = duxuiExampleLang.useT()

  return <>
    <Header title={t('header.title')} titleCenter />
    <ScrollView>
      <GroupList>
        <GroupList.Item title={t('user.group.title')} desc={t('user.group.desc')}>
          <CellGroup>
            <Cell title={t('user.cells.duxuiTitle')} subTitle={t('user.cells.duxuiSubTitle')} />
            <Cell title={t('user.cells.authorTitle')} subTitle='908634674@qq.com' />
            {process.env.TARO_ENV !== 'rn' && <Cell title={t('user.cells.appVersionTitle')} desc={t('user.cells.actionCopy')} isLink
              onClick={() => {
                setClipboardData({ data: 'https://app.share.dux.plus/cn.duxapp.duxui' })
              }}
            />}
            {process.env.TARO_ENV !== 'weapp' && <Cell title={t('user.cells.weappVersionTitle')} desc={t('user.cells.actionView')} isLink onClick={() => confirm({ content: t('user.tips.weappContent') })} />}
            {process.env.TARO_ENV !== 'h5' && <Cell title={t('user.cells.h5VersionTitle')} desc={t('user.cells.actionCopy')} isLink
              onClick={() => {
                setClipboardData({ data: 'https://example.duxui.cn' })
              }}
            />}
            {process.env.TARO_ENV !== 'harmony_cpp' && <Cell title={t('user.cells.harmonyVersionTitle')} desc={t('user.cells.actionView')} isLink
              onClick={() => {
                confirm({
                  title: t('user.tips.harmonyTitle'),
                  content: t('user.tips.harmonyContent')
                })
              }}
            />}
            {/* {process.env.TARO_ENV === 'rn' &&
              <Cell title='版本更新' subTitle='duxapp集成了codepush热更新模块' onClick={updateApp} desc={`${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`} />
            } */}
          </CellGroup>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </>
}
