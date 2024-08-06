import { Avatar, Card, Header, Row, ScrollView, TopView, Button } from '@/duxui'
import { cmsUser, requestPermissionMessage, upload, uploadTempFile } from '@/duxcmsUser'
import { useCallback } from 'react'

export default function UserAvatar() {

  const [userInfo] = cmsUser.useUserInfo()

  const updateAvatar = useCallback(async () => {
    await requestPermissionMessage(requestPermissionMessage.types.image, '用于修改用户头像')
    const [avatar] = await upload('image', {
      count: 1,
      sizeType: ['compressed'],
      api: 'member/setting/avatar',
      resultField: ['data', 'data', 'url']
    })
    await cmsUser.setInfo({ avatar })
  }, [])

  const wxAvatar = useCallback(async data => {
    const [avatar] = await uploadTempFile([{ path: data.detail.avatarUrl }], {
      api: 'member/setting/avatar',
      resultField: ['data', 'data', 'url']
    })
    await cmsUser.setInfo({ avatar })
  }, [])

  return <TopView>
    <Header title='设置头像' />
    <ScrollView>
      <Card margin className='items-center gap-4'>
        <Avatar size='l' url={userInfo.avatar} />
        <Row className='gap-3 mt-3'>
          <Button type='primary' onClick={updateAvatar}>上传头像</Button>
          {process.env.TARO_ENV === 'weapp' && <Button type='secondary' openType='chooseAvatar' onChooseAvatar={wxAvatar}>使用微信头像</Button>}
        </Row>
      </Card>
    </ScrollView>
  </TopView>
}
