import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { nav, ObjectManage, request } from '@/duxcms/utils'
import { loading, confirm } from '@/duxui'
import { startPay } from '@/duxcmsPay'
import { cart } from './cart'

export class OrderCreate extends ObjectManage {

  data = {
    submitStatus: false,
    address: {},
    data: [],
  }

  // 购物车标记
  currentCart = cart

  // 收货地址id
  addressId = ''

  // 提交接口需要的参数
  submitParams = []

  setCart = (_cart) => {
    this.currentCart = _cart

    this.set({
      ...this.data,
      data: [],
      address: {},
      submitStatus: false
    })
    return this.getData()
  }

  /**
   * 选择收货地址
   */
  selectAddress = async () => {
    const { backData } = await nav('duxcmsOrder/address/list', {
      select: 1,
    })
    const address = await backData()
    if (address?.id) {
      this.addressId = address.id
      this.getData()
    }
  }

  /**
   * 获取订单数据
   */
  getData = async () => {
    try {
      const res = await request({
        url: 'order/cart/checkout?type=' + this.currentCart.config.type,
        toast: true,
        method: 'POST',
        data: {
          add_id: this.addressId,
          params: this.submitParams,
        },
      })
      this.set({ ...this.data, ...res._meta, data: res })
      this.getDataPromise = null
      return await res
    } catch {
      this.getDataPromise = null
    }
  }

  // 接口数据初始化
  paramsInit = () => {
    this.submitParams = []
  }
  /**
   * 编辑商品数量
   * @param {*} id
   * @param {*} qty
   */
  editQty = async (id, qty) => {
    await this.currentCart.edit(id, qty)
    await this.getData()
  }

  /**
   * 提交订单
   */
  submit = async () => {
    if (this.getDataPromise) {
      await this.getDataPromise
    }
    this.set({
      ...this.data,
      submitStatus: true,
    })
    try {
      const { token, price } = await request({
        url: 'order/cart/submit?type=' + this.currentCart.config.type,
        method: 'POST',
        toast: true,
        data: {
          add_id: this.data.address?.id || this.addressId,
          params: this.data.params || this.submitParams,
        },
      })
      if (this.currentCart.config.type == 'direct') {
        // 清空购物车
        this.currentCart.clear()
      } else {
        // 初始化购物车
        this.currentCart.init()
      }
      await startPay({
        price,
        token,
        payList: () => request(`order/pay/type`),
        passwordUrl: 'duxcmsAccount/account/password',
        payUrl: 'order/pay/submit',
        mask: true,
        onType: this.onType
      })
    } catch (error) {
      this.set({
        ...this.data,
        submitStatus: false,
      })
      throw error
    }
  }
}

export const orderCreate = new OrderCreate()

class Order {
  status = {
    0: { name: '交易关闭', icon: 'op_close_fill' },
    1: { name: '待付定金', icon: 'package_box_fill' },
    2: [
      { name: '待付款', icon: 'package_box_fill' },
      { name: '待付款', icon: 'package_box_fill' },
      { name: '待付尾款', icon: 'package_box_fill' }
    ],
    3: { name: '待确认', icon: 'package_arrow_fill' },
    4: { name: '待发货', icon: 'package_address_fill' },
    5: { name: '待收货', icon: 'package_transportation_fill' },
    6: { name: '待完成', icon: 'package_arrow_fill' },
    7: { name: '待评价', icon: 'comments-fill' },
    8: { name: '交易成功', icon: 'package_check_fill' },
  }

  btnStatus = [
    {
      key: 'cancel',
      status: [2, 3],
      statusDeposit: [1, 3],
    },
    {
      key: 'receive',
      status: [5],
    },
    {
      key: 'pay',
      status: [1, 2],
    },
    {
      key: 'express',
      status: [5, 6, 7, 8],
    },
    {
      key: 'refund',
      status: [4, 5, 6, 7],
      statusDeposit: [2, 4, 5, 6, 7],
    },
    {
      key: 'comment',
      status: [7],
    },
  ]

  getStatus = (item) => {
    let status = this.status[item.status]
    if (status instanceof Array) {
      status = status[item.pay_way]
    }
    item.statusData = {
      btns: this.btnStatus
        .filter((btn) => {
          return btn[item.pay_way === 2 && btn.statusDeposit ? 'statusDeposit' : 'status'].includes(item.status)
        })
        .map((btn) => btn.key),
      ...status,
    }
    return item
  }

  getListStatus = (list) => {
    return list.map(this.getStatus)
  }

  /**
   * 支付订单
   * @param {*} id
   * @param {*} payRef pay组件实例
   */
  pay = async (id) => {
    const { token, price } = await request({
      url: `order/order/${id}/pay`,
      loading,
      toast: true,
    })
    await startPay({
      price,
      token,
      payList: () => request(`order/pay/type`),
      passwordUrl: 'duxcmsAccount/account/password',
      payUrl: 'order/pay/submit',
      onType: this.onType
    })
  }

  /**
   * 确认收货
   * @param {*} id
   */
  receive = async (id) => {
    const status = await confirm({
      title: '确认收货',
      content: '请确认已经收到货品',
    })
    if (!status) throw { message: '取消操作' }
    await request({
      url: `order/order/${id}/receive`,
      method: 'POST',
      toast: true,
      loading,
    })
  }

  /**
   * 取消订单
   * @param {*} id
   */
  cancel = async (id) => {
    const status = await confirm({
      title: '取消订单',
      content: '您确定要取消这个订单吗？',
    })
    if (!status) throw { message: '取消操作' }
    await request({
      url: `order/order/${id}/cancel`,
      method: 'POST',
      toast: true,
      loading,
    })
    Taro.showToast({
      title: '取消成功',
    })
  }

  /**
   * 查看物流
   * @param {*} id
   */
  express = (id) => {
    nav('duxcmsOrder/order/express', { id })
  }

  refund = async id => {
    const info = await request({
      url: `order/refund/${id}/preview`,
      toast: true,
      loading,
      repeatTime: 0,
    })
    if (!info.id) {
      nav('duxcmsOrder/refund/create', { id })
    } else {
      // 查看售后
      nav('duxcmsOrder/refund/detail', { id: info.id })
    }
  }

  // 去评价
  comment = id => {
    nav('duxcmsOrder/order/evaluate', { id })
  }
}

export const order = new Order()
