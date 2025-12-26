import { useState, useCallback } from 'react'
import { useRouter } from '@tarojs/taro'
import { TopView, Button, Header, toast, loading, Loading, Column, Row, Text, Input } from '@/duxui'
import { request, nav, cmsUser, useVerifyCode } from '@/duxcmsUser'
import { duxcmsUserLang } from '@/duxcmsUser/utils'

export default function Phone() {
  const { type, original_code = '' } = useRouter().params
  const [userInfo] = cmsUser.useUserInfo()
  const t = duxcmsUserLang.useT()
  const [post, setPost] = useState({
    original_code,
    tel: '',
    code: ''
  })

  const code = useVerifyCode()

  const onChangePost = useCallback((key, value) => {
    if (!key && typeof value === 'object') {
      setPost(old => { return { ...old, ...value } })
    } else {
      setPost(old => { return { ...old, [key]: value } })
    }
  }, [])

  const show = !!type

  const submit = useCallback(() => {
    if (show) {
      if (post.tel == '' || post.code == '') return toast(t('info.phone.incomplete'))
      request({
        url: 'member/setting/replaceTel',
        data: post,
        method: 'POST',
        toast,
        loading,
      }).then(() => {
        cmsUser.getOnlineUserInfo().then(cmsUser.setInfo)
        toast(t('info.phone.success'))
        setTimeout(() => {
          nav('back:home')
        }, 800);
      })

    } else {
      if (post.original_code == '') return toast(t('info.phone.incomplete'))
      nav('duxcmsUser/info/phone', { type: true, original_code: post.original_code })
    }
  }, [post, show, t])

  const getCode = useCallback(() => {
    code.getCode(() => request({
      url: show ? 'member/code' : 'member/setting/code',
      data: show ? { username: post.tel } : {},
      toast,
      loading,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, post.tel])

  return <TopView>
    <Header title={t('info.phone.title')} />

    <Column className='r-3 bg-white m-3 p-3 gap-4'>
      <Column className='gap-2'>
        <Text size={1} color={3}>{show ? t('info.phone.newPhone') : t('info.phone.boundPhone')}</Text>
        {
          show ?
            <Column className='p-3 r-2 bg-page'>
              <Input value={post.tel} onInput={(e) => onChangePost('tel', e.detail.value)} placeholder={t('info.phone.newPhonePlaceholder')} />
            </Column> :
            <Text size={5} bold>{userInfo.tel}</Text>
        }
      </Column>
      <Column className='gap-2'>
        <Text size={1} color={3}>{t('info.phone.code')}</Text>
        <Row className='bg-page r-2 p-3'>
          <Input value={show ? post.code : post.original_code} onInput={(e) => onChangePost(show ? 'code' : 'original_code', e.detail.value)} className='flex-grow' placeholder={t('info.phone.codePlaceholder')} />
          {
            code.status === 2 ?
              <Loading size={42} /> :
              <Text size={2} type='primary' onClick={getCode}>{code.text}</Text>
          }
        </Row>
      </Column>
      <Button
        size='l'
        className='mt-3 mh-3'
        onClick={submit}
        type='primary'
      >{show ? t('info.phone.bind') : t('info.phone.next')}</Button>
      <Column />
    </Column>
  </TopView>
}
