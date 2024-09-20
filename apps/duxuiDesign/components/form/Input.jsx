import { getStyleForm } from '@/design/Design'

export const Input = {
  name: '文本输入',
  tag: 'Input',
  icon: ['duxui-design', 'input'],
  cate: '表单',
  import: '@/duxui',
  attr: () => {
    return {
      grow: false,
      align: 'left',
      placeholder: '请输入'
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
          'opacity', 'text', 'transform'
        )
      },
      align: {
        name: '对齐方式',
        type: 'radio',
        props: {
          options: [
            { name: '左对齐', value: 'left' },
            { name: '居中对齐', value: 'center' },
            { name: '右对齐', value: 'right' }
          ]
        }
      },
      grow: {
        name: '占满空间',
        type: 'switch'
      },
      placeholder: {
        name: '提示文本',
        type: 'text'
      }
    }
  }
}

export const Textarea = {
  name: '多行文本',
  tag: 'Textarea',
  icon: ['duxui-design', 'textarea'],
  cate: '表单',
  import: '@/duxui',
  attr: () => {
    return {
      placeholder: '请输入'
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
          'opacity', 'text', 'transform'
        )
      },
      placeholder: {
        name: '提示文本',
        type: 'text'
      },
      line: {
        name: '行数',
        type: 'number'
      },
      grow: {
        name: '占满空间',
        type: 'switch'
      },
    }
  }
}

