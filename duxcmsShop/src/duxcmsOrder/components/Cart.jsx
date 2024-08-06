import { useCallback, useMemo, useState } from 'react'
import { Button, Card, Column, Empty, Header, Radio, Row, ScrollView, Text, nav, stopPropagation, toast } from '@/duxui'
import { cart, orderCreate } from '@/duxcmsOrder/utils'
import { AuthLogin, user, Price } from '@/duxcmsAccount'
import { NumInput } from './NumInput'

user.onLoginStatus(status => {
  if (status) {
    cart.init()
  } else {
    cart.clearData()
  }
})

export const Cart = ({ page }) => {

  const [edit, setEdit] = useState(false)

  const [, loginStatus] = user.useUserInfo()

  return <>
    <Header
      title='购物车'
      navTitle={page ? '购物车' : ''}
      titleCenter={!page}
      renderRight={loginStatus && <Text onClick={() => setEdit(!edit)}>{edit ? '完成' : '管理'}</Text>}
    />
    <AuthLogin title='登录后查看购物车'>
      <Content edit={edit} setEdit={setEdit} />
    </AuthLogin>
  </>
}

Cart.types = {}
Cart.add = (type, comp) => {
  Cart.types[type] = comp
}

const Content = ({ edit, setEdit }) => {

  const [editSelect, { isCheck, choice, setChecks }] = useCheck(10000)

  const { data, num, amount } = cart.useCart()

  const showData = data.map(store => store.items).flat()

  const checkedAll = useMemo(() => {
    return edit ?
      editSelect.length === data.reduce((prev, store) => prev + store.items.length, 0) :
      data.every(store => store.items.every(goods => goods.checked))
  }, [data, edit, editSelect.length])

  const checkAll = useCallback(() => {
    if (checkedAll) {
      if (edit) {
        setChecks([])
      } else {
        const ids = data.map(store => store.items.map(goods => goods.id)).flat()
        cart.check(false, ...ids)
      }
    } else {
      if (edit) {
        const ids = data.map(store => store.items.map(goods => goods.id)).flat()
        setChecks(ids)
      } else {
        const ids = data.map(store => store.items.filter(goods => !goods.checked).map(goods => goods.id)).flat()
        cart.check(true, ...ids)
      }
    }

  }, [checkedAll, data, edit, setChecks])

  const submit = useCallback(() => {
    orderCreate.setCart(cart)
    nav('duxcmsOrder/order/create')
  }, [])

  const del = useCallback(async () => {
    if (!editSelect.length) {
      return toast('请选择商品')
    }
    await cart.del(...editSelect)
    setEdit(false)
  }, [editSelect, setEdit])

  return <>
    <ScrollView>
      {
        showData.map((item, index) => <GoodsItem
          item={item}
          key={item.id}
          index={index}
          checked={!edit ? item.checked : isCheck(item.id)}
          onCheck={status => {
            edit ? choice(item.id) : cart.check(status, item.id)
          }}
        />)
      }
      {
        !showData.length && <Empty title='暂无商品' />
      }
    </ScrollView>
    {!!showData.length && <Card radius={0} className='flex-row items-center justify-between'>
      <Row className='gap-1' items='center' onClick={checkAll}>
        <Radio checked={checkedAll} />
        <Text color={2} size={2}>全选</Text>
      </Row>
      {!edit && <Text size={6} type='primary'><Text color={1} size={1}>合计：</Text>
        <Price bold unitSize={1} size={6}>{amount}</Price>
      </Text>}
      {
        edit ?
          <Button size='l' type='secondary' onClick={del}>删除</Button> :
          <Button size='l' type='primary' onClick={submit} disabled={!num}>提交({+num || 0})</Button>
      }
    </Card>}
  </>
}

const useCheck = (max = 99) => {
  const [checks, setChecks] = useState([])

  const isCheck = useCallback(value => {
    return checks.includes(value)
  }, [checks])

  const choice = useCallback(value => {
    setChecks(old => {
      const index = old.indexOf(value)
      if (~index) {
        old.splice(index, 1)
      } else {
        if (old.length >= max) {
          toast('最多选择' + max + '项')
          return old
        }
        old.push(value)
      }
      return [...old]
    })
  }, [max])

  return [
    checks,
    {
      isCheck,
      choice,
      setChecks
    }
  ]
}

const GoodsItem = ({
  item,
  index,
  checked,
  onCheck
}) => {

  const Item = Cart.types[item.has_type]

  if (!Item) {
    return
  }

  return <Row items='center' className='gap-3 mh-3 mt-3'>
    <Radio checked={checked}
      onClick={e => {
        stopPropagation(e)
        onCheck(!checked, item.id)
      }}
    />
    <Column className='r-2 p-3 bg-white overflow-hidden' grow>
      <Item
        item={item}
        index={index}
      />
      <NumInput className='absolute p-3 right-0 bottom-0' value={item.qty} onChange={val => cart.edit(item.id, val)} />
    </Column>
  </Row>
}
