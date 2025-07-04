import { getStyleForm } from '@/duxappDesign/Design'

export const Text = {
  name: '文本',
  tag: 'Text',
  icon: ['duxui-design', 'text'],
  cate: '展示',
  import: '@/duxui',
  text: true,
  desc: ({ attr }) => {
    return { text: Array.isArray(attr.children) ? '' : attr.children }
  },
  attr: () => {
    return {
      children: '文本内容'
    }
  },
  attrForm: () => {
    return {
      children: {
        name: '文本内容',
        type: ['textarea', 'node'],
        props: [
          {},
          {
            include: ['Text', 'Icon']
          }
        ]
      },
      color: {
        name: '颜色',
        type: ['radio', 'color'],
        props: [
          {
            options: [
              { name: '1', value: 1 },
              { name: '2', value: 2 },
              { name: '3', value: 3 },
              { name: '4', value: 4 }
            ]
          },
          {}
        ]
      },
      type: {
        name: '类型颜色',
        type: 'radio',
        props: {
          options: [
            { name: '主色', value: 'primary' },
            { name: '辅色', value: 'secondary' },
            { name: '成功', value: 'success' },
            { name: '警告', value: 'warning' },
            { name: '失败', value: 'danger' }
          ]
        }
      },
      size: {
        name: '字号',
        type: ['radio', 'number'],
        props: [
          {
            options: [
              { name: '1', value: 1 },
              { name: '2', value: 2 },
              { name: '3', value: 3 },
              { name: '4', value: 4 },
              { name: '5', value: 5 },
              { name: '6', value: 6 },
              { name: '7', value: 7 }
            ]
          },
          {

          }
        ]
      },
      bold: {
        name: '加粗',
        type: 'switch',
      },
      underline: {
        name: '下划线',
        type: 'switch',
      },
      delete: {
        name: '删除线',
        type: 'switch',
      },
      numberOfLines: {
        name: '超出隐藏行数',
        type: 'number',
      },
      align: {
        name: '文本对齐',
        type: 'radio',
        props: {
          options: [
            { name: '左', value: 'left' },
            { name: '中', value: 'center' },
            { name: '右', value: 'right' },
            { name: '两端对齐', value: 'justify' }
          ]
        }
      },
      grow: {
        name: '占满空间',
        type: 'switch'
      },

      className: {
        name: '类名',
        type: 'className'
      },
      style: {
        __object: true,
        ...getStyleForm(
          'size', 'padding', 'margin',
          'border',
          'flexChild',
          'position', 'backgroundColor',
          'opacity',
          'text', 'transform'
        )
      },
    }
  }
}
