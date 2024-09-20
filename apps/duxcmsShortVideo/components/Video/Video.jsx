import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Column, Loading, Image, px, Row, Text, dayjs, toast, stopPropagation, Avatar, loading, duxappTheme, TopView, PullView, nav, confirm } from '@/duxui'
import classNames from 'classnames'
import { shortVideoHook, user, saveToPhoto, getTopic } from '@/duxcmsShortVideo/utils'
import { CmsIcon, request } from '@/duxcms'
import { useDidHide, useDidShow } from '@tarojs/taro'
import { WechatShare } from '@/wechat'
import { Video } from './common/video'
import { VideoIcon } from '../VideoIcon'
import { Comment } from './Comment'

export const ShortVideoItem = ({
  item,
  index,
  isSelect,
  isShow,
  pause,
  params,
  style,
  className
}) => {
  const [load, setLoad] = useState(false)

  const [, setReload] = useState(0)

  const reload = useCallback(() => setReload(old => old + 1), [])

  // h5端首个需要点击后视频才能播放 将第一个视频进行暂停
  const [paused, setPaused] = useState(!!index || h5Click || process.env.TARO_ENV !== 'h5' ? false : true)

  const current = useRef({})

  useDidShow(() => {
    setPaused(false)
  }, [])

  useDidHide(() => {
    setPaused(true)
  })
  const setDurationStatus = useRef(false)
  const setDuration = useCallback(() => {
    if (setDurationStatus.current) {
      return
    }
    setDurationStatus.current = true
    request({
      url: `short/video/${item.id}`,
      method: 'POST',
      data: {
        ...params.endData,
        duration: Date.now() - current.current.startDate,
        area: params.area || 'video'
      }
    }).finally(() => {
      setDurationStatus.current = false
    })
  }, [item.id, params.area, params.endData])

  const oldSelect = useRef(isSelect)
  useEffect(() => {
    if (oldSelect.current !== isSelect) {
      oldSelect.current = isSelect
      if (!isSelect) {
        // 跳转到其他视频 记录在此视频停留的时长
        setDuration()
      }
    }
  }, [isSelect, setDuration])

  useEffect(() => {
    return () => {
      if (isSelect) {
        setDuration()
      }
    }
  }, [isSelect, setDuration])

  useEffect(() => {
    if (isSelect) {
      current.current.startDate = Date.now()
    }
  }, [isSelect])

  if (!isShow) {
    return
  }

  const hookData = { item, isSelect, isShow, pause, load, paused, params, reload }

  return <Column style={style} className={classNames('w-full h-full items-center justify-center', className)}
    onClick={() => setPaused(!paused)}
  >
    <Video
      className='absolute left-0 top-0 w-full h-full'
      loop
      autoplay
      src={item.url}
      muted={!isSelect || pause}
      paused={paused || pause || !isSelect}
      poster={item.cover}
    // onTimeUpdate={onTimeUpdate}
    />
    {
      item.duration === 0 && <Image src={item.cover} className='absolute left-0 top-0 w-full h-full' />
    }
    {paused && !load && (
      <Column className='r-max square items-center justify-center' style={{ width: px(174), backgroundColor: 'rgba(41, 33, 33, 0.5)' }}>
        <VideoIcon name='bofang1' color='#fff' size={86} />
      </Column>
    )}
    {load && (
      <Column className='r-1 square items-center justify-center' style={{ width: px(174), backgroundColor: 'rgba(41, 33, 33, 0.5)' }}>
        <Loading size={80} color='blank' />
      </Column>
    )}
    <shortVideoHook.Render mark='ShortVideoItem.info' option={hookData}>
      <VideoInfo item={item} hookData={hookData} />
    </shortVideoHook.Render>
    {!params.hideMenus && <shortVideoHook.Render mark='ShortVideoItem.menus' option={hookData}>
      <Menus item={item} reload={reload} hookData={hookData} />
    </shortVideoHook.Render>}
  </Column>
}

