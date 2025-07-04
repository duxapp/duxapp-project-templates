import { getStyleForm } from '@/duxappDesign/Design'

export const ScrollView = {
  name: '垂直滚动',
  tag: 'ScrollView',
  icon: ['duxui-design', 'scroll-view'],
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
          'size', 'margin',
          'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      flip: {
        name: '180翻转内容',
        type: 'switch'
      },

    }
  },
  child: {}
}

export const ScrollViewHorizontal = {
  name: '水平滚动',
  tag: 'ScrollViewHorizontal',
  icon: ['duxui-design', 'scroll-view-horizontal'],
  cate: '布局',
  import: {
    path: '@/duxui',
    name: 'ScrollView',
    tag: 'ScrollView.Horizontal'
  },
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
          'size', 'margin',
          'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      }
    }
  },
  child: {}
}

export const ScrollViewManage = {
  name: '滚动管理器',
  tag: 'ScrollViewManage',
  icon: ['duxui-design', 'scrollView-manage'],
  cate: '布局',
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {

    }
  },
  child: {
    disable: {
      // 组件
      comp: ['ScrollView'],
      // 组件判断是否是包含这些组件还是不包含这些组件
      contain: true,
    },
    max: 1
  }
}
