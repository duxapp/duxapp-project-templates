import { getStyleForm } from '@/design/Design'

export const Link = {
  name: '连接',
  tag: 'Link',
  icon: ['duxui-design', 'link'],
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
      url: {
        name: '跳转连接',
        type: 'link'
      },
      useChildren: {
        name: '使用子元素的点击事件',
        type: 'switch'
      }
    }
  },
  editor: {
    virtual: true
  },
  child: {
    max: 1
  }
}