const VideoInfo = ({ item, hookData }) => {

  const titles = useMemo(() => getTopic(item.title), [item.title])

  return <Column className='absolute left-0 bottom-0 p-3 gap-3' items='start' style={{ right: px(120) }} onClick={stopPropagation}>
    <shortVideoHook.Render mark='ShortVideoItem.info.address' option={hookData}>
      {!!item.area?.length && <Row className='r-1 p-1 items-center' style={{ backgroundColor: 'rgba(0,0,0,0.2)', maxWidth: px(450) }}
        onClick={() => {
          nav('map:', {
            latitude: item.position[1],
            longitude: item.position[0],
            name: item.title,
            address: item.area.join('')
          })
        }}
      >
        <Text color={4} size={1} numberOfLines={1}><CmsIcon name='map1' size={28} /> <Text>{item.area.slice(1)}</Text></Text>
        <CmsIcon name='navigation_fill' size={28} color='#fff' />
      </Row>}
    </shortVideoHook.Render>
    <Row items='end' className='gap-4'>
      <Text bold color={4} size={5}>@{item.user?.nickname}</Text>
      <Text size={2} color='rgba(255,255,255,0.6)'>{dayjs(item.created_at).format('YYYY-MM-DD')}</Text>
    </Row>
    <Text numberOfLines={2} color={4}>
      {
        titles.map((title, i) => {
          return <Text
            key={i}
            bold={title.topic}
            onClick={() => {
              if (title.topic) {
                nav('duxcmsShortVideo/search/index', { keyword: title.text.substring(1) })
              }
            }}
          >{title.text}</Text>
        })
      }
    </Text>
    <shortVideoHook.Render mark='ShortVideoItem.info.end' option={hookData} />
    <Column />
  </Column>
}

let h5Click = false
if (process.env.TARO_ENV === 'h5') {
  const callback = () => {
    h5Click = true
    window.document.removeEventListener('click', callback)
    window.document.removeEventListener('touchstart', callback)
  }
  window.document.addEventListener('click', callback)
  window.document.addEventListener('touchstart', callback)
}

const Menus = ({ item, reload, hookData }) => {

  const follow = useCallback(async e => {
    stopPropagation(e)
    if (!user.isLogin()) {
      await user.login()
    }
    await request({
      url: `member/fans/${item.user.id}`,
      loading,
      method: 'POST',
      toast: true
    })
    item.my.fans = true
    reload()
  }, [item.my, item.user.id, reload])

  const like = useCallback(async () => {
    if (!user.isLogin()) {
      await user.login()
    }
    const { status } = await request({
      url: `member/praise/short/${item.id}`,
      loading,
      method: 'POST',
      toast: true
    })
    if (status) {
      item.like += 1
      item.my.like = true
    } else {
      item.like -= 1
      item.my.like = false
    }
    reload()
  }, [item, reload])

  return <Column className='absolute right-0 items-center gap-4' style={{ bottom: px(120) }}
    onClick={stopPropagation}
  >
    <shortVideoHook.Render mark='ShortVideoItem.menus.user' option={hookData}>
      {!!item.user?.id && (
        <Column
          className='items-center'
          onClick={() =>
            nav('duxcmsShortVideo/user/index', { id: item.user.id })
          }
        >
          <Avatar url={item.user.avatar} />
          {!item.my?.fans && <Column
            className='square r-max items-center justify-center bg-primary'
            onClick={follow}
            style={{ width: px(44), marginTop: px(-22) }}
          >
            <CmsIcon name='add-select' color='#fff' size={36} />
          </Column>}
        </Column>
      )}
    </shortVideoHook.Render>
    <shortVideoHook.Render mark='ShortVideoItem.menus.like' option={hookData}>
      <MenusItem text={item.like} icon='xihuan' color={item.my.like ? duxappTheme.primaryColor : '#fff'} onClick={like} />
    </shortVideoHook.Render>
    <shortVideoHook.Render mark='ShortVideoItem.menus.comment' option={hookData}>
      <MenusItem text={item.comment} icon='xinxi' onClick={() => Comment.show(item, hookData)} />
    </shortVideoHook.Render>
    <shortVideoHook.Render mark='ShortVideoItem.menus.share' option={hookData}>
      <MenusItem text={item.share} icon='share_01_fill' onClick={() => MoreAction.show(item)} />
    </shortVideoHook.Render>
    <shortVideoHook.Render mark='ShortVideoItem.menus.more' option={hookData}>
      <MenusItem text='更多' icon='ellipsis' onClick={() => MoreAction.show(item)} />
    </shortVideoHook.Render>
  </Column>
}

