import { Button, Card, Column, Divider, Empty, Header, Row, ScrollView, Tag, Text, TopView, duxappTheme, nav, stopPropagation, useRoute, DividerGroup } from '@/duxui'
import { CmsIcon, usePageData } from '@/duxcmsOrder'
import { useDidShow } from '@tarojs/taro'
import { useCallback } from 'react'

export default function AddressList() {

  const [data, action] = usePageData('order/address')

  useDidShow(() => action.reload())

  const { params } = useRoute()


  return <TopView isSafe>
    <Header title='收货地址' />
    <ScrollView>
      <Card margin className='gap-3'>
        {
          !data.length && !action.loading ?
            <Empty title='没有收货地址' /> :
            <DividerGroup padding={0}>
              {
                data.map(item => <Item key={item.id} item={item} params={params} />)
              }
            </DividerGroup>
        }
      </Card>
    </ScrollView>
    <Column className='p-3 bg-white'>
      <Button type='primary' size='l' radiusType='round' plain
        onClick={() => nav('duxcmsOrder/address/edit')}
      >新增收货地址</Button>
    </Column>
  </TopView>
}


const Item = ({ item, params }) => {

  const select = useCallback(() => {
    if (params.select) {
      nav('back:', item)
    }
  }, [item, params.select])

  return <Row items='center' className='gap-3'>
    <Column grow className='gap-1' onClick={select}>
      <Row items='center' className='gap-1'>
        {!!item.default && <Tag type='primary' size='s'>默认</Tag>}
        <Text size={2} color={2}>{item.area}</Text>
      </Row>
      <Text size={4} bold>{item.address}</Text>
      <Text size={2} color={2}>{item.name} {item.tel}</Text>
    </Column>
    <CmsIcon size={48} color={duxappTheme.textColor1} name='editor'
      onClick={e => {
        stopPropagation(e)
        nav('duxcmsOrder/address/edit', { id: item.id })
      }}
    />
  </Row>
}
