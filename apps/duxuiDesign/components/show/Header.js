import { getStyleForm } from '@/duxappDesign/Design'

export const Header = {
  name: '头部导航',
  tag: 'Header',
  icon: ['duxui-design', 'header'],
  cate: '展示',
  import: '@/duxui',
  attr: () => {
    return {
      title: '页面'
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
      title: {
        name: '标题',
        type: 'text'
      },
      navTitle: {
        name: 'h5端显示在头部的标题',
        type: 'text',
        desc: '默认等于标题'
      },
      color: {
        name: '手动指定文本颜色',
        type: 'color',
        desc: '一般不需要设置'
      },
      absolute: {
        name: '让头部悬浮',
        type: 'switch',
        desc: '设置属性后，其他元素能放置在此元素底部'
      },
      renderMain: {
        name: '标题部分',
        type: 'node',
      },
      renderHeader: {
        name: '头部',
        type: 'node',
      },
      renderRight: {
        name: '头部右侧',
        type: 'node',
      }
    }
  }
}
