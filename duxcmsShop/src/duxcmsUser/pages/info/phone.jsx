import { useState, useCallback } from 'react'
import { useRouter } from '@tarojs/taro'
import { TopView, Button, Header, toast, loading, Loading, Column, Row, Text, Input } from '@/duxui'
import { request, nav, cmsUser, useVerifyCode } from '@/duxcmsUser'

export default function Phone() {
  const { type, original_code = '' } = useRouter().params
  const [userInfo] = cmsUser.useUserInfo()
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
      if (post.tel == '' || post.code == '') return toast('请输入完整！')
      request({
        url: 'member/setting/replaceTel',
        data: post,
        method: 'POST',
        toast,
        loading,
      }).then(() => {
        cmsUser.getOnlineUserInfo().then(cmsUser.setInfo)
        toast('修改成功')
        setTimeout(() => {
          nav('back:home')
        }, 800);
      })

    } else {
      if (post.original_code == '') return toast('请输入完整！')
      nav('duxcmsUser/info/phone', { type: true, original_code: post.original_code })
    }
  }, [show, post])

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
    <Header title='更换手机号' />

    <Column className='mh-3 mt-3 bg-white r-2 p-3'>
      <Input value={show ? post.tel : userInfo.tel} disabled={!show} onInput={(e) => onChangePost(show ? 'tel' : '', e.detail.value)} placeholder='请输入新手机号' />
    </Column>
    <Row className='mh-3 mt-3 bg-white r-2 p-3'>
      <Input value={show ? post.code : post.original_code} onInput={(e) => onChangePost(show ? 'code' : 'original_code', e.detail.value)} className='flex-grow' placeholder='请输入验证码' />
      {
        code.status === 2 ?
          <Loading size={42} /> :
          <Text size={2} type='primary' onClick={getCode}>{code.text}</Text>
      }
    </Row>
    <Button
      size='l'
      className='mt-3 mh-3'
      onClick={submit}
      type='primary'
    >{show ? '完成' : '下一步'}</Button>

  </TopView>
}
