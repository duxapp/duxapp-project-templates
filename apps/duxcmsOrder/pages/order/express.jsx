import { List, usePageData } from '@/duxcmsOrder'
import { Column, Divider, Empty, Header, ListLoading, Status, Step, Text, TopView, px, useRoute } from '@/duxui'

export default function OrderExpress() {

  const { params } = useRoute()

  return <TopView>
    <Header title='物流信息' />
    <List
      url={`order/order/${params.id}/express`}
      renderItem={Item}
      renderEmpty={<Empty title='暂无物流信息' />}
      page={false}
    />
  </TopView>
}

const logStatus = ['等待揽收', '运输中', '已签收', '问题件']

const Item = ({ item }) => {

  const [log, action] = usePageData(`order/order/${item.id}/express/log`)

  return <Column key={item.id} className='mt-3 mh-3 bg-white r-2 p-3 overflow-hidden gap-3'>
    <Text>{item.name} {item.no}</Text>
    <Divider padding={0} />
    {
      action.loading ?
        <ListLoading text='加载中' /> : !log.length ?
          <Empty title='暂无物流信息' /> :
          <Step
            type='column'
            data={log.reverse()}
            renderEnd={End}
          />
    }
    <Status horizontal='right' status={<Status.Incline>{logStatus[item.log_status]}</Status.Incline>}></Status>
  </Column>
}

const End = ({ item }) => {
  return <Column className='gap-1' style={{ marginBottom: px(24) }}>
    <Text color={2} size={1}>{item.date}</Text>
    <Text>{item.msg}</Text>
  </Column>
}