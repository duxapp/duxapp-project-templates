import { Avatar, Card, Header, Row, ScrollView, TopView, Button } from '@/duxui'
import { cmsUser, requestPermissionMessage, upload, uploadTempFile } from '@/duxcmsUser'
import { duxcmsUserLang } from '@/duxcmsUser/utils'
import { useCallback } from 'react'

export default function UserAvatar() {

  const [userInfo] = cmsUser.useUserInfo()
  const t = duxcmsUserLang.useT()

  const updateAvatar = useCallback(async () => {
    await requestPermissionMessage(requestPermissionMessage.types.image, t('info.avatar.permission'))
    const [avatar] = await upload('image', {
      count: 1,
      sizeType: ['compressed'],
      api: 'member/setting/avatar',
      resultField: ['data', 'data', 'url']
    })
    await cmsUser.setInfo({ avatar })
  }, [t])

  const wxAvatar = useCallback(async data => {
    const [avatar] = await uploadTempFile([{ path: data.detail.avatarUrl }], {
      api: 'member/setting/avatar',
      resultField: ['data', 'data', 'url']
    })
    await cmsUser.setInfo({ avatar })
  }, [])

  return <TopView>
    <Header title={t('info.avatar.title')} />
    <ScrollView>
      <Card margin className='items-center gap-4'>
        <Avatar size='l' url={userInfo.avatar}>{t('info.avatar.empty')}</Avatar>
        <Row className='gap-3 mt-3'>
          <Button type='primary' onClick={updateAvatar}>{t('info.avatar.upload')}</Button>
          {process.env.TARO_ENV === 'weapp' && <Button type='secondary' openType='chooseAvatar' onChooseAvatar={wxAvatar}>{t('info.avatar.useWechat')}</Button>}
        </Row>
      </Card>
    </ScrollView>
  </TopView>
}
