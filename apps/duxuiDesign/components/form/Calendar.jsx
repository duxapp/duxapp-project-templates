import { getStyleForm } from '@/duxappDesign/Design'

export const Calendar = {
  name: '日历',
  tag: 'Calendar',
  icon: ['duxui-design', 'calendar'],
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
      mode: {
        name: '类型',
        type: 'radio',
        props: {
          options: [
            { name: '默认', value: undefined },
            { name: '日选择', value: 'day' },
            { name: '周选择', value: 'week' },
            { name: '范围选择', value: 'scope' }
          ]
        }
      },
      checkbox: {
        name: '多选',
        type: 'switch'
      },
      onlyCurrentWeek: {
        name: '是否仅显示当前周',
        type: 'switch'
      }
    }
  }
}
