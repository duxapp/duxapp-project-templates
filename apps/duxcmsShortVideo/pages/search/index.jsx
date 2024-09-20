import { List, duxappTheme, previewVideos, shortVideoHook, VideoIcon } from '@/duxcmsShortVideo'
import { Header, Column, Input, Row, Text, ObjectManage, TopView, useRoute, Empty, Avatar, Image, Tab, nav } from '@/duxui'
import { CmsIcon, px, request, contextState } from '@/duxcms'
import { Fragment, useCallback, useEffect, useState } from 'react'

export default function IndexSearch() {

  const { params } = useRoute()

  const [keyword, setKeyword] = useState(params.keyword || '')

  const [show, setShow] = useState(!params.keyword)

  const [tab, setTab] = useState(0)

  const [listData, setListData] = useState({ keyword: params.keyword || '' })

  const types = useTypes()

  const typeItem = types[tab]

  const search = useCallback(async val => {
    const _keyword = typeof val === 'string' ? val : keyword
    if (!_keyword) {
      return
    }
    if (typeof val === 'string') {
      setKeyword(val)
    }
    history.addKeyword(_keyword, params.type)
    setShow(false)
    setListData({ keyword: _keyword })
  }, [keyword, params.type])

  return <TopView>
    <Header
      renderHeader={<Row className='h-full gap-2 pv-1' items='center'>
        <Header.Back />
        <Row items='center' grow className='gap-2 ph-3 r-max' self='stretch'
          style={{ backgroundColor: '#F7F8FA' }}
        >
          <CmsIcon name='search' size={36} color={duxappTheme.textColor3} />
          <Input value={keyword} focus={show}
            onFocus={() => {
              setShow(true)
            }}
            onChange={setKeyword}
            className='flex-grow'
            placeholder='请输入关键词'
          />
        </Row>
        <Text size={6} onClick={search}>搜索</Text>
      </Row>}
    />
    <contextState.Provider value={{ listData }}>
      <Column grow>
        {show ?
          <PopLog history={history} onChange={search} /> :
          <>
            <Tab val={tab} defaultValue={tab} onChange={setTab}>
              {
                types.map((item, index) => <Tab.Item key={item.name} paneKey={index} title={item.name} />)
              }
            </Tab>
            <List
              renderHeader={typeItem.head ? <AllHead data={listData} /> : null}
              key={tab}
              url={typeItem.url}
              data={listData}
              renderItem={typeItem.Comp}
              renderEmpty={<Empty title='没有更多搜索结果' className='w-full' />}
              {...typeItem.listProps}
            />
          </>}
      </Column>
    </contextState.Provider>
  </TopView>
}

const AllHead = ({
  data
}) => {

  const types = shortVideoHook.useMark('search.types')

  const comps = [UserItem, ...types.map(item => item.Comp)]

  const [group, setGroup] = useState([])

  useEffect(() => {
    Promise.all([
      'short/search/users',
      ...types.map(item => item.url)
    ].map(v => request({
      url: v,
      data
    }))).then(res => {
      setGroup(res.map(item => item.slice(0, 2)))
    })
  }, [data, types])

  return group.map((list, index) => {
    const Comp = comps[index]
    return <Fragment key={index}>
      {
        list.map(item => <Comp key={item.id} item={item} index={index} />)
      }
    </Fragment>
  })
}

const VideoItem1 = ({ item, list, index, action }) => {

  const [{ listData }] = contextState.useState()

  return <Column
    className='bg-white r-2 mt-3 overflow-hidden'
    style={{ width: px(339), marginLeft: px(24) }}
    onClick={() => previewVideos({
      list,
      select: index,
      url: 'short/search/videos',
      params: listData,
      page: action.currentData.page
    })}
  >
    <Image src={item.cover} className='w-full' style={{ height: px(460) }} />
    <Row className='p-3 gap-1'>
      <Image src={item.user?.avatar} square className='r-max' style={{ width: px(40) }} />
      <Text numberOfLines={1} grow>{item.user?.nickname}</Text>
      <Row items='center'>
        <VideoIcon name='xihuan' size={40} color={duxappTheme.textColor1} />
        <Text size={2} color={3}>{item.like}</Text>
      </Row>
    </Row>
  </Column>
}

