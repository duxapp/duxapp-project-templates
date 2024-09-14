import { Row, Text, Column, ScrollView, Divider, Button, TopView, Header, Image, route, px, Form, PickerSelect, Radio, useRoute, Input, UploadImages, Textarea, loading, Checkbox, toast } from '@/duxui'
import { Price, useRequest, contextState, request, NumInput, orderHook } from '@/duxcmsOrder'
import { useCallback, useEffect, useRef } from 'react'

export default function RefundCreate() {

  const { params } = useRoute()

  const form = useRef()

  const [data] = useRequest({
    url: `order/refund/${params.id}/preview`,
    toast: true
  })

  useEffect(() => {
    if (data.length) {
      form.current.setValue('data', Object.fromEntries(data.map(item => {
        return [item.id, { num: item.goods_num }]
      })))
    }
  }, [data])

  const submit = useCallback(async _data => {
    const arr = Object.keys(_data.data || {}).filter(key => _data.data[key].checked).map(key => [key, _data.data[key]])
    if (!arr.length) {
      return toast('请选择售后商品')
    }

    await request({
      url: `order/refund/${params.id}`,
      loading,
      toast: true,
      data: {
        ..._data,
        data: Object.fromEntries(arr)
      },
      method: 'POST'
    })
    route.redirect('duxcmsOrder/refund/list')
  }, [params.id])

  return <TopView>
    <Header title='售后提交' />
    <contextState.Provider value={{ data }}>
      <Form direction='horizontal' labelProps={{ bold: true }} onSubmit={submit} ref={form}>
        <ScrollView>
          <Form.Item field='type'>
            <TypeForm />
          </Form.Item>
          <Goods />
          <Column className='mh-3 mt-3 bg-white r-2 ph-3'>
            <Form.Item label='售后原因' field='cause'>
              <PickerSelect grow range={data._meta?.cause} title='售后原因' placeholder='请选择' />
            </Form.Item>
            <Form.Item label='退款运费' field='delivery_price'>
              <Input grow align='right' placeholder='请输入退款金额' type='digit' />
            </Form.Item>
            <Text size={1} color={2}>可退邮费金额：￥{data._meta?.delivery_price}</Text>
            <Form.Item direction='vertical' label='上传凭证' field='images'>
              <UploadImages max={6} />
            </Form.Item>
            <Form.Item direction='vertical' label='售后原因' field='content'>
              <Textarea placeholder='请输入售后原因' />
            </Form.Item>
          </Column>
        </ScrollView>
        <Column className='p-3 bg-white'>
          <Form.Submit>
            <Button size='l' type='primary'>提交售后</Button>
          </Form.Submit>
        </Column>
      </Form>
    </contextState.Provider>
  </TopView>
}

const Goods = () => {
  const [{ data }] = contextState.useState()

  return <Form.Item field='data'>
    <Form.Object>
      {
        data.map?.(item => <GoodsItem key={item.id} item={item} />)
      }
    </Form.Object>
  </Form.Item>
}

const GoodsItem = ({ item }) => {
  return <Column className='mh-3 mt-3 bg-white r-2 p-3'>
    <Form.Item field={item.id}>
      <Form.Object>
        <Form.Item field='checked'>
          <GoodsItemChecked item={item} />
        </Form.Item>
        <Form.Item field='checked'>
          {({ value }) => {
            if (!value) {
              return
            }
            return <>
              <Divider className='mt-3' />
              <orderHook.Render mark='refund.create.item.input' option={{ item }}>
                <Form.Item label='退款金额' field='price'>
                  <Input grow align='right' placeholder='请输入退款金额' type='digit' />
                </Form.Item>
                <Form.Item label='退款数量' field='num' containerProps={{ justify: 'between' }}>
                  <NumInput max={item.goods_num} />
                  {/* <Input grow align='right' placeholder='请输入退款数量' type='number' /> */}
                </Form.Item>
              </orderHook.Render>
            </>
          }}
        </Form.Item>

      </Form.Object>
    </Form.Item>
  </Column>
}

const GoodsItemChecked = ({ item, value, onChange }) => {
  return <Row className='gap-3' items='center' onClick={() => onChange(!value)}>

    <Checkbox checked={!!value} />
    <Image src={item.goods_image} className='r-2' square style={{ width: px(160) }} />
    <Column grow justify='between' self='stretch' className='pv-1 overflow-hidden'>
      <Row items='center' justify='between'>
        <Text bold size={2} numberOfLines={1} grow>{item.goods_name}</Text>
        <Price color={1} bold size={2}>{item.goods_price}</Price>
      </Row>
      <Row items='center' justify='between'>
        <Text size={2} color={3} numberOfLines={1}>{item.goods_spec}</Text>
        <Text bold size={2} color={2}>x{item.goods_num}</Text>
      </Row>
    </Column>
  </Row>
}

const TypeForm = ({ value, onChange }) => {
  return <Column className='gap-3 r-2 bg-white mh-3 mt-3 p-3'>
    {
      typeList.map(item => {
        return <Row key={item.name} className='gap-3' items='center' onClick={() => onChange(item.value)}>
          <Radio checked={value === item.value} />
          <Column className='gap-1'>
            <Text bold>{item.name}</Text>
            <Text size={1} color={3}>{item.desc}</Text>
          </Column>
        </Row>
      })
    }
  </Column>
}

const typeList = [
  { name: '退款（无需退货）', value: 0, desc: '没收到货，或与卖家协商同意不用退货只退款' },
  { name: '退货退款', value: 1, desc: '已收到货，需要您寄回已收到的货物' }
]
