import { getStyleForm } from '@/design/Design'

export const Grid = {
  name: '宫格布局',
  tag: 'Grid',
  icon: ['duxui-design', 'grid'],
  cate: '布局',
  import: '@/duxui',
  attr: () => {
    return {
      column: 4
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
          'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      itemStyle: {
        __object: {
          tab: {
            name: '项目样式'
          }
        },
        ...getStyleForm(
          'size', 'padding', 'margin',
          'borderRadius', 'border',
          'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      column: {
        name: '每行列',
        type: 'number'
      },
      square: {
        name: '正方形',
        type: 'switch'
      },
      gap: {
        name: '间距',
        type: 'number'
      },
      rowGap: {
        name: '横向间距',
        type: 'number'
      },
      columnGap: {
        name: '竖向间距',
        type: 'number'
      }
    }
  },
  child: {}
}
