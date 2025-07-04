import { getStyleForm } from '@/duxappDesign/Design'

export const Loading = {
  name: '加载中',
  tag: 'Loading',
  icon: ['duxui-design', 'loading'],
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
          'flexParent', 'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      color: {
        name: '颜色',
        type: 'radio',
        props: {
          options: [
            { name: '深色', value: 'dark' },
            { name: '浅色', value: 'blank' }
          ]
        }
      },
      size: {
        name: '尺寸',
        type: 'size'
      }
    }
  }
}
