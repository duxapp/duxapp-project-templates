import { TopView, Header, Row, Text, Tab, nav, Empty, loading, stopPropagation, Column, duxappTheme, colorLighten, px, TabItem } from '@/duxui'
import { List, request, contextState, foot, CmsIcon } from '@/duxcmsUser'
import { useCallback } from 'react'

export default function Foot() {
  return <TopView>
    <Header title='足迹' />
    <Tab buttonRound lazyload justify oneHidden tabStyle={{ backgroundColor: duxappTheme.whiteColor, borderBottomLeftRadius: px(24), borderBottomRightRadius: px(24) }}>
      {
        foot.types.map(item => <TabItem key={item.type} title={item.name}>
          <contextState.Provider defaultValue={item}>
            <List
              url={`member/foot/${item.type}`}
              renderItem={Item}
              renderEmpty={<Empty title='没有足迹' />}
            />
          </contextState.Provider>
        </TabItem>)
      }
    </Tab>
  </TopView>
}

const Item = ({ item, index, action }) => {

  const [{ Render, url, type }] = contextState.useState()

  const remove = useCallback(async e => {
    stopPropagation(e)
    await request({
      url: `member/foot/${type}`,
      toast: true,
      method: 'DELETE',
      data: {
        ids: [item.id]
      },
      loading
    })
    action.reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id, type])

  return <Column className='mh-3 mt-3 r-2 bg-white' onClick={() => nav(url, { id: item.id })}>
    <Render item={item} action={action} index={index} />
    <Row className='p-2 r-2' items='center' justify='between' style={{ backgroundColor: colorLighten(duxappTheme.primaryColor, 0.9) }}>
      <Text size={2} color={2}>{item.created_at.substring(0, 16)}</Text>
      <CmsIcon
        name='ashbin'
        size={36}
        color={duxappTheme.textColor3}
        onClick={remove}
      />
    </Row>
  </Column>
}
