import { Header, ScrollView, Cell, GroupList, updateApp, confirm, toast } from '@/duxuiExample'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'

let DeviceInfo, codePush
if (process.env.TARO_ENV === 'rn') {
  DeviceInfo = require('react-native-device-info')
  codePush = require('react-native-code-push')
}

export const User = () => {

  const [codepushVersion, setCodepushVersion] = useState(false)

  useEffect(() => {
    // platform rn start
    if (process.env.TARO_ENV === 'rn') {
      codePush.getUpdateMetadata(codePush.UpdateState.RUNNING).then(res => {
        if (res) {
          setCodepushVersion(res.label)
        }
      })
    }
    // platform rn end
  }, [])

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
                Taro.setClipboardData({ data: 'https://app.share.dux.plus/com.duxapp.duxui' })
              }}
            />}
            {process.env.TARO_ENV !== 'weapp' && <Cell title='小程序版本' desc='查看' isLink onClick={() => confirm({ content: '微信搜索小程序 duxui 查看' })} />}
            {process.env.TARO_ENV !== 'h5' && <Cell title='H5版本' desc='查看' isLink
              onClick={() => {
                Taro.setClipboardData({ data: 'https://example.duxui.cn' })
              }}
            />}
            {process.env.TARO_ENV === 'rn' &&
              <Cell title='版本更新' subTitle='duxapp集成了codepush热更新模块' onClick={updateApp} desc={`${DeviceInfo.getVersion()} ${codepushVersion}(${DeviceInfo.getBuildNumber()})`} />
            }
          </Cell.Group>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </>
}
