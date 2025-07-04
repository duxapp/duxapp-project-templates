import { getStyleForm } from '@/duxappDesign/Design'

export const Space = {
  name: '间距',
  tag: 'Space',
  icon: ['duxui-design', 'space'],
  cate: '布局',
  import: '@/duxui',
  attr: () => {
    return {
      column: 4
    }
  },
  attrForm: () => {
    return {
      size: {
        name: '间距尺寸',
        type: 'size'
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
      grow: {
        name: '拉伸',
        type: 'switch'
      },
      shrink: {
        name: '禁止压缩',
        type: 'switch'
      },
      self: {
        name: '自身对齐',
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
    }
  },
  child: {}
}
