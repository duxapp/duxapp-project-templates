import { useRequest } from '@/duxcmsShortVideo'
import { Column, Divider, Header, Row, Text, TopView, nav, useRoute } from '@/duxui'


export default function AdCustomerDetail() {

  const { params } = useRoute()

  const [data] = useRequest(`advert/data/${params.id}`)

  return <TopView>
    <Header title='表单详情' />
    <Column className='m-3 bg-white r-2 p-3 gap-3'>
      <Row justify='between'>
        <Text bold>姓名</Text>
        <Text bold>{data.name}</Text>
      </Row>
      <Divider />
      <Row justify='between' onClick={() => nav(`tel:${data.tel}`)}>
        <Text bold>电话</Text>
        <Text bold>{data.tel}</Text>
      </Row>
      {/* <Divider />
      <Row justify='between'>
        <Text bold>行业</Text>
        <Text bold>{data.name}</Text>
      </Row> */}
      <Divider />
      <Text bold>备注</Text>
      <Column className='bg-page r-2 p-3'>
        <Text>{data.remark}</Text>
      </Column>
    </Column>
  </TopView>
}

