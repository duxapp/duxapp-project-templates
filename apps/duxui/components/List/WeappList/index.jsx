
import { VirtualList } from '@tarojs/components-advanced/dist/components/virtual-list'
import { VirtualWaterfall } from '@tarojs/components-advanced/dist/components/virtual-waterfall'
import { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { noop, Layout } from '@/duxapp'

export const WeappList = ({
  url,
  list,
  columns,
  renderHeader,
  renderFooter,
  emptyStatus,
  renderEmpty,
  loadMore,
  Empty,
  RenderItem,
  emptyTitle,
  page,
  action,
  refresh,
  onRefresh,
  virtualWaterfallProps,
  virtualListProps,
  props
}) => {

  const [height, setHeight] = useState(0)

  const isWaterfall = columns > 1 || !!virtualWaterfallProps

  const VList = isWaterfall ? VirtualWaterfall : VirtualList

  const vlistRef = useRef(null)
  const oldLength = useRef(list.length)
  const oldList = useRef(list)
  const oldActionRefresh = useRef(!!action?.refresh)
  const oldColumns = useRef(columns)

  const softRelayout = useCallback(() => {
    const instance = vlistRef.current
    instance?.preset?.resetCache?.()
    instance?.refresh?.()
    instance?.forceUpdate?.()
  }, [])

  const hardRelayout = useCallback(() => {
    const instance = vlistRef.current
    instance?.preset?.resetCache?.()
    if (isWaterfall && instance?.itemMap) {
      if (typeof columns === 'number' && columns > 0) {
        instance.itemMap.columns = columns
      }
      instance.itemMap._items = []
      instance.itemMap._columnMap = new Array(columns).fill(0).map(() => [])
      instance.itemMap.refreshCounter++
    }
    instance?.refresh?.()
    instance?.forceUpdate?.()
  }, [columns, isWaterfall])

  useEffect(() => {
    if (!isWaterfall) {
      oldLength.current = list.length
      oldActionRefresh.current = !!action?.refresh
      return
    }

    const refreshEnded = oldActionRefresh.current && !action?.refresh
    const dataChanged = list !== oldList.current
    const lengthChanged = list.length !== oldLength.current
    const lengthDecreased = list.length < oldLength.current

    if (lengthDecreased) {
      hardRelayout()
    } else if (refreshEnded && (dataChanged || lengthChanged)) {
      // 刷新结束只需要重置缓存即可，避免清空布局导致闪烁
      softRelayout()
    }

    oldLength.current = list.length
    oldList.current = list
    oldActionRefresh.current = !!action?.refresh
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action?.refresh, hardRelayout, isWaterfall, list, list.length, softRelayout])

  useEffect(() => {
    if (isWaterfall && oldColumns.current !== columns) {
      oldColumns.current = columns
      hardRelayout()
    }
  }, [columns, hardRelayout, isWaterfall])

  const listRender = <VList
    {...props}
    ref={vlistRef}
    height={height ? height : undefined}
    column={columns}
    className={classNames(props.className, !height && 'absolute h-full w-full')}
    style={props.style}
    itemData={list}
    itemCount={list.length}
    item={RenderItem}
    // 下拉刷新了上拉加载
    lowerThreshold={200}
    onScrollToLower={() => page && url && action.next().catch(noop)}
    refresherEnabled={!!onRefresh && !!url}
    refresherThreshold={50}
    onRefresherrefresh={() => {
      if (!refresh) {
        onRefresh?.()
      }
    }}
    refresherTriggered={!!refresh}
    refresherBackground='transparent'
    enhanced // 默认开启 防止抖动
    // 自定义渲染
    renderTop={<>
      {renderHeader}
      {emptyStatus && (renderEmpty || <Empty title={emptyTitle} />)}
    </>}
    renderBottom={<>
      {renderFooter}
      {loadMore}
    </>}
    {...(isWaterfall ? virtualWaterfallProps : virtualListProps)}
  />

  return height > 0 ?
    listRender :
    <Layout
      className={classNames('flex-grow', props.className)}
      style={props.style}
      onLayout={e => setHeight(e.height)}
    >
      {listRender}
    </Layout>
}