const MenusItem = ({ icon, text, color = '#fff', onClick }) => {
  return <Column onClick={onClick} items='center'>
    <VideoIcon name={icon} color={color} size={72} />
    <Text size={1} color={color}>{text}</Text>
  </Column>
}

const MoreAction = ({ onClose, item }) => {

  const userId = user.getUserID()

  const self = userId === item.user?.id

  const pullView = useRef()

  const save = useCallback(() => {
    if (process.env.TARO_ENV === 'h5') {
      return toast('无法保存，请下载app')
    }
    saveToPhoto(item.url)
  }, [item.url])

  const favorite = useCallback(async () => {
    await request({
      url: `member/collect/short/${item.id}`,
      method: 'POST',
      loading,
      toast: true
    })
    item.my.favorite = !item.my?.favorite
    toast(item.my.favorite ? '已收藏' : '已取消收藏')
  }, [item.id, item.my])

  const del = useCallback(async () => {
    if (await confirm({
      title: '删除视频',
      content: '是否删除此视频，此操作无法撤销',
      confirmText: '删除',
    })) {
      await request({
        url: `short/push/${item.id}`,
        method: 'DELETE',
        loading,
        toast: true
      })
      toast('已删除视频')
    }
  }, [item.id])

  return <PullView onClose={onClose} ref={pullView}>
    <Column className='rt-3 bg-white'>
      <Column className='p-3 gap-4'>
        <Text size={5} align='center'>立即分享给好友</Text>
        <Row className='gap-4'>
          <WechatShare.Button>
            <MoreActionItem
              icon='wechat-fill'
              bg='#00B83D'
              text='分享'
              onClose={onClose}
            />
          </WechatShare.Button>
          <MoreActionItem
            icon='download02-fill'
            bg='#A564FA'
            text='保存'
            onClose={onClose}
            onClick={save}
          />
        </Row>
        <Row className='gap-4'>
          <MoreActionItem
            icon='collection'
            text='收藏'
            bg={item.my?.favorite ? duxappTheme.primaryColor : ''}
            onClose={onClose}
            onClick={favorite}
          />
          {
            self && <>
              <MoreActionItem
                icon='ashbin'
                text='删除'
                onClose={onClose}
                onClick={del}
              />
              <MoreActionItem
                icon='package_product'
                text='投放广告'
                onClose={onClose}
                onClick={() => nav('duxcmsShortVideo/ad/package', { select: item })}
              />
            </>
          }
          {
            !self && <>
              <MoreActionItem
                icon='writing1'
                text='反馈'
                onClose={onClose}
                onClick={() => nav('duxcmsShortVideo/video/feedback', { id: item.id })}
              />
              <MoreActionItem
                icon='danger'
                text='投诉'
                onClose={onClose}
                onClick={() => nav('duxcmsShortVideo/video/report', { id: item.id })}
              />
            </>
          }

        </Row>
        <Column className='p-1 bg-page' />
        <Column onClick={onClose} className='p-3'>
          <Text align='center'>取消</Text>
        </Column>
      </Column>
    </Column>
  </PullView>
}

MoreAction.show = item => {
  const { remove } = TopView.add([
    MoreAction,
    {
      item,
      onClose: () => {
        remove()
      }
    }
  ])
}

const MoreActionItem = ({
  icon,
  bg,
  text,
  onClose,
  onClick
}) => {
  return <Column
    onClick={() => {
      onClose()
      onClick?.()
    }}
    className='gap-2' items='center'
  >
    <Column className='square r-max'
      style={{ width: px(96), backgroundColor: bg || '#F5F8FC' }}
      items='center' justify='center'
    >
      <VideoIcon name={icon} size={64} color={bg ? '#fff' : duxappTheme.textColor1} />
    </Column>
    <Text size={1}>{text}</Text>
  </Column>
}
