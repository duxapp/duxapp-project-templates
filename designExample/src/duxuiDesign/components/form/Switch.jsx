export const Switch = {
  name: '开关',
  tag: 'Switch',
  icon: ['duxui-design', 'switch'],
  cate: '表单',
  import: '@/duxui',
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {
      type: {
        name: '样式',
        type: 'radio',
        props: {
          options: [
            { name: '开关', value: 'switch' },
            { name: '框选', value: 'checkbox' }
          ]
        }
      },
      color: {
        name: '颜色',
        type: 'color'
      }
    }
  }
}
