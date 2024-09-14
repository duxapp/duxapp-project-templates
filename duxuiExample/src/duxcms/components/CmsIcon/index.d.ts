import { ComponentType, Component, CSSProperties } from 'react'

interface names {
  'signboard'
  'add-cart'
  'remind'
  'tongguan'
  'CurrencyConverter-fill'
  'comments-fill'
  'order_def_fill'
  'package_box_fill'
  'package_check_fill'
  'package_arrow_fill'
  'package_address_fill'
  'package_transportation_fill'
  'op_close_fill'
  'promot_tips'
  'help_FAQ'
  'copy'
  'editor'
  'download'
  'good'
  'namecard'
  'map'
  'QRcode1'
  'scanning'
  'service'
  'set'
  'store'
  'creditcard'
  'good-fill'
  'map1'
  'collection'
  'collection-fill'
  'add-select'
  'sami-select'
  'comments'
  'navigation_fill'
  'direction_right'
  'direction_down'
  'direction_up'
  'search'
  'ashbin'
  'a-Eyevision'
  'wechat'
  'phone-fill'
  'tabBar_car_fill'
  'tabbar_home_fill'
  'tabbar_home_nor'
  'tabBar_mine_fill'
  'tabbar_sort_fill'
  'tabBar_car_nor'
  'tabbar_sort_nor'
  'tabBar_mine_nor'
  'share_02'
  'sales_center'
  'share_03'
  'arrow_double_up'
  'op_close'
  'weixin'
  'zhifubao'
  'guanbi1'
  'you2'
  'qianbao'
  'yinhangqia'
  'danxuan-weixuan'
  'fuhao-zhuangtai-chenggong'
  'yinlian'
  'pay-fill'
}

interface CmsIconProps {
  /** 图标名称 */
  name?: keyof names
  /**
   * 图标颜色
   */
  color?: string
  /**
   * 图标尺寸
   */
  size?: number,
  /**
   * class
   */
  className: string,
  /**
   * 样式
   */
  style: CSSProperties,
  /**
   * 点击事件
   * @returns
   */
  onClick: () => void
}

/**
 * CmsIcon 图标库
 */
export class CmsIcon extends Component<CmsIconProps> {

}
