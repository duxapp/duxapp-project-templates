import { getStyleForm } from '@/design/Design'

export const Status = {
  name: '状态',
  tag: 'Status',
  icon: ['duxui-design', 'status'],
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
          'flexParent', 'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow', 'transform'
        )
      },
      horizontal: {
        name: '水平位置',
        type: 'radio',
        props: {
          options: [
            { name: '左', value: 'left' },
            { name: '右', value: 'right' }
          ]
        }
      },
      vertical: {
        name: '竖向位置',
        type: 'radio',
        props: {
          options: [
            { name: '上', value: 'top' },
            { name: '下', value: 'bottom' }
          ]
        }
      },
      status: {
        name: '状态',
        type: 'node',
        props: {
          include: ['StatusCommon', 'StatusIncline']
        }
      }
    }
  },
  child: {

  }
}

export const StatusCommon = {
  name: '状态-常见',
  tag: 'StatusCommon',
  icon: ['duxui-design', 'status'],
  cate: '展示',
  import: {
    path: '@/duxui',
    name: 'Status',
    tag: 'Status.Common'
  },
  attr: () => {
    return {
      children: '状态'
    }
  },
  attrForm: () => {
    return {
      children: {
        name: '状态名称',
        type: 'text'
      },
      type: {
        name: '颜色',
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
      radius: {
        name: '显示内测圆角',
        type: 'switch'
      }
    }
  },
}

export const StatusIncline = {
  name: '状态-倾斜',
  tag: 'StatusIncline',
  icon: ['duxui-design', 'status'],
  cate: '展示',
  import: {
    path: '@/duxui',
    name: 'Status',
    tag: 'Status.Incline'
  },
  attr: () => {
    return {
      children: '状态'
    }
  },
  attrForm: () => {
    return {
      children: {
        name: '状态名称',
        type: 'text'
      },
      type: {
        name: '颜色',
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
      }
    }
  },
}
