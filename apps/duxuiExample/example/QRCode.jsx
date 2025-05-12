import { Header, ScrollView, TopView, GroupList, pxNum, QRCode } from '@/duxuiExample'

export default function QRCodeExample() {

  return <TopView>
    <Header title='QRCode' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <QRCode
            value='http://duxapp.com'
          />
        </GroupList.Item>
        <GroupList.Item title='颜色'>
          <QRCode
            value='http://duxapp.com'
            color='darkblue'
            backgroundColor='lightblue'
          />
        </GroupList.Item>
        <GroupList.Item title='渐变'>
          <QRCode
            value='http://duxapp.com'
            enableLinearGradient
          />
        </GroupList.Item>
        <GroupList.Item title='Logo'>
          <QRCode
            value='http://duxapp.com'
            logo={require('./static/logo.jpg')}
          />
        </GroupList.Item>
        <GroupList.Item title='尺寸、边距、Logo圆角' desc='组件需要从 @/duxui/components/QRCode 导入'>
          <QRCode
            value='http://duxapp.com'
            logo={require('./static/logo.jpg')}
            size={pxNum(300)}
            logoSize={pxNum(100)}
            logoBorderRadius={pxNum(20)}
            logoMargin={pxNum(12)}
            logoBackgroundColor='red'
            quietZone={10}
          />
        </GroupList.Item>

      </GroupList>
    </ScrollView>
  </TopView>
}
