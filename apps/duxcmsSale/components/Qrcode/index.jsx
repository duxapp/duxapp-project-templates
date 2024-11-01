import { Button, Column, Image, Text, TopView, confirm, loading } from '@/duxui'
import { request, saveToPhoto, nav, user } from '@/duxcmsSale/utils'
import './index.scss'

export const Qrcode = ({
  onClose,
  image
}) => {

  return <Column className='Qrcode__mask' onClick={onClose}>
    <Image src={image} mode='widthFix' className='Qrcode__qrcode' />
    {
      process.env.TARO_ENV === 'h5' ?
        <Text color={4}>截图保存</Text> :
        <Button type='primary' size='l' radiusType='round' className='Qrcode__save' onClick={() => saveToPhoto(image)}>
          保存
        </Button>
    }
  </Column>
}

Qrcode.show = async (verify, url = 'sale/user/qrcode') => {
  if (verify === true) {
    if (!user.isLogin()) {
      await user.login()
    }
    // 验证分销权限
    await request({
      url: 'sale/index',
      repeatTime: 0,
      // toast: true,
      loading
    }).catch(err => {
      confirm({
        content: err.message,
        confirmText: '去升级'
      }).then(status => {
        status && nav('duxcmsSale/index/apply')
      })
      throw err
    })
  }
  const { image } = await request({
    url,
    loading,
    toast: true
  })
  const { remove } = TopView.add([Qrcode, {
    image,
    onClose: () => {
      remove()
    }
  }])
}
