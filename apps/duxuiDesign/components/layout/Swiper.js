import { getStyleForm } from '@/duxappDesign/Design'

export const Swiper = {
  name: '幻灯片',
  tag: 'Swiper',
  icon: ['duxui-design', 'swiper'],
  cate: '布局',
  import: '@/duxui',
  attr: () => {
    return {
      style: {
        height: 460
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
      autoplay: {
        name: '自动播放',
        type: 'switch'
      },
      interval: {
        name: '播放间隔(毫秒)',
        type: 'number',
        show: ({ values }) => values.autoplay
      },
      circular: {
        name: '衔接滑动',
        type: 'switch'
      },
      vertical: {
        name: '垂直滑动',
        type: 'switch'
      },
      defaultCurrent: {
        name: '默认显示第几个(从0开始)',
        type: 'number'
      },
      dot: {
        name: '显示指示点',
        type: 'switch'
      },
      dot: {
        name: '显示指示点',
        type: 'switch'
      },
      dot: {
        name: '显示指示点',
        type: 'switch'
      },
      dotColor: {
        name: '指示点颜色',
        type: 'color',
        show: ({ values }) => values.dot
      },
      dotSelectColor: {
        name: '选中指示点颜色',
        type: 'color',
        show: ({ values }) => values.dot
      },
      dotDistance: {
        name: '指示点距离边框的距离',
        type: 'size',
        show: ({ values }) => values.dot
      }
    }
  },
  child: {
    disable: {
      // 组件
      comp: ['SwiperItem'],
      // 组件判断是否是包含这些组件还是不包含这些组件
      contain: true,
    }
  }
}

export const SwiperItem = {
  name: '幻灯片项',
  tag: 'SwiperItem',
  icon: ['duxui-design', 'swiper'],
  cate: '布局',
  import: {
    path: '@/duxui',
    name: 'Swiper',
    tag: 'Swiper.Item'
  },
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {

    }
  },
  parent: {
    disable: {
      // 组件
      comp: ['Swiper'],
      // 组件判断是否是包含这些组件还是不包含这些组件
      contain: true,
    }
  },
  child: {

  }
}
