import { TopView, Header, Card, Text, ScrollView, Space, HtmlView, useRoute } from '@/duxui'
import { useRequest } from '@/duxcmsShop'

export default function HelpDetail() {

  const { params } = useRoute()

  const [detail] = useRequest(`tools/magic/help/${params.id}`)

  return (
    <TopView isSafe>
      <Header title='帮助详情' />
      <ScrollView >
        <Card shadow={false} margin>
          <Space size={32}>
            <Text bold size={42} >{detail.title}</Text>
            <HtmlView html={detail.content} />
          </Space>
        </Card>
      </ScrollView>
    </TopView>
  )
}

