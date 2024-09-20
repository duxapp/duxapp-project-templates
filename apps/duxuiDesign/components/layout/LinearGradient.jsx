import { getStyleForm } from '@/design/Design'

export const LinearGradient = {
  name: '渐变',
  tag: 'LinearGradient',
  icon: ['duxui-design', 'linear-gradient'],
  cate: '布局',
  import: '@/duxui',
  attr: () => {
    return {
      useAngle: true,
      colors: ['#666', '#f2f2f2']
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
      angle: {
        name: '角度',
        type: 'number'
      },
      colors: {
        __array: {
          name: '颜色',
          max: 2,
          min: 2
        },
        type: 'color'
      }
    }
  },
  child: {}
}
