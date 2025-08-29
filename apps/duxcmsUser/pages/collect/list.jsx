import { TopView, Header, Row, Text, Card, Tab, nav, Empty, loading, stopPropagation, Button, px, colorLighten, duxappTheme, TabItem } from '@/duxui'
import { List, request, contextState, collect } from '@/duxcmsUser'
import { useCallback } from 'react'

export default function Collect() {
  return <TopView>
    <Header title='我的收藏' />
    <Tab
      buttonRound lazyload justify oneHidden
      tabStyle={collect.config.tabBg && {
        backgroundColor: duxappTheme.whiteColor,
        borderBottomLeftRadius: px(24),
        borderBottomRightRadius: px(24)
      }}
    >
      {
        collect.types.map(item => <TabItem key={item.type} title={item.name}>
          <contextState.Provider defaultValue={item}>
            <List
              url={`member/collect/${item.type}`}
              renderItem={Item}
              renderEmpty={<Empty title='没有相关收藏' />}
            />
          </contextState.Provider>
        </TabItem>)
      }
    </Tab>
  </TopView>
}

const RemoveCard = ({ children, item, action, type }) => {

  const detail = useCallback(() => {
    const _item = collect.types.find(v => v.type === type)
    nav(_item.url, { id: item.id })
  }, [item.id, type])

  const remove = useCallback(async e => {
    stopPropagation(e)
    await request({
      url: `member/collect/${type}/${item.id}`,
      toast: true,
      method: 'POST',
      loading
    })
    action.reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action.reload, item.id, type])

  return <Card shadow={false} margin
    disableMarginBottom
    className='overflow-hidden'
    style={{ padding: 0, backgroundColor: colorLighten(duxappTheme.primaryColor, 0.9) }}
    onClick={detail}
  >
    {children}
    <Row items='center' justify='between' className='p-2'>
      <Text>收藏时间：{item.created_at.substring(0, 10)}</Text>
      <Button style={{ width: px(132), height: px(40), }} onClick={remove}>移除</Button>
    </Row>
  </Card>
}

const Item = ({ item, index, action }) => {

  const [{ type, Render }] = contextState.useState()

  return <RemoveCard item={item} action={action} type={type}>
    <Render item={item} action={action} index={index} />
  </RemoveCard>
}
