import { getStyleForm } from '@/design/Design'

export const Video = {
  name: '视频',
  tag: 'Video',
  icon: ['duxui-design', 'video'],
  cate: '展示',
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
          'flexChild',
          'borderRadius',
          'position', 'backgroundColor', 'transform'
        )
      },
      src: {
        name: '视频',
        type: 'video'
      },
      controls: {
        name: '是否显示播放控制器',
        type: 'switch'
      },
      autoplay: {
        name: '自动播放',
        type: 'switch'
      },
      loop: {
        name: '循环播放',
        type: 'switch'
      },
      muted: {
        name: '静音播放',
        type: 'switch'
      },
      direction: {
        name: '设置全屏时视频的方向',
        type: 'radio',
        props: {
          options: [
            { name: '正常竖向', value: 0 },
            { name: '逆时针90度', value: 90 },
            { name: '顺时针90度', value: -90 }
          ]
        }
      },
      showFullscreenBtn: {
        name: '显示进入全屏按钮',
        type: 'switch'
      },
      showPlayBtn: {
        name: '显示播放按钮',
        type: 'switch'
      },
      showCenterPlayBtn: {
        name: '显示视频中间的播放按钮',
        type: 'switch'
      },
      poster: {
        name: '视频封面',
        type: 'image'
      },
      title: {
        name: '视频的标题，全屏时在顶部展示',
        type: 'text'
      }
    }
  }
}
