import { getStyleForm } from '@/design/Design'

export const NumberKeyboard = {
  name: '数字键盘',
  tag: 'NumberKeyboard',
  icon: ['duxui-design', 'number-keyboard'],
  cate: '表单',
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
      random: {
        name: '随机排序',
        type: 'switch'
      },
      keyLeft: {
        __object: {
          name: '底部左侧按键'
        },
        key: {
          name: '按键key',
          type: 'text'
        },
        render: {
          name: '按键内容',
          type: 'node'
        }
      },
      keyRight: {
        __object: {
          name: '底部右侧按键'
        },
        key: {
          name: '按键key',
          type: 'text'
        },
        render: {
          name: '按键内容',
          type: 'node'
        }
      }
    }
  }
}
