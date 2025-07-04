import { useCallback } from 'react'
import { request, user, toast, useVerifyCode } from '@/duxcmsUser'
import { Button, Input, Form, Header, TopView, Loading, Column, Text, Row, FormItem, FormSubmit, route } from '@/duxui'

export default function Password() {

  const { params } = route.useRoute()

  const userInfo = user.getUserInfo()

  const code = useVerifyCode()

  const getCode = useCallback(() => {
    code.getCode(() => request({
      url: 'member/setting/code',
      toast: true,
      loading: true,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const start = !params.code

  const submit = async data => {
    if (!data.code) {
      return toast('请输入验证码')
    }
    if (!/^\d{4,6}$/.test(data.code)) {
      return toast('请输入正确的验真吗')
    }
    if (start) {
      return route.nav('duxcmsUser/info/password', data)
    }
    if (data.password != data.password1) {
      return toast('两次密码不一致')
    }
    await request({
      url: 'member/setting/password',
      method: 'POST',
      data,
      loading: true,
      toast,
    }).then(() => {
      toast('修改成功')
      setTimeout(() => {
        user.logout()
      }, 800)
    })
  }

  return <TopView>
    <Header title={start ? '身份验证' : '新密码'} />
    <Form onSubmit={submit} defaultValues={params}>
      <Column className='r-3 bg-white m-3 p-3 gap-4'>
        {start ?
          <>
            <Column className='gap-2'>
              <Text size={1} color={3}>绑定的手机号</Text>
              <Text size={5} bold>{userInfo.tel}</Text>
            </Column>
            <Column className='gap-2'>
              <Text size={1} color={3}>验证码</Text>
              <Row className='bg-page r-2 p-3'>
                <FormItem name='code'>
                  <Input className='flex-grow' placeholder='请输入验证码' />
                </FormItem>
                {
                  code.status === 2 ?
                    <Loading size={42} /> :
                    <Text size={2} type='primary' onClick={getCode}>{code.text}</Text>
                }
              </Row>
            </Column>
          </> :
          <>
            <Column className='gap-2'>
              <Text size={1} color={3}>新密码</Text>
              <Column className='p-3 r-2 bg-page'>
                <FormItem name='password1'>
                  <Input placeholder='输入新新密码' />
                </FormItem>
              </Column>
            </Column>
            <Column className='gap-2'>
              <Text size={1} color={3}>再次输入</Text>
              <Column className='p-3 r-2 bg-page'>
                <FormItem name='password'>
                  <Input placeholder='再次输入新新密码' />
                </FormItem>
              </Column>
            </Column>
          </>}
        <FormSubmit>
          <Button type='primary' size='l' className='m-3'>{start ? '下一步' : '提交'}</Button>
        </FormSubmit>
      </Column>
    </Form>
  </TopView>
}


