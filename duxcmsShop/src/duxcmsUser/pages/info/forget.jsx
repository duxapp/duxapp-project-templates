import { useCallback, useRef } from 'react'
import { request, toast, useVerifyCode } from '@/duxcmsUser'
import { Button, Input, Form, Header, TopView, ScrollView, Loading, Column, Text, Row, nav, loading } from '@/duxui'

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
          <Form.Item field='username'>
            <Input placeholder='请输入手机号' />
          </Form.Item>
        </Column>
        <Row className='mh-3 mt-3 bg-white r-2 p-3' items='center'>
          <Form.Item field='code'>
            <Input placeholder='请输入验证码' className='flex-grow' />
          </Form.Item>
          {
            code.status === 2 ?
              <Loading size={42} /> :
              <Text size={2} type='primary' onClick={getCode}>{code.text}</Text>
          }
        </Row>
        <Column className='mh-3 mt-3 bg-white r-2 p-3'>
          <Form.Item field='password'>
            <Input password placeholder='请再次输入新密码' />
          </Form.Item>
        </Column>
        <Form.Submit>
          <Button type='primary' size='l' className='m-3'>提交</Button>
        </Form.Submit>
      </ScrollView>
    </Form>
  </TopView>
}


