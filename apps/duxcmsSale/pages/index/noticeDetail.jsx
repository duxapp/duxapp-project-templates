import { TopView, Header, Card, Text, ScrollView, Space, HtmlView, Row,  useRoute, dayjs } from '@/duxui'
import { useRequest } from '@/duxcmsSale'

const NoticeDetail = () => {
  const { params: { id } } = useRoute()

  const [detail] = useRequest(`sale/notice/${id}`)

  return (
    <TopView isSafe>
      <Header title='公告详情' />
      <ScrollView >
        <Card shadow={false} margin  >
          <Space size={32}>
            <Text bold size={42} >{detail.title}</Text>
            <Space>
              <Row items='center' justify='between'>
                <Space size={16} row items='center'>
                  {!!detail.source && <Text color={3} size={1}>{detail.source}</Text>}
                  <Text color={3} size={1}>{dayjs(detail.created_at).format('YYYY-MM-DD')}</Text>
                </Space>
                <Row items='center'>
                  {/* <Text size={5} color={3}><DeviceIcon name='a-Eyevision' /></Text> */}
                  <Text size={2} color={3}>{detail.view}</Text>
                </Row>
              </Row>
              <HtmlView html={detail.content} />
            </Space>
          </Space>
        </Card>
      </ScrollView>
    </TopView>
  );
}

export default NoticeDetail;

