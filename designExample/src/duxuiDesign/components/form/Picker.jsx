export const PickerSelect = {
  name: '弹出选择',
  tag: 'PickerSelect',
  icon: ['duxui-design', 'picker'],
  cate: '表单',
  import: '@/duxui',
  attr: () => {
    return {
      range: [{ name: '选项1', value: '1' }],
      placeholder: '请选择',
      title: '请选择'
    }
  },
  attrForm: () => {
    return {
      placeholder: {
        name: '为空提示',
        type: 'text'
      },
      title: {
        name: '弹出标题',
        type: 'text'
      },
      grow: {
        name: '占满空间',
        type: 'switch'
      },
      range: {
        __objectArray: {
          name: '选项'
        },
        name: {
          name: '选项名',
          type: 'text'
        },
        value: {
          name: '选项值',
          type: 'text'
        }
      }
    }
  }
}

export const PickerMultiSelect = {
  name: '弹出多列选择',
  tag: 'PickerMultiSelect',
  icon: ['duxui-design', 'picker'],
  cate: '表单',
  import: '@/duxui',
  attr: () => {
    return {
      range: [[{ name: '一级选项1', value: '1' }], [{ name: '二级选项2', value: '1' }]],
      placeholder: '请选择',
      title: '请选择'
    }
  },
  attrForm: () => {
    return {
      placeholder: {
        name: '为空提示',
        type: 'text'
      },
      title: {
        name: '弹出标题',
        type: 'text'
      },
      grow: {
        name: '占满空间',
        type: 'switch'
      },
      range: {
        __array: {
          name: '行选项'
        },
        type: {
          __objectArray: {
            name: '列选项'
          },
          name: {
            name: '选项名',
            type: 'text'
          },
          value: {
            name: '选项值',
            type: 'text'
          }
        }
      }
    }
  }
}

export const PickerDate = {
  name: '日期选择',
  tag: 'PickerDate',
  icon: ['duxui-design', 'date'],
  cate: '表单',
  import: '@/duxui',
  attr: () => {
    return {
      placeholder: '请选择',
      title: '请选择',
      mode: 'date'
    }
  },
  attrForm: () => {
    return {
      placeholder: {
        name: '为空提示',
        type: 'text'
      },
      title: {
        name: '弹出标题',
        type: 'text'
      },
      grow: {
        name: '占满空间',
        type: 'switch'
      },
      mode: {
        name: '选择模式',
        type: 'radio',
        props: {
          options: [
            { name: '日期', value: 'date' },
            { name: '时间', value: 'time' },
            { name: '日期时间', value: 'datetime' },
            { name: '年', value: 'year' },
            { name: '月', value: 'month' }
          ]
        }
      },
    }
  }
}
