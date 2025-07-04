import { getStyleForm } from '@/duxappDesign/Design'

export const BoxShadow = {
  name: '阴影',
  tag: 'BoxShadow',
  icon: ['duxui-design', 'box-shadow'],
  cate: '布局',
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
      color: {
        name: '颜色',
        type: 'color'
      },
      border: {
        name: '阴影尺寸',
        type: 'size'
      },
      opacity: {
        name: '不透明度(0-1)',
        type: 'number',
        props: {
          max: 1,
          min: 0
        }
      },
      x: {
        name: 'x轴偏移量',
        type: 'number'
      },
      y: {
        name: 'y轴偏移量',
        type: 'number'
      }
    }
  },
  child: {}
}
