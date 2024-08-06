import { useCallback, useEffect, useRef, useState } from 'react'
import { TopView, Header, loading, nav, Row, Card, ScrollView, Form, Divider, Input, Column, Button, PickerSelect, confirm } from '@/duxui'
import { request, usePageData, useVerifyCode, toast } from '@/duxcmsAccount'

export default function CardAdd() {

  const form = useRef(null)

  const [bank] = usePageData('account/bank')

  const [type, setType] = useState('')

  const { text, getCode } = useVerifyCode()

  useEffect(() => {
    request('member/real').then(async res => {
      if(!res.no && await confirm({
        title: '实名认证',
        content: '尚未进行实名认证，是否前去认证？',
        confirmText: '去认证'
      })) {
        nav('duxcmsAccount/real/form')
      }
    })
  }, [])

  const noChange = useCallback(async e => {
    if (!e.detail.value) {
      return
    }
    const res = await request({
      url: 'account/bank/check',
      method: 'POST',
      toast: true,
      data: {
        no: e.detail.value
      }
    })
    if (res.id) {
      form.current.setValues({ 'bank_id': res.id })
      setType(res.type)
    }
  }, [])

  const _getCode = useCallback(() => {
    if (!/^1\d{10}$/.test(form.current.values.tel)) {
      return toast('请输入正确的手机')
    }
    getCode(() => request({
      url: 'member/card/code',
      data: {
        tel: form.current.values.tel,
      },
      toast: true,
    }))
  }, [getCode])

  const submit = useCallback(async data => {
    await request({
      url: 'member/card',
      method: 'POST',
      data,
      toast: true,
      loading
    })
    nav('back:')
  }, [])

  return <TopView isForm>
    <Header title='添加银行卡' />
    <Form ref={form} onSubmit={submit}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <Divider.Group padding={0}>
            <Form.Item label='卡号' field='no'>
              <Input onBlur={noChange} grow placeholder='请输入银行卡卡号' type='number' />
            </Form.Item>
            <Form.Item label='电话' field='tel'>
              <Input grow placeholder='请填写银行预留电话' type='number' />
            </Form.Item>
            <Form.Item label='开户行' field='bank_id'>
              <PickerSelect range={bank} placeholder='请选择开户行' valueKey='id' title='开户行' />
            </Form.Item>
            <Form.Item label='开户行支行' field='deposit'>
              <Input grow placeholder='请填写开户行支行' />
            </Form.Item>
            <Row items='center'>
              <Form.Item label='验证码' field='code' className='flex-grow'>
                <Input grow placeholder='请输入验证码' type='number' />
              </Form.Item>
              <Button onClick={_getCode} size='s'>{text}</Button>
            </Row>
            {
              type === 'CC' && <>
                <Form.Item label='安全码' field='credit_code'>
                  <Input onBlur={noChange} grow placeholder='请填写信用卡背部的安全码' type='number' />
                </Form.Item>
                <Divider padding={0} />
                <Form.Item label='过期时间' field='credit_expire'>
                  <Input onBlur={noChange} grow placeholder='请填过期时间' type='number' />
                </Form.Item>
              </>
            }
          </Divider.Group>
        </Card>
      </ScrollView>
      <Column className='p-3 bg-white'>
        <Form.Submit>
          <Button type='primary' size='l'>提交</Button>
        </Form.Submit>
      </Column>
    </Form>
  </TopView>
}
