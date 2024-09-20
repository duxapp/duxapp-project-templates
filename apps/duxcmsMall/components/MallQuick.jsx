import { ScrollView, Header, Row, nav, Column, px, Text, duxappTheme, Tab, Image, Empty, Button, Badge, Divider, stopPropagation, PullView } from '@/duxui'
import { CartManage, CmsIcon, HeaderSearch, List, NumInput, Price, orderCreate, usePageData, contextState } from '@/duxcmsOrder'
import { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import sort from './images/sort.png'

export const MallQuick = () => {

  useEffect(() => {
    quickCart.init()
  }, [])

  const [category] = usePageData(`mall/class`)

  const [select, setSelect] = useState(0)

  const selectItem = category[select]

  const cartData = quickCart.useCart()

  return <>
    <Header
      renderHeader={<Row className='h-full'>
        <Header.Back />
        <HeaderSearch placeholder='搜索商品' className='m-1' disabled onClick={() => nav('duxcmsMall/quick/search', { search: 1 })} />
      </Row>}
    />
    <contextState.Provider value={cartData}>
      <Row grow>
        <Column shrink style={{ width: px(200) }} className='bg-white'>
          <ScrollView>
            {
              category.map((item, index) => {
                const isSelect = select === index
                return <Row
                  key={item.id}
                  items='center'
                  onClick={() => setSelect(index)}
                  style={{
                    height: px(100),
                    backgroundColor: isSelect ? duxappTheme.pageColor : '#fff'
                  }}
                >
                  <Column className='absolute left-0' style={{ width: px(8), height: px(60), top: px(20), backgroundColor: isSelect ? duxappTheme.primaryColor : '#fff' }} />
                  <Text grow align='center'>{item.name}</Text>
                </Row>
              })
            }
          </ScrollView>
        </Column>
        {selectItem && <Malls key={selectItem.id} category={selectItem} />}
      </Row>
      <Divider padding={0} />
      <Footer />
    </contextState.Provider>
  </>
}

const Footer = () => {

  const [{ data, num, amount }] = contextState.useState()

  const showData = data.map(store => store.items).flat()

  const [show, setShow] = useState(false)

  const submit = useCallback(() => {
    orderCreate.setCart(quickCart)
    nav('duxcmsOrder/order/create')
  }, [])

  return <>
    <Row className='items-center justify-between bg-white ph-3' style={{ height: px(100) }}>
      <Row items='center' className='gap-3' onClick={() => setShow(!show)}>
        <Badge count={+num}>
          <CmsIcon name='tabBar_car_nor' size={58} color={duxappTheme.primaryColor} />
        </Badge>
        <Price>{amount}</Price>
      </Row>
      {/* <Text size={6} grow type='primary'><Text color={1} size={1}>合计：</Text><Price>{amount}</Price></Text> */}
      <Button size='l' type='primary' onClick={submit} disabled={!num}>立即购买</Button>
      {show && <Column
        className='absolute left-0 right-0 z-1' justify='end'
        style={{ bottom: px(100), top: px(-3000), backgroundColor: 'rgba(0,0,0,0.5)' }}
        onClick={() => setShow(false)}
      >
        <Column className='rt-3 overflow-hidden' style={{ height: px(1050), backgroundColor: duxappTheme.pageColor }} onClick={stopPropagation}>
          <Row className='p-3 bg-white' items='center' justify='between'>
            <CmsIcon name='op_close' size={48} color='#fff' />
            <Text bold>购物车</Text>
            <CmsIcon name='op_close' size={48} onClick={() => setShow(false)} color={duxappTheme.textColor1} />
          </Row>
          <ScrollView>
            {
              showData.map(item => <CartItem key={item.id} item={item} type='cart' />)
            }
            {
              !showData.length && <Empty title='暂无商品' />
            }
            <Column className='p-2' />
          </ScrollView>
        </Column>
      </Column>}
    </Row>
  </>
}

const CartItem = ({ item }) => {

  return <Row className='gap-2 bg-white r-2 mh-3 p-3 mt-3' onClick={() => nav('duxcmsMall/goods/detail?id=' + item.id)}>
    <Image src={item.image} style={{ width: px(150) }} square className='r-2' />
    <Column grow className='overflow-hidden pv-1' justify='between'>
      <Text size={2} bold numberOfLines={1}>{item.name}</Text>
      <Text size={1} color={3} numberOfLines={1}>{item.spec}</Text>
      <Row items='center' justify='between' className='gap-1'>
        <Price size={4} unitSize={1}>{item.price}</Price>
        <NumInput value={item.qty} onDelete={() => quickCart.del(item.id)} onChange={val => quickCart.edit(item.id, val)} />
      </Row>
    </Column>
  </Row>
}

const Malls = ({ category }) => {

  const [select, setSelect] = useState(0)

  const [order, setOrder] = useState('')

  return <Column style={{ width: px(550) }} className='gap-3'>
    {
      category.children.length > 0 && <Tab value={select} onChange={setSelect} scroll type='button' buttonRound className='mt-1'>
        <Tab.Item paneKey={0} title='全部' />
        {
          category.children.map(item => <Tab.Item key={item.id} paneKey={item.id} title={item.name} />)
        }
      </Tab>
    }
    <Row items='center' className='gap-3 mh-3 mt-3'>
      <Text size={1} bold grow>全部</Text>
      <Row items='center' onClick={() => setOrder(order === 'sale' ? '' : 'sale')}>
        <Text size={1} {...order === 'sale' ? { type: 'primary' } : {}}>销量</Text>
        <Image src={sort} style={{ width: px(32) }} square />
      </Row>
      <Row items='center' onClick={() => setOrder(order === 'price' ? '' : 'price')}>
        <Text size={1} {...order === 'price' ? { type: 'primary' } : {}}>价格</Text>
        <Image src={sort} style={{ width: px(32) }} square />
      </Row>
    </Row>
    <List
      url={`mall/mall?class=${select || category.id}`}
      renderItem={QuickMallItem}
      renderEmpty={<Empty title='此分类暂无商品' />}
      data={{
        ...(order === 'price' ?
          { price_order: 'asc' } :
          order === 'sale' ?
            { order: 'sale' } : {})
      }}
    />
  </Column>
}

export const QuickMallItem = ({ item, index }) => {

  const [{ data, search }] = contextState.useState()

  const cartItems = data.map(store => store.items).flat().filter(v => v.has_id === item.id)

  const cartItem = cartItems[0]

  const count = cartItems.reduce((prev, current) => prev + current.qty, 0)

  const [show, setShow] = useState(false)

  return <Row className={classNames('gap-2 bg-white r-2 mh-3 p-3', (index || search) && 'mt-3')} onClick={() => nav('duxcmsMall/goods/detail?id=' + item.id)}>
    <Image src={item.images?.[0]} style={{ width: px(150) }} square className='r-2' />
    <Column grow className='pv-1 w-0' justify='between'>
      <Column className='gap-1 w-full'>
        <Text size={2} bold numberOfLines={item.activity ? 1 : 2}>{item.title}</Text>
        {!!item.activity && <Text size={1} color={3} numberOfLines={1}>{item.activity}</Text>}
      </Column>
      <Row items='center' justify='between' className='gap-1'>
        <Price size={4} unitSize={1}>{item.sell_price}</Price>
        {
          item.skus.length > 1 ?
            <Badge count={count}>
              <Button size='s' type='primary'
                onClick={e => {
                  stopPropagation(e)
                  setShow(true)
                }}
              >选规格</Button>
            </Badge> : !cartItems.length ?
              <Button size='s' type='primary'
                onClick={e => {
                  stopPropagation(e)
                  quickCart.add(item.skus[0].id, 1)
                }}
              >加购</Button> :
              <NumInput value={cartItem?.qty}
                onChange={val => quickCart.edit(cartItem.id, val)}
                onDelete={() => quickCart.del(cartItem.id)}
              />
        }
      </Row>
    </Column>
    {show && <PullView onClose={() => setShow(false)}>
      <Column className='rt-3 p-3 gap-3' style={{ backgroundColor: duxappTheme.pageColor }}>
        <Row items='center' className='gap-2'>
          <Image preview src={item.images?.[0]} square style={{ width: px(160) }} className='r-2' />
          <Column className='gap-2'>
            <Row className='gap-1'>
              <Price bold size={48} unitSize={1} pointSize={1}>{item.min_price}</Price>
              {item.min_price !== item.max_price && <Text size={7} type='danger' bold>-</Text>}
              {item.min_price !== item.max_price && <Price bold size={48} unit='' pointSize={1}>{item.max_price}</Price>}
            </Row>
            {/* <Text size={1} color={2}>库存: {+item.store}</Text> */}
          </Column>
        </Row>
        <Column style={{ height: px(800) }}>
          <ScrollView>
            {
              item.skus.map((sku, skuIndex) => {
                const cartSkuItem = cartItems.find(v => v.has_sku === sku.id)
                const images = item.spec[0].images
                const imgIndex = images?.length ? item.spec[0].spec.indexOf(sku.spec[0]) : -1
                const image = ~imgIndex ? images?.[imgIndex] : ''
                return <Row className={classNames('gap-3 bg-white r-2 ph-3 pv-2', skuIndex && 'mt-3')} key={sku.id} items='center' justify='between'>
                  {!!images?.length && <Image
                    radiusType='round-min'
                    preview
                    src={image || item.images?.[0]}
                    style={{ width: px(78) }} square
                  />}
                  <Column className='overflow-hidden gap-1' grow>
                    <Text bold numberOfLines={2}>{sku.spec.join(' ')}</Text>
                    <Row className='gap-3' items='center'>
                      <Price size={5} unitSize={1}>{sku.price}</Price>
                      {/* <Text size={1} color={2}>库存：{sku.store}</Text> */}
                    </Row>
                  </Column>
                  {!cartSkuItem ?
                    <Button size='s' type='primary'
                      onClick={e => {
                        stopPropagation(e)
                        quickCart.add(sku.id, 1)
                      }}
                    >加购</Button> :
                    <NumInput
                      value={cartSkuItem?.qty}
                      onChange={qty => {
                        if (cartSkuItem) {
                          quickCart.edit(cartSkuItem.id, qty)
                        } else {
                          quickCart.add(sku.id, 1)
                        }
                      }}
                      onDelete={() => quickCart.del(cartSkuItem.id)}
                      max={sku.store}
                    />
                  }

                </Row>
              })
            }
          </ScrollView>
        </Column>
        <Column className='gap-3'>
          <Button type='primary' size='l' radiusType='round' onClick={() => setShow(false)}>确定</Button>
        </Column>
      </Column>
    </PullView>}
  </Row>
}

export const quickCart = new CartManage('quick')
