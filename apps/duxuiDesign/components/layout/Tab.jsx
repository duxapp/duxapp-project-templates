import { getStyleForm } from '@/design/Design'
import { Badge } from '../show/Badge'

export const Tab = {
  name: '选项卡',
  tag: 'Tab',
  icon: ['duxui-design', 'tab'],
  cate: '布局',
  import: '@/duxui',
  attr: () => {
    return {
      defaultValue: 0
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
      type: {
        name: '样式',
        type: 'radio',
        props: {
          options: [
            { name: '默认', value: 'line' },
            { name: '按钮', value: 'button' }
          ]
        }
      },
      justify: {
        name: '拉伸使其充满容器',
        type: 'switch'
      },
      lazyload: {
        name: '懒加载',
        type: 'switch'
      },
      scroll: {
        name: '横向滚动',
        type: 'switch'
      },
      expand: {
        name: '展开更多按钮',
        type: 'switch'
      },
      oneHidden: {
        name: '只有一个Tab时隐藏Tab',
        type: 'switch'
      },
      defaultValue: {
        name: '默认选中',
        type: 'number'
      },
    }
  },
  child: {
    memo: false,
    disable: {
      // 组件
      comp: ['TabItem'],
      // 组件判断是否是包含这些组件还是不包含这些组件
      contain: true,
    }
  }
}

export const TabItem = {
  name: '选项卡项',
  tag: 'TabItem',
  icon: ['duxui-design', 'tab'],
  cate: '布局',
  import: {
    path: '@/duxui',
    name: 'Tab',
    tag: 'Tab.Item'
  },
  attr: () => {
    return {
      title: '选项卡'
    }
  },
  attrForm: () => {
    return {
      title: {
        name: '名称',
        type: 'text'
      },
      badgeProps: {
        __object: {
          tab: {
            name: '标签属性'
          }
        },
        ...Badge.attrForm()
      }
    }
  },
  parent: {
    disable: {
      // 组件
      comp: ['Tab'],
      // 组件判断是否是包含这些组件还是不包含这些组件
      contain: true,
    }
  },
  child: {}
}