const VideoItem2 = ({ item, index, list, action }) => {

  const [{ listData }] = contextState.useState()

  return <Column className='mt-3 r-2 bg-white p-3 gap-3'
    onClick={() => previewVideos({
      list,
      select: index,
      url: 'short/search/videos',
      params: listData,
      page: action.currentData.page
    })}
  >
    <Row className='gap-3' items='center'>
      <Avatar url={item.user?.avatar} />
      <Column grow className='gap-1'>
        <Text bold>{item.user?.nickname}</Text>
        <Text size={1} color={3}>{item.created_at}</Text>
      </Column>
    </Row>
    <Text>{item.title}</Text>
    <Column className='gap-2' items='start'>
      <Image src={item.cover} style={{ width: px(460), height: px(614) }} className='r-2' />
      {!!item.area.length && <Row className='p-1 r-1 bg-page items-center gap-1'>
        <CmsIcon name='map1' size={32} color={duxappTheme.secondaryColor} />
        <Text size={1} color={2}>{item.area.slice(1)}</Text>
      </Row>}
    </Column>
    <Row>
      <Row grow items='center' className='gap-1'>
        <VideoIcon name='favorites' size={48} color={duxappTheme.textColor1} />
        <Text>{item.like}</Text>
      </Row>
      <Row grow items='center' className='gap-1'>
        <VideoIcon name='comments' size={48} color={duxappTheme.textColor1} />
        <Text>{item.comment}</Text>
      </Row>
      <Row grow items='center' className='gap-1'>
        <VideoIcon name='collection' size={48} color={duxappTheme.textColor1} />
        <Text>{item.favorite}</Text>
      </Row>
      <Row grow items='center' className='gap-1'>
        <VideoIcon name='share_01' size={48} color={duxappTheme.textColor1} />
        <Text>{item.share}</Text>
      </Row>
    </Row>
    {
      item.comments?.map(comment => <Row key={comment.id} items='start' className='gap-3'>
        <Avatar size='s' url={comment.user?.avatar} />
        <Column className='gap-1' grow>
          <Text color={2} size={1}>武晶聪 · <Text color={3}>{comment.created_at}</Text></Text>
          <Text>{comment.content}</Text>
        </Column>
        <Column className='items-center gap-1'>
          <VideoIcon name='xinxi' size={40} color={duxappTheme.primaryColor} />
          <Text type='primary' size={1}>{comment.like || 0}</Text>
        </Column>
      </Row>)
    }
  </Column>
}

const UserItem = ({ item }) => {
  return <Row className='mt-3 mh-3 p-3 r-2 gap-3 bg-white' items='center'
    onClick={() => nav('duxcmsShortVideo/user/index', { id: item.id })}
  >
    <Avatar size='l' url={item.avatar} />
    <Column grow className='gap-1'>
      <Text bold>{item.nickname}</Text>
      <Text size={1} color={3}>粉丝：{item.fans}</Text>
    </Column>
    {/* <Button type='primary' radiusType='round-min'><CmsIcon name='add-select' /> 关注</Button> */}
  </Row>
}

const useTypes = () => {
  const types = shortVideoHook.useMark('search.types')

  return [
    {
      name: '视频',
      Comp: VideoItem1,
      url: 'short/search/videos',
      listProps: {
        columns: 2,
        listStyle: { flexDirection: 'row', flexWrap: 'wrap' }
      }
    },
    {
      name: '综合',
      Comp: VideoItem2,
      head: true,
      url: 'short/search/videos'
    },
    ...types,
    {
      name: '用户',
      Comp: UserItem,
      url: 'short/search/users'
    }
  ]
}

const PopLog = ({ onChange }) => {

  const { params } = useRoute()

  const list = history.useList()

  return <Column className='rt-3 bg-white ph-3 pv-1 mt-2' grow>
    <Column className='pv-3 gap-3 mt-3'>
      <Row items='center' justify='between'>
        <Text size={4} bold>历史搜索</Text>
        <CmsIcon name='ashbin' size={40}
          color={duxappTheme.textColor3}
          onClick={() => history.clear(params.type)}
        />
      </Row>
      <Row className='gap-3' items='center' wrap>
        {
          list.map(item => <Column key={item}
            className='pv-1 ph-3 r-max'
            style={{ backgroundColor: '#F5F8FC' }}
            onClick={() => onChange(item)}
          >
            <Text>{item}</Text>
          </Column>)
        }
      </Row>
    </Column>
  </Column>
}


class History extends ObjectManage {
  constructor() {
    super({
      cache: true,
      cacheKey: 'search-keyword'
    })
  }

  data = {
    list: []
  }

  addKeyword = keyword => {
    const list = this.data.list
    const index = list.indexOf(keyword)
    if (~index) {
      list.splice(index, 1)
    }
    list.unshift(keyword)
    this.set({
      ...this.data
    })
  }

  clear = () => {
    const list = this.data.list
    list.splice(0)
    this.set({
      ...this.data
    })
  }

  useList = () => {
    const [list, setList] = useState(this.data.list)

    useEffect(() => {
      const { remove } = this.onSet(() => setList([...this.data.list]))

      return () => remove()
    }, [])

    return list
  }
}


const history = new History()
