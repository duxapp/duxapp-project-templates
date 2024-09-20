import { getStyleForm } from '@/design/Design'

export const InputCode = {
  name: '验证码输入',
  tag: 'InputCode',
  icon: ['duxui-design', 'input-code'],
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
      itemStyle: {
        __object: {
          tab: {
            name: '项样式'
          }
        },
        ...getStyleForm(
          'size', 'padding', 'margin',
          'borderRadius', 'border',
          'flexParent', 'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      length: {
        name: '输入长度',
        type: 'number',
        desc: '默认6'
      },
      password: {
        name: '隐藏输入内容',
        type: 'switch'
      },
      focus: {
        name: '显示焦点',
        type: 'switch'
      }
    }
  }
}
