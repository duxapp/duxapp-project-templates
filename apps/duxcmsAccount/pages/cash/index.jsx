import { Button, Card, Divider, Form, Header, Text, TopView, Row, px, Input, toast, loading, PullView, Column, ScrollView, Space, duxappTheme, Radio, confirm, nav, DuxuiIcon, CardTitle, FormItem } from '@/duxui'
import { useCallback, useState } from 'react'
import { request, useRequest } from '@/duxcmsAccount'

export default function Cash() {

  const [money, setMoney] = useState('')

  const [info] = useRequest('member/account')

  const [cash] = useRequest('member/cash/config')

  const submit = useCallback(async () => {
    if (+money <= 0) {
      return toast('请输入提现金额')
    }
    await request({
      url: 'member/cash',
      method: 'POST',
      data: {
        card_id: await CardList.get(),
        amount: money
      },
      loading,
      toast: true
    })
    await confirm({
      title: '提交成功'
    })
    await nav('back:')
  }, [money])

  return <TopView isSafe>
    <Header title='提现' />
    <Card margin className='p-3 gap-3' shadow>
      <Text className='mt-2'>可提现：{info.amount}</Text>
      <Row className='mt-3' justify='start' items='center'>
        <FormItem field='money'>
          <Text size={52} bold>￥</Text>
          <Input className='mh-3' grow type='number' onChange={setMoney} value={money} placeholder='请输入提现金额' />
        </FormItem>
      </Row>
      <Divider />
      <Row justify='between' className='mt-1'>
        <Text color={2}>提现手续费：{cash.cash_tax || 0}%</Text>
        <Button size='s' onClick={() => nav('duxcmsAccount/cash/log')}>提现记录</Button>
      </Row>
    </Card>
    <Card className='' margin disableMarginTop shadow={false}>
      <CardTitle>提现说明</CardTitle>
      <Text className='mt-2 text-c2'>{cash.cash_info}</Text>
    </Card>
    <Card className='ph-3 w-full bottom-0 absolute'>
      <Button size='l' type='primary' onClick={submit}>提交</Button>
    </Card>
  </TopView>
}

const CardList = ({ list, onSubmit, onClose }) => {

  const [id, setId] = useState('')

  return <PullView onClose={onClose}>
    <Column className='bg-white rt-3 pv-3'>
      <Space>
        <Row justify='center'><Text size={5}>选择银行卡</Text></Row>
        <Column style={{ height: px(600) }}>
          <ScrollView>
            {
              list.map((item, index) => {
                return (
                  <Card
                    margin
                    disableMarginTop={!!index}
                    key={item.id}
                    style={{ backgroundColor: duxappTheme.primaryColor }}
                  >
                    <Space size={36} onClick={() => setId(item.id)}>
                      <Row justify='between' items='center'>
                        <Text color={4} size={5}>
                          {item.bank_name}
                        </Text>
                        <DuxuiIcon name={id === item.id ? 'roundcheckfill' : 'roundcheck'} className='text-c4' size={42} />
                      </Row>
                      <Space size={48} row justify='start' items='center'>
                        <Text color={4} size={5}>****</Text>
                        <Text color={4} size={5}>****</Text>
                        <Text color={4} size={5}>****</Text>
                        <Text color={4} size={5}>{item.no.substring(item.no.length - 4)}</Text>
                      </Space>
                    </Space>
                  </Card>
                )
              })
            }
          </ScrollView>
        </Column>
      </Space>
      <Card shadow={false} radius={0} >
        <Button type='primary' size='l' radiusType='round' onClick={() => id && onSubmit(id)}>确定</Button>
      </Card>
    </Column>
  </PullView>
}

CardList.get = async () => {
  const list = await request({
    url: 'member/card',
    data: { type: 2 }
  })
  if (!list.length) {
    const status = await confirm({
      content: '你尚未添加提现卡是否立即去添加'
    })
    status && nav('duxcmsAccount/card/add')
    throw '去添加银行卡'
  }
  return new Promise((resolve, reject) => {
    const { remove } = TopView.add([CardList, {
      list,
      onSubmit: val => {
        remove()
        resolve(val)
      },
      onClose: () => {
        remove()
        reject('取消选择')
      }
    }])
  })
}
