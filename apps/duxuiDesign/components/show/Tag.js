import { getStyleForm } from '@/design/Design'

export const Tag = {
  name: '标签',
  tag: 'Tag',
  icon: ['duxui-design', 'tag'],
  cate: '展示',
  import: '@/duxui',
  attr: () => {
    return {
      children: '标签'
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
      children: {
        name: '名称',
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
}
