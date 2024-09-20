import { ComponentType, Component, CSSProperties } from 'react'

interface names {
  'tuangouyanquan'
  'navigation_fill'
  'publish_add_fill'
  'icon_24_brush'
  'copy'
  'shafa'
  'inquiry-template'
  'a-creditcard'
  'discounts_redEnvelope1'
  'prompt_i'
  'integral-fill'
  'service'
  'a-rankinglist'
  'store'
  'door'
  'certified-supplier'
  'voice-top'
  'points_deduction'
  'share'
  'survey'
  'sorting_horizontal'
  'a-Customermanagement'
  'direction-down_fill'
  'direction_up-fill'
  'up-down_fill'
  'shuffling-banner'
  'coupons'
  'editor1'
  'discounts_redEnvelope'
  'option'
  'success'
  'search'
  'calendar'
  'map'
  'publish-add_line'
  'fail-close_line'
  'phone'
  'remind'
  'set'
  'scanning'
  'info_promot'
  'discounts_redEnvelope-fill'
  'direction_up'
  'direction_down'
  'store-fill'
  'weixinzhifu'
  'zhifubao'
  'add-select'
  'direction_right'
  'nav-order-fill'
  'nav-order-line'
  'nav-circle-line'
  'nav-circle-fill'
  'nav-mine-fill'
  'nav-mine-line'
  'nav-home-fill'
  'nav-home-line'
  'daohang1'
  'a-meituanyanjuan51'
  'a-meituanyanjuan41'
  'a-meituanyanjuan21'
  'a-meituanyanjuan71'
  'kaimen1'
  'kongfangbeifen1'
  'a-kongfangbeifen21'
  'a-kongfangbeifen3'
  'a-bianzu14'
  'a-bianzu15'
  'a-kaimen2'
  'a-kaimen4'
  'a-kaimen3'
}

interface TestIconProps {
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
 * TestIcon 图标库
 */
export class TestIcon extends Component<TestIconProps> {

}
