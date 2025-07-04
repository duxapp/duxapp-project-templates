import { getStyleForm } from '@/duxappDesign/Design'
import { Text } from '../show/Text'
import { Space } from '../layout/Space'

export const Form = {
  name: '表单',
  tag: 'Form',
  icon: ['duxui-design', 'form'],
  cate: '表单',
  import: '@/duxui',
  attr: () => {
    return {
      labelProps: {

      },
      direction: 'horizontal',
      disabled: false
    }
  },
  attrForm: () => {
    return {
      labelProps: {
        __object: true
      },
      direction: {
        name: '表单方向',
        type: 'radio',
        props: {
          options: [
            { name: '横向', value: 'horizontal' },
            { name: '竖向', value: 'vertical' }
          ]
        }
      },
      disabled: {
        name: '禁用表单',
        type: 'switch'
      },
      labelProps: {
        __object: {
          tab: {
            name: '标签属性'
          }
        }
      },
      labelProps: {
        __object: {
          tab: {
            name: '标签'
          }
        },
        ...Text.attrForm()
      },
      containerProps: {
        __object: {
          tab: {
            name: '项目容器'
          }
        },
        ...Space.attrForm()
      }
    }
  },
  child: {

  }
}

export const FormItem = {
  name: '表单项',
  tag: 'FormItem',
  icon: ['duxui-design', 'form'],
  cate: '表单',
  import: {
    path: '@/duxui',
    name: 'FormItem',
    tag: 'Form.Item'
  },
  attr: () => {
    return {
      label: '表单',
      field: '',
      rules: []
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
      label: {
        name: '标题',
        type: 'text',
      },
      labelProps: {
        __object: {
          tab: {
            name: '标签属性'
          }
        },
        ...Text.attrForm()
      },
      containerProps: {
        __object: {
          tab: {
            name: '容器属性'
          }
        },
        ...Space.attrForm()
      },
      subLabel: {
        name: '副标题',
        type: 'text',
      },
      desc: {
        name: '描述',
        type: 'text',
      },
      field: {
        name: '字段',
        type: 'text',
      },
      direction: {
        name: '表单方向',
        type: 'radio',
        props: {
          options: [
            { name: '横向', value: 'horizontal' },
            { name: '竖向', value: 'vertical' }
          ]
        }
      },
      required: {
        name: '显示红色星号',
        type: 'switch'
      },
      rules: {
        __objectArray: {
          name: '验证规则'
        },
        type: {
          name: '类型',
          type: 'radio',
          props: {
            options: [
              { name: '字符串', value: 'string' }
            ]
          }
        },
        required: {
          name: '必填',
          type: 'switch'
        },
        message: {
          name: '错误提示',
          type: 'text',
        }
      },
      direction: {
        name: '表单方向',
        type: 'radio',
        props: {
          options: [
            { name: '横向', value: 'horizontal' },
            { name: '竖向', value: 'vertical' }
          ]
        }
      },
      disabled: {
        name: '禁用表单',
        type: 'switch'
      },
      renderLabelRight: {
        name: '标签右侧',
        type: 'node',
        desc: '一般设置方向为竖向时使用'
      },
      trigger: {
        name: '通过哪个事件名称触发表单改变',
        type: 'text'
      },
      triggerPropName: {
        name: '给表单绑定的值的属性名称',
        type: 'text'
      }
    }
  },
  child: {
    max: 1
  }
}

export const FormObject = {
  name: '对象表单',
  tag: 'FormObject',
  icon: ['duxui-design', 'object'],
  cate: '表单',
  import: {
    path: '@/duxui',
    name: 'FormItem',
    tag: 'Form.Object'
  },
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {

    }
  },
  child: {

  },
  parent: {
    disable: {
      // 组件
      comp: ['FormItem'],
      // 组件判断是否是包含这些组件还是不包含这些组件
      contain: true,
    }
  }
}

export const FormArray = {
  name: '数组表单',
  tag: 'FormArray',
  icon: ['duxui-design', 'array'],
  cate: '表单',
  import: {
    path: '@/duxui',
    name: 'FormItem',
    tag: 'Form.Array'
  },
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {

    }
  },
  child: {

  },
  parent: {
    disable: {
      // 组件
      comp: ['FormItem'],
      // 组件判断是否是包含这些组件还是不包含这些组件
      contain: true,
    }
  }
}

export const FormSubmit = {
  name: '提交按钮',
  tag: 'FormSubmit',
  icon: ['duxui-design', 'submit'],
  cate: '表单',
  import: {
    path: '@/duxui',
    name: 'FormItem',
    tag: 'Form.Submit'
  },
  attr: () => {
    return {
      children: '提交'
    }
  },
  attrForm: () => {
    return {
      children: {
        name: '按钮文字',
        type: 'text'
      },
      type: {
        name: '类型颜色',
        type: 'radio',
        props: {
          options: [
            { name: '主色', value: 'primary' },
            { name: '辅色', value: 'secondary' },
            { name: '成功', value: 'success' },
            { name: '警告', value: 'warning' },
            { name: '失败', value: 'danger' }
          ]
        }
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
      },
      radiusType: {
        name: '圆角类型',
        type: 'radio',
        props: {
          options: [
            { name: '直角', value: 'square' },
            { name: '小圆角', value: 'round-min' },
            { name: '圆角', value: 'round' }
          ]
        }
      },
      plain: {
        name: '镂空',
        type: 'switch'
      }
    }
  }
}

export const FormReset = {
  name: '重置按钮',
  tag: 'FormReset',
  icon: ['duxui-design', 'reset'],
  cate: '表单',
  import: {
    path: '@/duxui',
    name: 'FormItem',
    tag: 'Form.Reset'
  },
  attr: () => {
    return {
      children: '重置'
    }
  },
  attrForm: () => {
    return FormSubmit.attrForm()
  }
}
