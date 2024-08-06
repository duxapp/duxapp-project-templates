import { getStyleForm } from '@/design/Design'

export const Image = {
  name: '图片',
  tag: 'Image',
  icon: ['duxui-design', 'image'],
  cate: '展示',
  import: '@/duxui',
  desc: ({ attr }) => {
    return { icon: attr.src }
  },
  attr: () => {
    return {
      style: {
        width: 300,
        height: 240
      }
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
      src: {
        name: '图片',
        type: ['image', 'text'],
      },
      preview: {
        name: '预览',
        type: 'switch',
      },
      radiusType: {
        name: '圆角',
        type: 'radio',
        props: {
          options: [
            { name: '无', value: 'square' },
            { name: '有', value: 'round-min' }
          ]
        }
      },
      mode: {
        name: '裁剪',
        type: 'radio',
        props: {
          options: [
            { name: '拉伸', value: 'scaleToFill' },
            { name: '缩放显示', value: 'aspectFit' },
            { name: '缩放裁剪', value: 'aspectFill' },
            { name: '自动高度', value: 'widthFix' }
          ]
        }
      }
    }
  }
}

export const ImageGroup = {
  name: '图片组',
  tag: 'ImageGroup',
  icon: ['duxui-design', 'image'],
  cate: '展示',
  import: {
    path: '@/duxui',
    name: 'Image',
    tag: 'Image.Group'
  },
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {

    }
  },
  editor: {
    virtual: true
  },
  child: {

  }
}
