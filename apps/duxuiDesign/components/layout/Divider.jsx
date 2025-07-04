import { getStyleForm } from '@/duxappDesign/Design'

export const Divider = {
  name: '分割线',
  tag: 'Divider',
  icon: ['duxui-design', 'divider'],
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
          'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      vertical: {
        name: '垂直布局',
        type: 'switch',
      },
      size: {
        name: '粗细',
        type: 'size'
      },
      type: {
        name: '类型',
        type: 'radio',
        props: {
          options: [
            { name: '实线', value: 'solid' },
            { name: '虚线1', value: 'dotted' },
            { name: '虚线2', value: 'dashed' }
          ]
        }
      }
    }
  }
}

export const DividerGroup = {
  name: '分割线组',
  tag: 'DividerGroup',
  icon: ['duxui-design', 'divider'],
  cate: '布局',
  import: {
    path: '@/duxui',
    name: 'Divider',
    tag: 'Divider.Group'
  },
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {
      vertical: {
        name: '垂直布局',
        type: 'switch',
      },
      size: {
        name: '粗细',
        type: 'size'
      },
      type: {
        name: '类型',
        type: 'radio',
        props: {
          options: [
            { name: '实线', value: 'solid' },
            { name: '虚线1', value: 'dotted' },
            { name: '虚线2', value: 'dashed' }
          ]
        }
      }
    }
  },
  child: {}
}
