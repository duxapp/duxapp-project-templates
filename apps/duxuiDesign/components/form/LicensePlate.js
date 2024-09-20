import { getStyleForm } from '@/design/Design'

export const LicensePlate = {
  name: '车牌号输入',
  tag: 'LicensePlate',
  icon: ['duxui-design', 'license-plate'],
  cate: '表单',
  import: '@/duxui',
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {
      className: {
        name: '类名',
        type: 'className'
      },
      style: {
        __object: true,
        ...getStyleForm(
          'size', 'padding', 'margin',
          'borderRadius', 'border',
          'flexParent', 'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      length: {
        name: '车牌号长度',
        type: 'number'
      }
    }
  }
}
