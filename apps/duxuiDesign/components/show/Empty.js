import { getStyleForm } from '@/duxappDesign/Design'

export const Empty = {
  name: '空状态',
  tag: 'Empty',
  icon: ['duxui-design', 'empty'],
  cate: '展示',
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
          'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      title: {
        name: '标题',
        type: 'text',
      },
      url: {
        name: '空状态图片',
        type: ['image', 'text'],
      },
      renderFooter: {
        name: '自定义底部',
        type: 'node'
      }
    }
  }
}
