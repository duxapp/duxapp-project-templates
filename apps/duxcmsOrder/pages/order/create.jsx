import { Row, Text, Column, ScrollView, Divider, Button, TopView, Header, Image, route, px, Form, PickerSelect, InputSearch, toast, PickerDate, FormItem, FormObject } from '@/duxui'
import { duxappTheme, CmsIcon, NumInput, orderCreate, Price, orderHook } from '@/duxcmsOrder'
import { useCallback, useEffect, useMemo, useRef } from 'react'

export default function OrderCreate() {

  useEffect(() => {
    orderCreate.paramsInit()
    orderCreate.getData()
  }, [])

  const { address, data, submitStatus, ...total } = orderCreate.useData()

  const form = useRef(null)

  const defaultData = useMemo(() => {
    return {
      action: Object.fromEntries(data.map(item => [item.key, item.params]))
    }
  }, [data])

  useEffect(() => {
    if (JSON.stringify(form.current.values) !== JSON.stringify(defaultData)) {
      form.current.setValues(defaultData)
    }
  }, [defaultData])

  const change = useCallback(_data => {
    orderCreate.submitParams = _data.action
    orderCreate.getData()
  }, [])

  const submit = useCallback(async () => {
    try {
      if (!orderCreate.data.address?.id && !orderCreate.addressId) {
        return toast('请选择收货地址')
      }
      await orderCreate.submit()
      route.redirect('duxcmsOrder/order/list', { _source: 'order-create-success' })
    } catch (error) {
      toast(error?.message || error)
      setTimeout(() => route.redirect('duxcmsOrder/order/list', { _source: 'order-create-error' }), 800)
    }
  }, [])

  return <TopView>
    <Header title='提交订单' />
    <Form labelProps={{ bold: true }} key={data.length} ref={form} onChange={change} defaultValues={defaultData}>
      <ScrollView>
        <orderHook.Render mark='order.create.address' option={{ address, data, submitStatus, ...total }}>
          <Row className='p-3 r-2 mh-3 mt-3 bg-white gap-3' items='center' onClick={orderCreate.selectAddress}>
            <Column grow className='gap-2 overflow-hidden'>
              <Row className='gap-2' items='center'>
                <Column
                  style={{ width: px(48), height: px(48), backgroundColor: duxappTheme.primaryColor }}
                  className=' r-max'
                  items='center'
                  justify='center'
                >
                  <CmsIcon name='map' size={40} color='#fff' />
                </Column>
                <Text bold>{address.name || '去添加收货地址'}  {address.tel}</Text>
              </Row>
              {!!address.province && <Text style={{ marginLeft: px(60) }} color={2} numberOfLines={1}>{address.province}{address.city}{address.region}{address.street}{address.address}</Text>}
            </Column>
            <CmsIcon name='direction_right' color={duxappTheme.textColor2} size={32} />
          </Row>
        </orderHook.Render>
        <orderHook.Render mark='order.create.data' option={{ address, data, submitStatus, ...total }}>
          <FormItem field='action'>
            <FormObject>
              {
                data.map((store, storeIndex) => <orderHook.Render key={storeIndex} mark='order.create.data.store' option={{ store, storeIndex }}>
                  <Column className='ph-3 mt-3 mh-3 r-2 bg-white'>
                    <orderHook.Render mark='order.create.data.goods' option={{ store, storeIndex }}>
                      {
                        store.items?.map(goods => <orderHook.Render key={goods.id}
                          mark='order.create.data.goods.item'
                          option={{ store, storeIndex, goods }}
                        >
                          <Row className='gap-3 pv-3'>
                            <Image src={goods.image} className='r-2' style={{ width: px(160) }} square />
                            <Column grow className='pv1 gap-1 overflow-hidden'>
                              <Text bold numberOfLines={1}>{goods.name}</Text>
                              <Column grow>
                                <Text size={1} color={3}>{goods.spec?.join?.(' ')}</Text>
                              </Column>
                              <Row items='center' justify='between'>
                                <Price size={4} type='danger' bold>{goods.price}</Price>
                                <NumInput value={goods.qty} onChange={qty => orderCreate.editQty(goods.id, qty)} />
                              </Row>
                            </Column>
                          </Row>
                        </orderHook.Render>)
                      }
                    </orderHook.Render>
                  </Column>
                  <Column className='ph-3 mt-3 mh-3 r-2 bg-white'>
                    <FormItem field={store.key}>
                      <FormObject>
                        <orderHook.Render mark='order.create.data.action' option={{ store, storeIndex }}>
                          {
                            store.action.map((item, index) => {
                              return <orderHook.Render key={item.field} mark='order.create.data.action.item' option={{ store, storeIndex, item, index }}>
                                {!!index && <Divider padding={0} />}
                                <FormItem field={item.field} label={item.name}>
                                  {
                                    item.type === 'select' ?
                                      <PickerSelect
                                        range={item.data}
                                        title={'选择' + item.name}
                                        placeholder='请选择'
                                        grow
                                      /> : item.type === 'text' ?
                                        <InputSearch align='right' grow placeholder={'请输入' + item.name} /> :
                                        item.type === 'date' ?
                                          <PickerDate mode='date'
                                            grow
                                            title={item.name}
                                            placeholder={'请选择' + item.name}
                                          /> :
                                          item.type === 'content' ?
                                            <Text align='right' grow>{item.value}</Text>
                                            : null
                                  }
                                </FormItem>
                              </orderHook.Render>
                            })
                          }
                        </orderHook.Render>
                      </FormObject>
                    </FormItem>
                  </Column>
                  <Column className='p-3 mt-3 mh-3 r-2 bg-white gap-3'>
                    <orderHook.Render mark='order.create.data.total' option={{ store, storeIndex, total }}>
                      <Row items='center' justify='between'>
                        <Text bold>商品金额</Text>
                        <Price color={2}>{store.total.order_price}</Price>
                      </Row>
                      <Row items='center' justify='between'>
                        <Text bold>运费</Text>
                        <Price color={2}>{store.total.delivery_price}</Price>
                      </Row>
                      {
                        store.premium?.map(item => <Row key={item.type} items='center' justify='between'>
                          <Text bold>{item.name}</Text>
                          <Price color={2}>{item.price}</Price>
                        </Row>)
                      }
                      {
                        store.discount?.map(item => <Row key={item.type} items='center' justify='between'>
                          <Text bold>{item.name}</Text>
                          <Price type='danger'>{-item.price}</Price>
                        </Row>)
                      }
                      {+store.total.discount_price > 0 && <Row items='center' justify='between'>
                        <Text bold>总优惠</Text>
                        <Price type='danger'>{-store.total.discount_price}</Price>
                      </Row>}
                    </orderHook.Render>
                  </Column>
                </orderHook.Render>)
              }
            </FormObject>
          </FormItem>
        </orderHook.Render>
        <Column className='pv-2' />
      </ScrollView>
      <orderHook.Render mark='order.create.bottom' option={{ submit }}>
        <Row className='ph-3 pv-2 bg-white' justify='between' items='center'>
          <Price type='danger' bold size={54} pointSize={3} unitSize={3}>{total.pay_price}</Price>
          <orderHook.Render mark='order.create.bottom.submit' option={{ address, data, submitStatus, ...total, submit }}>
            <Button size='l' type='primary' style={{ width: px(240) }} onClick={submit}>提交订单</Button>
          </orderHook.Render>
        </Row>
      </orderHook.Render>
    </Form>
  </TopView>
}
