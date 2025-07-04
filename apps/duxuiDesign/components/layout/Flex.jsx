import { getStyleForm } from '@/duxappDesign/Design'

export const Column = {
  name: '竖向布局',
  tag: 'Column',
  icon: ['duxui-design', 'column'],
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
          'flexParent', 'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      items: {
        name: '竖向对齐',
        type: 'radio',
        default: '',
        props: {
          options: [
            { name: '左', value: 'start' },
            { name: '中', value: 'center' },
            { name: '右', value: 'end' },
            { name: '拉伸', value: 'stretch' }
          ]
        }
      },
      justify: {
        name: '横向对齐',
        type: 'radio',
        props: {
          options: [
            { name: '上', value: 'start' },
            { name: '中', value: 'center' },
            { name: '下', value: 'end' },
            { name: '两端', value: 'between' },
            { name: '间距', value: 'around' }
          ]
        }
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
      }
    }
  },
  child: {}
}

export const Row = {
  name: '横向布局',
  tag: 'Row',
  icon: ['duxui-design', 'row'],
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
          'flexParent', 'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      items: {
        name: '横向对齐',
        type: 'radio',
        props: {
          options: [
            { name: '上', value: 'start' },
            { name: '中', value: 'center' },
            { name: '下', value: 'end' },
            { name: '拉伸', value: 'stretch' }
          ]
        }
      },
      justify: {
        name: '竖向对齐',
        type: 'radio',
        props: {
          options: [
            { name: '左', value: 'start' },
            { name: '中', value: 'center' },
            { name: '右', value: 'end' },
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
    }
  },
  child: {}
}
