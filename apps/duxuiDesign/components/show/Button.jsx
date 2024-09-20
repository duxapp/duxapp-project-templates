import { getStyleForm } from '@/design/Design'

export const Button = {
  name: '按钮',
  tag: 'Button',
  icon: ['duxui-design', 'button'],
  cate: '展示',
  import: '@/duxui',
  attr: () => {
    return {
      children: '按钮'
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
      textStyle: {
        __object: {
          tab: {
            name: '文本样式'
          }
        },
        ...getStyleForm(
          'text'
        )
      },
      children: {
        name: '按钮文字',
        type: ['text', 'node'],
        props: [
          {},
          {
            include: ['Text', 'Icon']
          }
        ]
      },
      type: {
        name: '颜色',
        type: 'radio',
        props: {
          options: [
            { name: '默认', value: 'default' },
            { name: '主色', value: 'primary' },
            { name: '辅色', value: 'secondary' },
            { name: '成功', value: 'success' },
            { name: '警告', value: 'warning' },
            { name: '失败', value: 'danger' }
          ]
        }
      },
      color: {
        __array: {
          name: '渐变色',
          max: 2,
          min: 2
        },
        type: 'color'
      },
      colorAngle: {
        name: '渐变角度',
        type: 'number',
        props: {
          suffix: '度'
        },
        show: ({ values }) => values.color?.[0] && values.color?.[1]
      },
      radiusType: {
        name: '圆角类型',
        type: 'radio',
        props: {
          options: [
            { name: '直角', value: 'square' },
            { name: '圆角', value: 'round' },
            { name: '较小的圆角', value: 'round-min' }
          ]
        }
      },
      size: {
        name: '尺寸',
        type: 'radio',
        props: {
          options: [
            { name: '小', value: 's' },
            { name: '中', value: 'l' },
            { name: '大', value: 'l' }
          ]
        }
      },
      plain: {
        name: '镂空显示',
        type: 'switch'
      },
      disabled: {
        name: '是否禁用',
        type: 'switch'
      },
      loading: {
        name: '显示加载中',
        type: 'switch'
      },
      renderContent: {
        name: '自定义按钮内容',
        type: 'node'
      }
    }
  }
}
