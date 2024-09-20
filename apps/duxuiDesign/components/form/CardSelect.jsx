export const CardSelect = {
  name: '卡片选择器',
  tag: 'CardSelect',
  icon: ['duxui-design', 'card-select'],
  cate: '表单',
  import: '@/duxui',
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {
      value: {
        name: '当前选项值',
        type: 'text'
      },
      plain: {
        name: '是否镂空',
        type: 'switch'
      },
      color: {
        name: '颜色',
        type: 'color'
      },
      border: {
        name: '是否有边框',
        type: 'switch'
      },
      borderColor: {
        name: '边框颜色',
        type: 'color'
      },
      disabled: {
        name: '禁用',
        type: 'color'
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
      }
    }
  },
  child: {

  }
}

export const CardSelectGroup = {
  name: '卡片选择器组',
  tag: 'CardSelectGroup',
  icon: ['duxui-design', 'card-select'],
  cate: '表单',
  import: {
    path: '@/duxui',
    name: 'CardSelect',
    tag: 'CardSelect.Group'
  },
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {
      checkbox: {
        name: '是否多选',
        type: 'switch'
      },
      checkedProps: {
        __object: true,
        plain: {
          name: '是否镂空',
          type: 'switch'
        },
        color: {
          name: '颜色',
          type: 'color'
        },
        border: {
          name: '是否有边框',
          type: 'switch'
        },
        borderColor: {
          name: '边框颜色',
          type: 'color'
        },
      }
    }
  },
  child: {

  }
}

