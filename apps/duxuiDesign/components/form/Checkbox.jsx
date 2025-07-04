import { getStyleForm } from '@/duxappDesign/Design'

export const Checkbox = {
  name: '多选',
  tag: 'Checkbox',
  icon: ['duxui-design', 'checkbox'],
  cate: '表单',
  import: '@/duxui',
  attr: () => {
    return {
      label: '选项',
      value: '',
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
          'borderRadius', 'border',
          'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      label: {
        name: '选项名',
        type: 'text'
      },
      value: {
        name: '选项值',
        type: 'text'
      }
    }
  }
}

export const CheckboxGroup = {
  name: '多选组',
  tag: 'CheckboxGroup',
  icon: ['duxui-design', 'checkbox'],
  cate: '表单',
  import: {
    path: '@/duxui',
    name: 'Checkbox',
    tag: 'Checkbox.Group'
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
          'borderRadius', 'border',
          'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      direction: {
        name: '方向',
        type: 'radio',
        props: {
          options: [
            { name: '横向', value: 'horizontal' },
            { name: '竖向', value: 'vertical' }
          ]
        }
      }
    }
  },
  child: {

  }
}

