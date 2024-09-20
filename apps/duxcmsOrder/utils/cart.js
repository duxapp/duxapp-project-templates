import { ObjectManage, request, deepCopy, toast } from '@/duxcms/utils'
import { loading } from '@/duxui'
import { user } from '@/duxcmsAccount'
import { useEffect, useState } from 'react'

export class CartManage extends ObjectManage {
  /**
   * 初始化
   * @param {*} type
   */
  constructor(type = 'default') {
    super({})
    this.config.type = type
  }

  config = {
    type: 'default',
    init: false,
  }

  defaultData = {
    // 购物车金额
    amount: 0,
    // 商品数量
    num: 0,
    // 商品行数
    rows: 0,
    // 商品
    data: [],
  }

  data = deepCopy(this.defaultData)

  request = (url, method, data) => {
    return request({
      url: url + '?type=' + this.config.type,
      method,
      toast: true,
      data,
    })
  }

  init = async () => {
    // if (this.config.init) {
    //   return
    // }
    // this.config.init = true
    await this.getList()
  }

  clearData = () => {
    this.set(deepCopy(this.defaultData))
  }

  reload = async () => {
    if (this.config.init) {
      await this.getList()
    }
  }

  setCartData = data => {
    this.set({
      ...data._meta,
      data,
    })
  }

  /**
   * 获取购物车列表
   * @param {*} keyword
   */
  getList = async (keyword) => {
    const res = await this.request('order/cart', 'GET', { keyword })
    this.setCartData(res)
  }

  /**
   * 添加到购物车 数量累加
   * @param {*} id
   * @param {*} qty
   * @param {*} type
   */
  add = async (id, qty, type = 'mall') => {
    if (!user.isLogin()) {
      await user.login()
    }
    const res = await this.request(`order/cart`, 'POST', { has_type: type, has_sku: id, qty })
    if (this.config.type == 'default') toast('添加成功')
    this.setCartData(res)
  }

  /**
   * 编辑某一项 指定数量
   * @param {*} id
   * @param {*} qty
   */
  edit = async (id, qty) => {
    const res = await this.request(`order/cart/qty`, 'PUT', { id, qty })
    this.setCartData(res)
  }

  /**
   * 选中或者取消选中
   * @param {*} checked 是否选中
   * @param {*} ids sku id
   */
  check = async (checked, ...ids) => {
    const res = await this.request(`order/cart/checked`, 'POST', {
      checked,
      ids,
    })
    this.setCartData(res)
  }

  /**
   * 删除购物车的商品
   * @param {array} ids
   */
  del = async (...ids) => {
    const res = await this.request('order/cart', 'DELETE', { ids })
    this.setCartData(res)
  }
  /**
   * 清空购物车
   */
  clear = async () => {
    await this.request(`order/cart`, 'DELETE')
    this.set(deepCopy(this.defaultData))
  }

  /**
   * 提交购物车结算
   * @param {*} add_id
   * @param {*} params
   */
  submit = async (add_id, params) => {
    await this.request(`order/cart/checkout`, 'POST', {
      add_id,
      params,
    })
    this.reload()
  }

  /**
   * 购物车数据hook
   */
  useCart = () => {
    const [data, setData] = useState(this.data)

    useEffect(() => {
      const { remove } = this.onSet(setData)
      setData(this.data)
      return () => remove()
    }, [])

    return data
  }
}

export const cart = new CartManage()

/**
 * 直接购买
 */
class DirectBuy extends CartManage {
  constructor() {
    super('direct')
  }

  init = async (id, qty, type) => {
    if (!user.isLogin()) {
      await user.login()
    }
    const stop = loading('请稍后')
    try {
      await this.clear()
      await this.add(id, qty, type)
      // await this.getList()
      stop()
    } catch (error) {
      toast(error?.message || error)
      stop()
      throw error
    }
  }
}

export const directBuy = new DirectBuy()
