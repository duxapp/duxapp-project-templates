import { getStyleForm } from '@/duxappDesign/Design'

export const Badge = {
  name: '角标',
  tag: 'Badge',
  icon: ['duxui-design', 'badge'],
  cate: '展示',
  import: '@/duxui',
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {
      count: {
        name: '显示数量',
        type: 'number',
      },
      dot: {
        name: '是否显示为点状',
        type: 'switch',
      },
      color: {
        name: '颜色',
        type: 'color',
      },
      outside: {
        name: '是否显示在外侧',
        type: 'switch',
      },
      text: {
        name: '自定义显示内容',
        type: 'text',
      },
      maxCount: {
        name: '最大显示数量',
        type: 'number',
      },
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
      }
    }
  },
  child: {

  }
}
