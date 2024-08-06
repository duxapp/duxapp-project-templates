import { getStyleForm } from '@/design/Design'

export const Card = {
  name: '卡片',
  tag: 'Card',
  icon: ['duxui-design', 'card'],
  cate: '布局',
  import: '@/duxui',
  attr: () => {
    return {
      verticalPadding: true
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
          'opacity', 'overflow'
        )
      },
      shadow: {
        name: '阴影',
        type: 'switch'
      },
      margin: {
        name: '外边距',
        type: 'switch'
      },
      disableMarginTop: {
        name: '禁用上外边距',
        type: 'switch'
      },
      disableMarginBottom: {
        name: '禁用下外边距',
        type: 'switch'
      },
      verticalPadding: {
        name: '垂直内边距',
        type: 'switch'
      },
      row: {
        name: '横向排列',
        type: 'switch'
      },
      items: {
        name: '主轴对齐',
        type: 'radio',
        props: {
          options: [
            { name: '开始', value: 'start' },
            { name: '居中', value: 'center' },
            { name: '结束', value: 'end' },
            { name: '拉伸', value: 'stretch' }
          ]
        }
      },
      justify: {
        name: '辅轴对齐',
        type: 'radio',
        props: {
          options: [
            { name: '开始', value: 'start' },
            { name: '居中', value: 'center' },
            { name: '结束', value: 'end' },
            { name: '两端', value: 'between' },
            { name: '间距', value: 'around' }
          ]
        }
      },
      wrap: {
        name: '允许换行',
        type: 'switch'
      },
    }
  },
  child: {}
}

export const CardTitle = {
  name: '卡片标题',
  tag: 'CardTitle',
  import: {
    path: '@/duxui',
    name: 'Card',
    tag: 'Card.Title'
  },
  icon: ['duxui-design', 'card'],
  cate: '布局',
  attr: () => {
    return {
      children: '标题'
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
      children: {
        name: '标题',
        type: 'text'
      },
      line: {
        name: '是否显示标题左侧线条',
        type: 'switch'
      }
    }
  }
}
