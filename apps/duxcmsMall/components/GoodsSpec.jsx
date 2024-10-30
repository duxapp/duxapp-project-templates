import { Column, Image, PullView, Row, Text, px, TopView, toast, Button, contextState, nav, duxappTheme, ScrollView, useRoute } from '@/duxui'
import { Price as OrderPrice, directBuy, orderCreate, cart as cartDefault, NumInput } from '@/duxcmsOrder'
import { useCallback, useMemo, useState, cloneElement } from 'react'
import { Spec } from './Spec'
import { mallHook } from '../utils'

export const GoodsSpec = ({
  data,
  cart = cartDefault,
  mallType,
  spec,
  sku,
  value,
  image,
  minPrice,
  maxPrice,
  store,
  showBuy,
  onBuy,
  showCart,
  setData,
  onClose,
  Price = OrderPrice
}) => {

  const { params } = useRoute()

  const [skuId, setSkuId] = useState(value)

  const [qty, setQty] = useState(1)

  const [currentImage, setCurrentImage] = useState(image)

  const item = sku.find(v => v.id === skuId)

  useMemo(() => {
    setData?.(old => ({ ...old, selectSku: item }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  const add = useCallback(() => {
    if (!skuId) {
      return toast('请选择规格')
    }
    onClose()
    cart.add(skuId, qty, params.mallType || mallType)
  }, [cart, mallType, onClose, params.mallType, qty, skuId])

  const buy = useCallback(async () => {
    if (!skuId) {
      return toast('请选择规格')
    }
    onClose()

    if (onBuy) {
      onBuy(skuId, qty)
      return
    }
    await directBuy.init(skuId, qty, params.mallType || mallType)
    await orderCreate.setCart(directBuy)
    nav('duxcmsOrder/order/create')
  }, [mallType, onBuy, onClose, params.mallType, qty, skuId])

  return <PullView onClose={onClose}>
    <Column className='rt-3 p-3 gap-3' style={{ backgroundColor: duxappTheme.pageColor }}>
      <Row items='center' className='gap-2'>
        <Image preview src={currentImage} square style={{ width: px(160) }} className='r-2' />
        <Column className='gap-2'>
          <mallHook.Render mark='GoodsSpec.price' option={{ data, item, minPrice, maxPrice }}>
            {
              item?.price ?
                <Price bold size={48} unitSize={1} pointSize={1}>{item.price}</Price> :
                <Row className='gap-1'>
                  <Price bold size={48} unitSize={1} pointSize={1}>{minPrice}</Price>
                  {minPrice !== maxPrice && <Text size={7} type='danger' bold>-</Text>}
                  {minPrice !== maxPrice && <Price bold size={48} unit='' pointSize={1}>{maxPrice}</Price>}
                </Row>
            }
          </mallHook.Render>
          <mallHook.Render mark='GoodsSpec.store' option={{ data, item, store }}>
            <Text size={1} color={2}>库存: {item?.store ?? store}</Text>
          </mallHook.Render>
        </Column>
      </Row>
      <Column style={{ height: px(800) }}>
        <ScrollView>
          <Column className='gap-3 bg-white r-2 p-3'>
            <Spec spec={spec} sku={sku} value={skuId} image={image} filterStore onChange={setSkuId} onImageChange={setCurrentImage} />
            <Row items='center' justify='between' className={spec.length ? 'mt-3' : ''}>
              <Text size={2}>数量</Text>
              <NumInput value={qty} onChange={setQty} max={item?.store ?? store} />
            </Row>
          </Column>
        </ScrollView>
      </Column>
      <mallHook.Render mark='GoodsSpec.btns' option={{ data, showCart, showBuy, buy, add, qty }}>
        <Row className='gap-3'>
          {showCart && <Button type='secondary' className='flex-grow' size='l' radiusType='round' onClick={add}>加入购物车</Button>}
          {showBuy && <mallHook.Render mark='GoodsSpec.btns.buy' option={{ data, showCart, showBuy, buy, add, qty }}>
            <Button type='primary' className='flex-grow' size='l' radiusType='round' onClick={buy}>{typeof showBuy === 'string' ? showBuy : '立即购买'}</Button>
          </mallHook.Render>
          }
        </Row>
      </mallHook.Render>
    </Column>
  </PullView>
}

const GoodsSpecButton = ({
  cart,
  type,
  children
}) => {

  const data = contextState.useState()

  return cloneElement(children, { onClick: () => show(data, type, cart) })
}

GoodsSpec.Button = GoodsSpecButton

const show = ([data, setData], type, cart) => {
  if (!data.id) {
    return toast('请传入数据')
  }
  const { remove } = TopView.add([
    GoodsSpec,
    {
      data,
      cart,
      spec: data.spec,
      sku: data.sku,
      store: data.store,
      minPrice: data.min_price,
      maxPrice: data.max_price,
      image: data.images[0],
      onClose: () => remove(),
      value: data.selectSku?.id,
      setData,
      showBuy: !type || type === 'buy',
      showCart: !type || type === 'cart'
    }
  ])
}
