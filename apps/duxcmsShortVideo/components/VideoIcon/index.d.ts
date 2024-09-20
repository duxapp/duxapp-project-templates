import { ComponentType, Component, CSSProperties } from 'react'

interface names {
  'comments'
  'favorites'
  'share_01'
  'man-male'
  'woman-female'
  'ashbin'
  'package_product'
  'xihuan'
  'bofang1'
  'xinxi'
  'ellipsis'
  'collection'
  'writing1'
  'share_01_fill'
  'wechat-fill'
  'download02-fill'
  'danger'
}

interface VideoIconProps {
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
 * VideoIcon 图标库
 */
export class VideoIcon extends Component<VideoIconProps> {

}
