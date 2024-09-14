import { Header, ScrollView, Cell, GroupList, updateApp, confirm } from '@/duxuiExample'
import { setClipboardData } from '@tarojs/taro'

let DeviceInfo
if (process.env.TARO_ENV === 'rn') {
  DeviceInfo = require('react-native-device-info')
}

export const User = () => {

  return <>
    <Header title='Duxui' titleCenter />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='设置'>
          <Cell.Group>
            <Cell title='duxui' subTitle='基于Taro开发的UI库，兼容小程序、H5、ReactNaitve' />
            <Cell title='作者' subTitle='908634674@qq.com' />
            {process.env.TARO_ENV !== 'rn' && <Cell title='APP版本' desc='查看' isLink
              onClick={() => {
                setClipboardData({ data: 'https://app.share.dux.plus/com.duxapp.duxui' })
              }}
            />}
            {process.env.TARO_ENV !== 'weapp' && <Cell title='小程序版本' desc='查看' isLink onClick={() => confirm({ content: '微信搜索小程序 duxui 查看' })} />}
            {process.env.TARO_ENV !== 'h5' && <Cell title='H5版本' desc='查看' isLink
              onClick={() => {
                setClipboardData({ data: 'https://example.duxui.cn' })
              }}
            />}
            {process.env.TARO_ENV === 'rn' &&
              <Cell title='版本更新' subTitle='duxapp集成了codepush热更新模块' onClick={updateApp} desc={`${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`} />
            }
          </Cell.Group>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </>
}
