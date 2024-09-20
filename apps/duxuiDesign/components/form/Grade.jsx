import { getStyleForm } from '@/design/Design'

export const Grade = {
  name: '评分',
  tag: 'Grade',
  icon: ['duxui-design', 'grade'],
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
          'size', 'margin',
          'borderRadius', 'border',
          'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      size: {
        name: '尺寸',
        type: 'radio',
        props: {
          options: [
            { name: '小号', value: 's' },
            { name: '中号', value: 'm' },
            { name: '大号', value: 'l' }
          ]
        }
      }
    }
  }
}
