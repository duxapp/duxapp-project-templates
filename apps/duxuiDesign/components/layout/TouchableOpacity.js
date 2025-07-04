import { getStyleForm } from '@/duxappDesign/Design'

export const TouchableOpacity = {
  name: '触摸反馈',
  tag: 'TouchableOpacity',
  icon: ['duxui-design', 'touchable-opacity'],
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
      activeOpacity: {
        name: '不透明度(0-1)',
        type: 'number'
      }
    }
  },
  child: {}
}
