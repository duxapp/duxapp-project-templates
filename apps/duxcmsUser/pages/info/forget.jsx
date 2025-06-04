import { useCallback, useRef } from 'react'
import { request, toast, useVerifyCode } from '@/duxcmsUser'
import { Button, Input, Form, Header, TopView, ScrollView, Loading, Column, Text, Row, nav, loading, FormItem, FormSubmit } from '@/duxui'

export default function Password() {

  const form = useRef()

  const code = useVerifyCode()

  const getCode = useCallback(() => {
    if (!form.current.values.username) {
      return toast('请输入手机号')
    }
    code.getCode(() => request({
      url: 'member/code',
      data: { username: form.current.values.username },
      toast: true,
      loading,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit = async (data) => {
    await request({
      url: 'member/forget',
      method: 'POST',
      data,
      loading: true,
      toast,
    }).then(() => {
      toast('重置成功')
      setTimeout(() => nav('back:'), 800)
    })
  }

  return <TopView>
    <Header title='找回密码' />
    <Form onSubmit={submit} ref={form}>
      <ScrollView>
        <Column className='mh-3 mt-3 bg-white r-2 p-3'>
          <FormItem field='username'>
            <Input placeholder='请输入手机号' />
          </FormItem>
        </Column>
        <Row className='mh-3 mt-3 bg-white r-2 p-3' items='center'>
          <FormItem field='code'>
            <Input placeholder='请输入验证码' className='flex-grow' />
          </FormItem>
          {
            code.status === 2 ?
              <Loading size={42} /> :
              <Text size={2} type='primary' onClick={getCode}>{code.text}</Text>
          }
        </Row>
        <Column className='mh-3 mt-3 bg-white r-2 p-3'>
          <FormItem field='password'>
            <Input password placeholder='请再次输入新密码' />
          </FormItem>
        </Column>
        <FormSubmit>
          <Button type='primary' size='l' className='m-3'>提交</Button>
        </FormSubmit>
      </ScrollView>
    </Form>
  </TopView>
}


