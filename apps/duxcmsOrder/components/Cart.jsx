import { useCallback, useMemo, useState } from 'react'
import { Button, Card, Column, Empty, Header, Radio, Row, ScrollView, Text, nav, stopPropagation, toast } from '@/duxui'
import { cart, orderCreate, orderHook } from '@/duxcmsOrder/utils'
import { AuthLogin, user, Price } from '@/duxcmsAccount'
import { NumInput } from './NumInput'

const cartInit = /*@__PURE__*/ (() => {
  user.onLoginStatus(status => {
    if (status) {
      cart.init()
    } else {
      cart.clearData()
    }
  })
})()

export const Cart = /*@__PURE__*/ (() => {
  const Cart_ = ({ page }) => {

    // 编译优化
    cartInit

    const [edit, setEdit] = useState(false)

    const [, loginStatus] = user.useUserInfo()

    const { data } = cart.useCart()

    const showData = data.map(store => store.items.map(item => ({
      ...item,
      store: { id: store.store_id || 0, name: store.store_name }
    }))).flat()

    return <>
      <Header
        title='购物车'
        navTitle={page ? '购物车' : ''}
        titleCenter={!page}
        renderRight={loginStatus && !!showData.length && <Text onClick={() => setEdit(!edit)}>{edit ? '完成' : '管理'}</Text>}
      />
      <AuthLogin title='登录后查看购物车'>
        <CartContent edit={edit} setEdit={setEdit} data={showData} />
      </AuthLogin>
    </>
  }
  Cart_.types = {}
  Cart_.add = (type, comp) => {
    Cart_.types[type] = comp
  }
  return Cart_
})()

export const CartContent = ({ edit, setEdit, data }) => {

  const [editSelect, { isCheck, choice, setChecks }] = useCheck(10000)

  const total = useMemo(() => {
    return data.reduce((prev, current) => {
      if (current.checked) {
        prev.num += +current.qty
        prev.price += +current.amount
      }
      return prev
    }, {
      num: 0,
      price: 0
    })
  }, [data])

  const checkedAll = useMemo(() => {
    return edit ?
      editSelect.length === data.length :
      data.every(goods => goods.checked)
  }, [edit, editSelect.length, data])

  const checkAll = useCallback(() => {
    if (checkedAll) {
      if (edit) {
        setChecks([])
      } else {
        const ids = data.map(goods => goods.id)
        cart.check(false, ...ids)
      }
    } else {
      if (edit) {
        const ids = data.map(goods => goods.id)
        setChecks(ids)
      } else {
        const ids = data.filter(goods => !goods.checked).map(goods => goods.id)
        cart.check(true, ...ids)
      }
    }

  }, [checkedAll, edit, setChecks, data])

  const submit = useCallback(async () => {
    await orderCreate.setCart(cart)
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
      <orderHook.Render mark='Cart.list' option={{ data, edit, isCheck, choice, GoodsItem }}>
        {
          data.map((item, index) => <GoodsItem
            item={item}
            key={item.id}
            index={index}
            checked={!edit ? item.checked : isCheck(item.id)}
            onCheck={status => {
              edit ? choice(item.id) : cart.check(status, item.id)
            }}
          />)
        }
      </orderHook.Render>
      {
        !data.length && <Empty title='暂无商品' />
      }
    </ScrollView>
    {!!data.length && <Card radius={0} className='flex-row items-center justify-between'>
      <Row className='gap-1' items='center' onClick={checkAll}>
        <Radio checked={checkedAll} />
        <Text color={2} size={2}>全选</Text>
      </Row>
      {!edit && <Text size={6} type='primary'><Text color={1} size={1}>合计：</Text>
        <Price bold unitSize={1} size={6}>{+total.price?.toFixed(2)}</Price>
      </Text>}
      {
        edit ?
          <orderHook.Render mark='Cart.del' option={{ del, total, data }}>
            <Button size='l' type='secondary' onClick={del}>删除</Button>
          </orderHook.Render> :
          <orderHook.Render mark='Cart.submit' option={{ submit, total, data }}>
            <Button size='l' type='primary' onClick={submit} disabled={!total.num}>提交({+total.num || 0})</Button>
          </orderHook.Render>
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

export const GoodsItem = ({
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
