import { ScrollView, Header, Row, nav, Column, px, Text, duxappTheme, Tab, Image, Empty, TabItem } from '@/duxui'
import { HeaderSearch, List, Price, usePageData } from '@/duxcmsOrder'
import { useState } from 'react'
import { mallHook } from '@/duxcmsMall/utils'
import classNames from 'classnames'

export const MallCateQuick = () => {

  const [category] = usePageData(`mall/class`)

  const [select, setSelect] = useState(0)

  const selectItem = category[select]

  return <>
    <Header
      renderHeader={<Row className='h-full'>
        <Header.Back />
        <HeaderSearch placeholder='搜索商品' className='m-1' disabled onClick={() => nav('duxcmsMall/goods/list', { search: 1 })} />
      </Row>}
    />
    <Row grow>
      <Column shrink style={{ width: px(200) }} className='bg-white'>
        <ScrollView>
          {
            category.map((item, index) => {
              const isSelect = select === index
              return <Row
                key={item.id}
                items='center'
                onClick={() => setSelect(index)}
                style={{
                  height: px(100),
                  backgroundColor: isSelect ? duxappTheme.pageColor : '#fff'
                }}
              >
                <Column className='absolute left-0' style={{ width: px(8), height: px(60), top: px(20), backgroundColor: isSelect ? duxappTheme.primaryColor : '#fff' }} />
                <Text grow align='center'>{item.name}</Text>
              </Row>
            })
          }
        </ScrollView>
      </Column>
      {selectItem && <Malls key={selectItem.id} category={selectItem} />}
    </Row>
  </>
}

const Malls = ({ category }) => {

  const [select, setSelect] = useState(0)

  return <Column style={{ width: px(550) }} className='gap-3'>
    {
      category.children.length > 0 && <Tab value={select} onChange={setSelect} scroll type='button' buttonRound className='mt-1'>
        <TabItem paneKey={0} title='全部' />
        {
          category.children.map(item => <TabItem key={item.id} paneKey={item.id} title={item.name} />)
        }
      </Tab>
    }
    <List
      url={`mall/mall?class=${select || category.id}`}
      renderItem={Item}
      renderEmpty={<Empty title='此分类暂无商品' />}
    />
  </Column>
}

const Item = ({ item, index }) => {
  return <Row className={classNames('gap-2 bg-white r-2 mh-3 p-3 mt-3', index && 'mt-3')} onClick={() => nav('duxcmsMall/goods/detail?id=' + item.id)}>
    <Image src={item.images?.[0]} style={{ width: px(150) }} square className='r-2' />
    <Column grow className='overflow-hidden pv-1' justify='between'>
      <Text size={2} bold numberOfLines={item.activity ? 1 : 2}>{item.title}</Text>
      {!!item.activity && <Text size={1} color={3} numberOfLines={1}>{item.activity}</Text>}
      <Row items='center' className='gap-1'>
        <mallHook.Render mark='MallCateQuick.item.sellPrice' option={{ item, index }}>
          <Price size={4} unitSize={1}>{item.sell_price}</Price>
        </mallHook.Render>
        <Price size={1} color={3} delete>{item.market_price}</Price>
      </Row>
    </Column>
  </Row>
}
