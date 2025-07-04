import { getStyleForm } from '@/duxappDesign/Design'

const baseForm = () => {
  return {
    iconSize: {
      name: '图标尺寸',
      type: 'size',
      show: ({ values }) => values.icon
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
      name: '头像类型',
      type: 'radio',
      props: {
        options: [
          { name: '方形', value: 'square' },
          { name: '圆形', value: 'round' },
          { name: '小圆角', value: 'round-min' }
        ]
      }
    }
  }
}

const commonForm = () => {
  return {
    url: {
      name: '头像',
      type: ['image', 'text'],
    },
    children: {
      name: '头像文本',
      type: 'text'
    },
    icon: {
      name: '头像图标',
      type: 'node',
      props: {
        include: ['Icon']
      }
    },
    ...baseForm()
  }
}

export const Avatar = {
  name: '头像',
  tag: 'Avatar',
  icon: ['duxui-design', 'avatar'],
  cate: '展示',
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
          'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      ...commonForm()
    }
  }
}

export const AvatarGroup = {
  name: '头像组',
  tag: 'AvatarGroup',
  icon: ['duxui-design', 'avatar'],
  cate: '展示',
  import: {
    path: '@/duxui',
    name: 'Avatar',
    tag: 'Avatar.Group'
  },
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {
      ...baseForm(),
      className: {
        name: '类名',
        type: 'className'
      },
      style: {
        __object: true,
        ...getStyleForm(
          'size', 'padding', 'margin',
          'borderRadius', 'border',
          'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      span: {
        name: '头像间距(默认-16)',
        type: 'size'
      },
      max: {
        name: '最多显示几个头像',
        type: 'number'
      },
      maxProps: {
        __object: {
          name: '更多头像的属性'
        },
        ...commonForm()
      }
    }
  },
  child: {
    disable: {
      // 组件
      comp: ['Avatar'],
      // 组件判断是否是包含这些组件还是不包含这些组件
      contain: true,
    }
  }
}
