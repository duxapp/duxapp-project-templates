import { useCallback } from 'react'
import { request, toast, useVerifyCode } from '@/duxcmsUser'
import { Button, Input, Form, Header, TopView, ScrollView, Loading, Column, Text, Row, nav } from '@/duxui'

export default function Password() {

  const code = useVerifyCode()

  const getCode = useCallback(() => {
    code.getCode(() => request({
      url: 'member/setting/code',
      toast: true,
      loading: true,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit = async (data) => {
    if (data.password?.length !== 6) {
      return toast('请输入6位数字密码')
    }
    await request({
      url: 'member/account/password',
      method: 'POST',
      data,
      loading: true,
      toast,
    }).then(() => {
      toast('修改成功')
      nav('back:')
    })
  }

  return <TopView>
    <Header title='支付密码' />
    <Form onSubmit={submit}>
      <ScrollView>
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
            <Input password placeholder='请输入支付密码' />
          </Form.Item>
        </Column>
        <Form.Submit>
          <Button type='primary' size='l' className='m-3'>提交</Button>
        </Form.Submit>
      </ScrollView>
    </Form>
  </TopView>
}


