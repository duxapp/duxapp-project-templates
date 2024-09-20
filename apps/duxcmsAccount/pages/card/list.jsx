import { useCallback } from 'react'
import { TopView, Header, loading, Text, confirm, Space, Row, Card, Empty } from '@/duxui'
import { request, nav, duxappTheme, List, CmsIcon } from '@/duxcmsAccount'

export default function CardList() {

  return <TopView>
    <Header title='银行卡' renderRight={<Text onClick={() => nav('duxcmsAccount/card/add')}>添加</Text>} />
    <List
      url='member/card'
      page={false}
      reloadForShow
      renderItem={Item}
      renderEmpty={<Empty title='暂无银行卡' />}
    />
  </TopView>
}

const Item = ({ item, index, action }) => {

  const del = useCallback(async () => {
    const status = await confirm({
      title: '删除',
      content: '是否删除此银行卡'
    })
    if (!status) {
      return
    }
    await request({
      url: `member/card/${item.id}`,
      method: 'DELETE',
      loading,
      toast: true
    })
    action.reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id])

  return <Card
    margin
    disableMarginTop={!!index}
    key={item.id}
    style={{ backgroundColor: duxappTheme.primaryColor }}
  >
    <Space size={36}>
      <Row justify='between' items='center'>
        <Text color={4} size={5}>{item.bank_name}</Text>
        <CmsIcon name='ashbin' color='#fff' size={32} onClick={del} />
      </Row>
      <Space size={48} row justify='start' items='center'>
        <Text color={4} size={5}>****</Text>
        <Text color={4} size={5}>****</Text>
        <Text color={4} size={5}>****</Text>
        <Text color={4} size={5}>{item.no.substring(item.no.length - 4)}</Text>
      </Space>
    </Space>
  </Card>
}
