import { View, Text, Image } from '@tarojs/components'
import { user } from '@/duxappUser/utils'
import tip from './image/tip.png'
import './index.scss'

export default function AuthLogin({ title = '使用此功能需要登陆', children }) {

  const [, loginStatus] = user.useUserInfo()

  return !loginStatus ?
    <View className='auth-login m-3 bg-white r-2'>
      <Image className='auth-login__icon' src={tip} mode='widthFix' />
      <Text className='auth-login__title'>{title}</Text>
      <View className='auth-login__submit' onClick={() => user.login().catch(() => { })}>去登陆</View>
    </View> :
    children
}
