import { Header, ScrollView, TopView, GroupList, Button } from '@/duxuiExample'
import { WechatShare } from '@/duxappWechatShare'

export default TopView.page(function LoadingExample() {

  // 需要注意的是使用此HOOK需要在TopView的内部使用，因此此处TopView的用法和以前有不同
  WechatShare.useSharePage({
    title: '分享示例', // 如果未配置，会取当前页面Header组件的title作为标题
    // path: '', // 指定
    // params: {}, // 可以指定分享页面的参数
    // image: '', // 指定分享图片
    // weappImage: '', // 如果小程序端需要指定图片 需要指定这个字段
    // 异步返回参数 返回的参数和当前参数一致
    // async: async () => {
    //   return {

    //   }
    // }
  })

  return <>
    <Header title='Share' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='分享' desc='分享不是一个组件，而是一套系统，需要配置开关，可以配置某些页面分享到自身页面、可以配置某些页面分享到指定的页面，也可以指定页面具体的分享参数'>
          <Button type='primary' openType='share' onClick={() => WechatShare.openShare()}>打开分享</Button>
        </GroupList.Item>
        <GroupList.Item desc='分享组件同时支持小程序、h5、RN，h5端需要注册一个返回jssdk初始化参数的函数、app端需要配置分享到小程序或者H5的相关参数即可使用'>

        </GroupList.Item>
        <GroupList.Item title='鸿蒙端暂不支持分享功能'>

        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </>
})
