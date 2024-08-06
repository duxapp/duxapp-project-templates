import { Button, Card, Divider, Form, Header, Text, TopView, Row, Input, toast, loading } from '@/duxui'
import { useCallback, useState } from 'react'
import { CommonPay, request, useRequest } from '@/duxcmsAccount'

export default function Recharge() {

  const [money, setMoney] = useState('')

  const [{ content }] = useRequest('member/recharge/config')

  const submit = useCallback(async () => {
    if (+money <= 0) {
      return toast('请输入充值金额')
    }
    const { token } = await request({
      url: 'member/recharge/payment/token',
      method: 'POST',
      data: {
        money
      },
      loading,
      toast: true
    })
    await CommonPay.pay({
      payList: () => request({
        url: 'member/recharge/payment/type',
        loading,
        toast: true
      }),
      payData: {
        url: 'member/recharge/payment',
        method: 'POST',
        data: {
          token,
          api: 'member/recharge/payment',
        },
      },
      fields: {
        type: 'pay_type',
        type_params: 'type_params'
      }
    })
  }, [money])

  return <TopView isSafe>
    <Header title='充值' />
    <Card margin className='p-3'>
      <Text className='mt-2'>充值积分</Text>
      <Row className='mt-3' justify='start' items='center'>
        <Form.Item field='money'>
          <Text size={52} bold>￥</Text>
          <Input className='mh-3' type='number' onChange={setMoney} value={money} placeholder='请输入充值金额' />
        </Form.Item>
      </Row>
      <Divider />
      <Row justify='between'>
        <Text className='mt-1' color={2}>当前比例：1元=1积分</Text>
      </Row>
    </Card>
    <Card className='gap-3' margin disableMarginTop shadow={false}>
      <Card.Title>充值说明</Card.Title>
      <Text>{content}</Text>
    </Card>
    <Card className='ph-3 w-full bottom-0 absolute'>
      <Button size='l' type='primary' onClick={submit}>提交</Button>
    </Card>
  </TopView>

}
