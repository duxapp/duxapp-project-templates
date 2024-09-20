import { getStyleForm } from '@/design/Design'

export const Menu = {
  name: '菜单',
  tag: 'Menu',
  icon: ['duxui-design', 'menu'],
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
          'size', 'padding', 'margin',
          'borderRadius', 'border',
          'flexParent', 'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      round: {
        name: '是否圆角',
        type: 'switch'
      }
    }
  },
  child: {

  }
}

export const MenuItem = {
  name: '菜单项',
  tag: 'MenuItem',
  icon: ['duxui-design', 'menu'],
  cate: '表单',
  import: {
    path: '@/duxui',
    name: 'Menu',
    tag: 'Menu.Item'
  },
  attr: () => {
    return {
      title: '菜单'
    }
  },
  attrForm: () => {
    return {
      title: {
        name: '菜单名称',
        type: 'text'
      },
      options: {
        __objectArray: {
          name: '菜单项目'
        },
        name: {
          name: '名称',
          type: 'text'
        },
        value: {
          name: '值',
          type: 'text'
        }
      },
      cancel: {
        name: '单选是否能取消选中项目',
        type: 'switch'
      },
      column: {
        name: '列数',
        type: 'number'
      },
      align: {
        name: '文本对齐方式',
        type: 'radio',
        props: {
          options: [
            { name: '左', value: 'left' },
            { name: '中', value: 'center' },
            { name: '右', value: 'right' }
          ]
        }
      },
      renderIcon: {
        name: '自定义图标',
        type: 'node',
        props: {
          include: ['Icon']
        }
      }
    }
  }
}

